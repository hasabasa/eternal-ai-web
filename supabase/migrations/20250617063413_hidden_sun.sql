-- =====================================================
-- ИСПРАВЛЕНИЕ ДУБЛИРОВАНИЯ АДМИНИСТРАТОРА
-- =====================================================

-- 1. ДИАГНОСТИКА ТЕКУЩЕГО СОСТОЯНИЯ
-- =====================================================

-- Проверяем всех пользователей в auth.users
SELECT 
  'AUTH USERS:' as info,
  id,
  email,
  email_confirmed_at IS NOT NULL as confirmed,
  created_at
FROM auth.users 
WHERE email LIKE '%@internal.local'
ORDER BY created_at;

-- Проверяем все профили в manager_profiles
SELECT 
  'MANAGER PROFILES:' as info,
  id,
  user_id,
  username,
  role,
  created_at
FROM manager_profiles 
ORDER BY created_at;

-- Проверяем соответствие между таблицами
SELECT 
  'MATCHING CHECK:' as info,
  u.id as auth_user_id,
  u.email,
  mp.user_id as profile_user_id,
  mp.username,
  mp.role,
  CASE 
    WHEN u.id = mp.user_id THEN 'MATCH' 
    ELSE 'MISMATCH' 
  END as status
FROM auth.users u
FULL OUTER JOIN manager_profiles mp ON u.id = mp.user_id
WHERE u.email LIKE '%@internal.local' OR mp.username IS NOT NULL;

-- 2. ИСПРАВЛЕНИЕ ПРОБЛЕМЫ
-- =====================================================

-- Вариант A: Если нужно обновить существующий профиль админа
-- (замените 'REAL_USER_ID' на ID пользователя из auth.users)

/*
UPDATE manager_profiles 
SET user_id = 'REAL_USER_ID'::uuid
WHERE username = 'admin';
*/

-- Вариант B: Если нужно удалить дублирующий профиль и создать новый
-- ОСТОРОЖНО! Это удалит существующий профиль админа

/*
-- Удаляем существующий профиль админа
DELETE FROM manager_profiles WHERE username = 'admin';

-- Создаем новый профиль (замените USER_ID на реальный)
INSERT INTO manager_profiles (user_id, username, base_salary, sales_percentage, kpi_target, role)
VALUES (
  'REAL_USER_ID'::uuid, 
  'admin', 
  0, 
  0, 
  0, 
  'admin'
);
*/

-- 3. АВТОМАТИЧЕСКОЕ ИСПРАВЛЕНИЕ
-- =====================================================

-- Этот блок автоматически найдет пользователя admin@internal.local
-- и обновит профиль админа с правильным user_id

DO $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Находим ID пользователя admin@internal.local
  SELECT id INTO admin_user_id
  FROM auth.users 
  WHERE email = 'admin@internal.local';
  
  IF admin_user_id IS NULL THEN
    RAISE NOTICE 'ОШИБКА: Пользователь admin@internal.local не найден в auth.users';
    RAISE NOTICE 'Создайте пользователя через Authentication → Users → Add user';
    RAISE NOTICE 'Email: admin@internal.local';
    RAISE NOTICE 'Password: Admin123!';
    RAISE NOTICE 'Auto Confirm User: включите галочку';
  ELSE
    -- Обновляем существующий профиль админа
    UPDATE manager_profiles 
    SET user_id = admin_user_id
    WHERE username = 'admin';
    
    RAISE NOTICE 'Профиль админа обновлен. User ID: %', admin_user_id;
    
    -- Проверяем результат
    IF FOUND THEN
      RAISE NOTICE 'Обновление выполнено успешно';
    ELSE
      RAISE NOTICE 'Профиль админа не найден для обновления';
    END IF;
  END IF;
END $$;

-- 4. ПРОВЕРКА ПОСЛЕ ИСПРАВЛЕНИЯ
-- =====================================================

-- Финальная проверка соответствия
SELECT 
  'FINAL CHECK:' as status,
  u.id as auth_user_id,
  u.email,
  u.email_confirmed_at IS NOT NULL as email_confirmed,
  mp.user_id as profile_user_id,
  mp.username,
  mp.role,
  CASE 
    WHEN u.id = mp.user_id THEN '✅ CORRECT' 
    ELSE '❌ INCORRECT' 
  END as match_status
FROM auth.users u
JOIN manager_profiles mp ON u.id = mp.user_id
WHERE u.email = 'admin@internal.local' AND mp.username = 'admin';

-- 5. ТЕСТ ФУНКЦИИ is_admin (после входа в систему)
-- =====================================================

-- Этот запрос можно выполнить только после входа в систему
-- SELECT 
--   auth.uid() as current_user_id,
--   is_admin() as is_admin_result;

-- =====================================================
-- ИНСТРУКЦИЯ ПО ПРИМЕНЕНИЮ
-- =====================================================

/*
ШАГИ ДЛЯ ИСПРАВЛЕНИЯ:

1. Выполните раздел 1 (ДИАГНОСТИКА) - посмотрите на результаты

2. Если пользователь admin@internal.local НЕ СУЩЕСТВУЕТ:
   - Перейдите в Authentication → Users → Add user
   - Email: admin@internal.local
   - Password: Admin123!
   - Auto Confirm User: ✅ включите
   - Нажмите Create user

3. Выполните раздел 3 (АВТОМАТИЧЕСКОЕ ИСПРАВЛЕНИЕ)
   - Это автоматически найдет пользователя и обновит профиль

4. Выполните раздел 4 (ПРОВЕРКА)
   - Убедитесь, что статус показывает "✅ CORRECT"

5. Попробуйте войти в систему:
   - Откройте /admin-login
   - Логин: admin
   - Пароль: Admin123!

ЕСЛИ ПРОБЛЕМЫ ПРОДОЛЖАЮТСЯ:
- Проверьте файл .env (VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY)
- Перезапустите сервер: npm run dev
- Используйте отладочный режим на странице входа
*/