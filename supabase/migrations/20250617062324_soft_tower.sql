/*
  Создание профиля администратора
  
  User UID: f20aac86-53d3-41a7-b5ae-a6a3cddd5ef3
  Username: admin
  Role: admin
*/

-- Создаем профиль администратора с полученным User UID
INSERT INTO manager_profiles (user_id, username, base_salary, sales_percentage, kpi_target, role)
VALUES (
  'f20aac86-53d3-41a7-b5ae-a6a3cddd5ef3', 
  'admin', 
  0, 
  0, 
  0, 
  'admin'
);

-- Проверяем, что профиль создался
SELECT * FROM manager_profiles WHERE username = 'admin';

-- Проверяем связь между auth.users и manager_profiles
SELECT 
  u.id as auth_user_id,
  u.email,
  u.email_confirmed_at,
  mp.user_id as profile_user_id,
  mp.username,
  mp.role,
  mp.created_at
FROM auth.users u
LEFT JOIN manager_profiles mp ON u.id = mp.user_id
WHERE u.email = 'admin@internal.local';