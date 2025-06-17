/*
  # Create admin profile

  1. Data Changes
    - Insert admin profile for user f20aac86-53d3-41a7-b5ae-a6a3cddd5ef3
    - Set role as 'admin' with username 'admin'

  2. Notes
    - This assumes the user already exists in auth.users
    - The user_id corresponds to the admin user created in Supabase Auth
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
)
ON CONFLICT (username) DO UPDATE SET
  user_id = EXCLUDED.user_id,
  role = EXCLUDED.role;