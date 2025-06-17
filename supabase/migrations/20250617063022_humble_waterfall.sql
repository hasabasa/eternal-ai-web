/*
  # Fix infinite recursion in admin RLS policy

  1. Problem
    - The admin policy on `manager_profiles` table causes infinite recursion
    - Policy tries to query the same table it's protecting to check admin role
    - This creates a circular dependency during policy evaluation

  2. Solution
    - Create a `SECURITY DEFINER` function that bypasses RLS
    - Replace the recursive policy with one that uses this function
    - Function executes with elevated privileges to avoid recursion

  3. Changes
    - Drop existing problematic admin policy
    - Create `is_admin()` function with SECURITY DEFINER
    - Create new admin policy using the function
    - Grant execute permissions to authenticated users
*/

-- Drop the existing problematic admin policy
DROP POLICY IF EXISTS "Admins can manage all manager profiles" ON manager_profiles;

-- Create a SECURITY DEFINER function to check admin status
-- This function bypasses RLS and prevents infinite recursion
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

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;

-- Create new admin policy using the SECURITY DEFINER function
CREATE POLICY "Admins can manage all manager profiles"
  ON manager_profiles
  FOR ALL
  TO authenticated
  USING (is_admin());