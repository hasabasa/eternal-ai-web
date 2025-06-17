/*
  # Добавление системы штрафов, бонусов и планов продаж

  1. Новые таблицы:
    - `penalties` - штрафы для менеджеров
    - `bonuses` - бонусы для менеджеров  
    - `sales_plans` - планы продаж для менеджеров
    - `sales_achievements` - достижения продаж менеджеров

  2. Обновления:
    - Добавляем поля в manager_profiles для общего плана продаж админа

  3. Безопасность:
    - RLS политики для всех новых таблиц
*/

-- 1. Таблица штрафов
CREATE TABLE IF NOT EXISTS penalties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  manager_id uuid REFERENCES manager_profiles(id) ON DELETE CASCADE,
  amount numeric NOT NULL DEFAULT 0,
  reason text NOT NULL,
  created_by uuid REFERENCES manager_profiles(id),
  created_at timestamptz DEFAULT now()
);

-- 2. Таблица бонусов
CREATE TABLE IF NOT EXISTS bonuses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  manager_id uuid REFERENCES manager_profiles(id) ON DELETE CASCADE,
  amount numeric NOT NULL DEFAULT 0,
  reason text NOT NULL,
  created_by uuid REFERENCES manager_profiles(id),
  created_at timestamptz DEFAULT now()
);

-- 3. Таблица планов продаж
CREATE TABLE IF NOT EXISTS sales_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  manager_id uuid REFERENCES manager_profiles(id) ON DELETE CASCADE,
  target_amount numeric NOT NULL DEFAULT 0,
  month_year text NOT NULL, -- формат: "2025-01"
  created_by uuid REFERENCES manager_profiles(id),
  created_at timestamptz DEFAULT now(),
  UNIQUE(manager_id, month_year)
);

-- 4. Таблица достижений продаж
CREATE TABLE IF NOT EXISTS sales_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  manager_id uuid REFERENCES manager_profiles(id) ON DELETE CASCADE,
  amount numeric NOT NULL DEFAULT 0,
  month_year text NOT NULL, -- формат: "2025-01"
  created_by uuid REFERENCES manager_profiles(id),
  created_at timestamptz DEFAULT now()
);

-- 5. Добавляем поле общего плана продаж для админа
ALTER TABLE manager_profiles 
ADD COLUMN IF NOT EXISTS total_sales_plan numeric DEFAULT 0;

-- 6. Включаем RLS для всех таблиц
ALTER TABLE penalties ENABLE ROW LEVEL SECURITY;
ALTER TABLE bonuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_achievements ENABLE ROW LEVEL SECURITY;

-- 7. Политики для штрафов
CREATE POLICY "Managers can view their own penalties"
  ON penalties FOR SELECT TO authenticated
  USING (
    manager_id IN (
      SELECT id FROM manager_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all penalties"
  ON penalties FOR ALL TO authenticated
  USING (is_admin());

-- 8. Политики для бонусов
CREATE POLICY "Managers can view their own bonuses"
  ON bonuses FOR SELECT TO authenticated
  USING (
    manager_id IN (
      SELECT id FROM manager_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all bonuses"
  ON bonuses FOR ALL TO authenticated
  USING (is_admin());

-- 9. Политики для планов продаж
CREATE POLICY "Managers can view their own sales plans"
  ON sales_plans FOR SELECT TO authenticated
  USING (
    manager_id IN (
      SELECT id FROM manager_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all sales plans"
  ON sales_plans FOR ALL TO authenticated
  USING (is_admin());

-- 10. Политики для достижений продаж
CREATE POLICY "Managers can view their own sales achievements"
  ON sales_achievements FOR SELECT TO authenticated
  USING (
    manager_id IN (
      SELECT id FROM manager_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all sales achievements"
  ON sales_achievements FOR ALL TO authenticated
  USING (is_admin());

-- 11. Функция для расчета итоговой зарплаты с учетом штрафов и бонусов
CREATE OR REPLACE FUNCTION calculate_final_salary(
  manager_profile_id uuid,
  target_month text DEFAULT to_char(CURRENT_DATE, 'YYYY-MM')
)
RETURNS TABLE (
  base_salary numeric,
  total_penalties numeric,
  total_bonuses numeric,
  sales_commission numeric,
  final_salary numeric
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  manager_record manager_profiles%ROWTYPE;
  current_sales numeric := 0;
BEGIN
  -- Получаем данные менеджера
  SELECT * INTO manager_record
  FROM manager_profiles
  WHERE id = manager_profile_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Manager not found';
  END IF;
  
  -- Получаем текущие продажи
  SELECT COALESCE(SUM(amount), 0) INTO current_sales
  FROM sales_achievements
  WHERE manager_id = manager_profile_id 
    AND month_year = target_month;
  
  -- Возвращаем расчет
  RETURN QUERY
  SELECT 
    manager_record.base_salary,
    COALESCE((
      SELECT SUM(amount) 
      FROM penalties 
      WHERE manager_id = manager_profile_id 
        AND to_char(created_at, 'YYYY-MM') = target_month
    ), 0) as total_penalties,
    COALESCE((
      SELECT SUM(amount) 
      FROM bonuses 
      WHERE manager_id = manager_profile_id 
        AND to_char(created_at, 'YYYY-MM') = target_month
    ), 0) as total_bonuses,
    (current_sales * manager_record.sales_percentage / 100) as sales_commission,
    (
      manager_record.base_salary + 
      (current_sales * manager_record.sales_percentage / 100) +
      COALESCE((
        SELECT SUM(amount) 
        FROM bonuses 
        WHERE manager_id = manager_profile_id 
          AND to_char(created_at, 'YYYY-MM') = target_month
      ), 0) -
      COALESCE((
        SELECT SUM(amount) 
        FROM penalties 
        WHERE manager_id = manager_profile_id 
          AND to_char(created_at, 'YYYY-MM') = target_month
      ), 0)
    ) as final_salary;
END;
$$;

-- 12. Функция для получения прогресса продаж
CREATE OR REPLACE FUNCTION get_sales_progress(
  manager_profile_id uuid,
  target_month text DEFAULT to_char(CURRENT_DATE, 'YYYY-MM')
)
RETURNS TABLE (
  target_amount numeric,
  achieved_amount numeric,
  progress_percentage numeric
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(sp.target_amount, 0) as target_amount,
    COALESCE(SUM(sa.amount), 0) as achieved_amount,
    CASE 
      WHEN COALESCE(sp.target_amount, 0) > 0 
      THEN (COALESCE(SUM(sa.amount), 0) / sp.target_amount * 100)
      ELSE 0 
    END as progress_percentage
  FROM sales_plans sp
  LEFT JOIN sales_achievements sa ON sa.manager_id = sp.manager_id 
    AND sa.month_year = sp.month_year
  WHERE sp.manager_id = manager_profile_id 
    AND sp.month_year = target_month
  GROUP BY sp.target_amount;
END;
$$;

-- 13. Предоставляем права на выполнение функций
GRANT EXECUTE ON FUNCTION calculate_final_salary(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION get_sales_progress(uuid, text) TO authenticated;