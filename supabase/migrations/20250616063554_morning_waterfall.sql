/*
  # Create manager profiles table

  1. New Tables
    - `manager_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `username` (text, unique)
      - `base_salary` (numeric)
      - `sales_percentage` (numeric)
      - `kpi_target` (numeric)
      - `role` (text, default 'manager')
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `manager_profiles` table
    - Add policy for managers to read their own data
    - Add policy for admins to manage all profiles
*/

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

ALTER TABLE manager_profiles ENABLE ROW LEVEL SECURITY;

-- Policy for managers to view and update their own profile
CREATE POLICY "Managers can view and update their own profile"
  ON manager_profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for admins to manage all manager profiles
CREATE POLICY "Admins can manage all manager profiles"
  ON manager_profiles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.manager_profiles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Create an admin user profile (you'll need to update this with actual admin user_id)
-- This is a placeholder - you'll need to create the admin user first through Supabase Auth
-- INSERT INTO manager_profiles (user_id, username, base_salary, sales_percentage, kpi_target, role)
-- VALUES ('ADMIN_USER_ID_HERE', 'admin', 0, 0, 0, 'admin');