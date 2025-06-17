/*
  # Создание профиля администратора

  1. Создание записи администратора в manager_profiles
  2. Связывание с существующим пользователем из auth.users
*/

-- Создаем профиль администратора
INSERT INTO manager_profiles (user_id, username, base_salary, sales_percentage, kpi_target, role)
VALUES (
  'f20aac86-53d3-41a7-b5ae-a6a3cddd5ef3'::uuid, 
  'admin', 
  0, 
  0, 
  0, 
  'admin'
);