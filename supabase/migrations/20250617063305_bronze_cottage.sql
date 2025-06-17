-- =====================================================
-- ПОЛНАЯ НАСТРОЙКА СИСТЕМЫ УПРАВЛЕНИЯ МЕНЕДЖЕРАМИ
-- =====================================================

-- 1. СОЗДАНИЕ ТАБЛИЦЫ ПРОФИЛЕЙ МЕНЕДЖЕРОВ
-- =====================================================

CREATE TABLE IF NOT EXISTS manager_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  base_salary numeric NOT NULL DEFAULT 0,
  sales_percentage numeric NOT NULL DEFAULT 0,
  kpi_target numeric DEFAULT 0,
  role text DEFAULT 'manager',
  created_at timestamptz DEFAULT now()
);

-- 2. НАСТРОЙКА ROW LEVEL SECURITY
-- =====================================================

-- Включаем RLS
ALTER TABLE manager_profiles ENABLE ROW LEVEL SECURITY;

-- Удаляем существующие политики (если есть)
DROP POLICY IF EXISTS "Managers can view and update their own profile" ON manager_profiles;
DROP POLICY IF EXISTS "Admins can manage all manager profiles" ON manager_profiles;

-- 3. СОЗДАНИЕ ФУНКЦИИ ДЛЯ ПРОВЕРКИ АДМИНА
-- =====================================================

-- Создаем функцию для проверки админских прав (предотвращает бесконечную рекурсию)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.manager_profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  );
END;
$$;

-- Даем права на выполнение функции
GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;

-- 4. СОЗДАНИЕ ПОЛИТИК БЕЗОПАСНОСТИ
-- =====================================================

-- Политика для менеджеров (могут видеть только свой профиль)
CREATE POLICY "Managers can view and update their own profile"
  ON manager_profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Политика для администраторов (могут управлять всеми профилями)
CREATE POLICY "Admins can manage all manager profiles"
  ON manager_profiles
  FOR ALL
  TO authenticated
  USING (is_admin());

-- 5. СОЗДАНИЕ АДМИНИСТРАТОРА
-- =====================================================

-- ВАЖНО: Сначала создайте пользователя через Supabase Dashboard:
-- 1. Перейдите в Authentication → Users
-- 2. Нажмите "Add user"
-- 3. Email: admin@internal.local
-- 4. Password: Admin123! (или любой другой)
-- 5. Auto Confirm User: ✅ ВКЛЮЧИТЕ ОБЯЗАТЕЛЬНО
-- 6. Скопируйте User UID после создания

-- Затем выполните этот запрос, заменив USER_ID на скопированный:
INSERT INTO manager_profiles (user_id, username, base_salary, sales_percentage, kpi_target, role)
VALUES (
  'ЗАМЕНИТЕ_НА_РЕАЛЬНЫЙ_USER_ID'::uuid, 
  'admin', 
  0, 
  0, 
  0, 
  'admin'
)
ON CONFLICT (username) 
DO UPDATE SET 
  user_id = EXCLUDED.user_id,
  role = 'admin';

-- 6. СОЗДАНИЕ ТЕСТОВЫХ МЕНЕДЖЕРОВ (ОПЦИОНАЛЬНО)
-- =====================================================

-- Создайте пользователей через Dashboard с этими email:
-- manager1@internal.local / Manager123!
-- manager2@internal.local / Manager123!

-- Затем выполните (замените USER_ID на реальные):
/*
INSERT INTO manager_profiles (user_id, username, base_salary, sales_percentage, kpi_target, role) VALUES
('USER_ID_MANAGER1'::uuid, 'manager1', 250000, 5, 500000, 'manager'),
('USER_ID_MANAGER2'::uuid, 'manager2', 300000, 7, 600000, 'manager');
*/

-- 7. ПРОВЕРКА НАСТРОЙКИ
-- =====================================================

-- Проверяем, что таблица создана
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'manager_profiles' 
ORDER BY ordinal_position;

-- Проверяем политики RLS
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'manager_profiles';

-- Проверяем созданных пользователей
SELECT 
  mp.username,
  mp.role,
  mp.base_salary,
  mp.sales_percentage,
  mp.kpi_target,
  mp.created_at,
  u.email,
  u.email_confirmed_at IS NOT NULL as email_confirmed
FROM manager_profiles mp
LEFT JOIN auth.users u ON mp.user_id = u.id
ORDER BY mp.created_at;

-- 8. ДИАГНОСТИКА ПРОБЛЕМ
-- =====================================================

-- Проверяем соответствие user_id между таблицами
SELECT 
  'auth.users' as table_name,
  id as user_id,
  email,
  email_confirmed_at IS NOT NULL as confirmed
FROM auth.users
WHERE email LIKE '%@internal.local'

UNION ALL

SELECT 
  'manager_profiles' as table_name,
  user_id,
  username as email,
  (role = 'admin') as confirmed
FROM manager_profiles;

-- Проверяем функцию is_admin (выполните после входа в систему)
-- SELECT is_admin();

-- 9. СБРОС СИСТЕМЫ (ЕСЛИ НУЖНО НАЧАТЬ ЗАНОВО)
-- =====================================================

-- ОСТОРОЖНО! Это удалит всех пользователей и данные
/*
-- Удаляем все профили
DELETE FROM manager_profiles;

-- Удаляем всех пользователей (выполните в Dashboard или через admin API)
-- Authentication → Users → выберите всех → Delete

-- Удаляем функцию
DROP FUNCTION IF EXISTS is_admin();

-- Удаляем таблицу
DROP TABLE IF EXISTS manager_profiles;
*/

-- 10. НАСТРОЙКА ПЕРЕМЕННЫХ ОКРУЖЕНИЯ
-- =====================================================

-- Убедитесь, что в файле .env настроены правильные значения:
-- VITE_SUPABASE_URL=https://ваш-проект-id.supabase.co
-- VITE_SUPABASE_ANON_KEY=ваш-anon-ключ

-- Получить эти значения можно в Supabase Dashboard → Settings → API

-- =====================================================
-- ИНСТРУКЦИЯ ПО ПРИМЕНЕНИЮ
-- =====================================================

/*
1. Скопируйте этот файл
2. Откройте Supabase Dashboard → SQL Editor
3. Выполните запросы по порядку (разделы 1-4)
4. Создайте пользователя admin@internal.local через Dashboard
5. Скопируйте его User UID
6. Выполните раздел 5, заменив USER_ID на реальный
7. Проверьте настройку через раздел 7
8. Настройте .env файл (раздел 10)
9. Перезапустите приложение: npm run dev
10. Попробуйте войти на /admin-login с логином "admin"
*/