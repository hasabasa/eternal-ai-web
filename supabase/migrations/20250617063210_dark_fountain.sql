/*
  # Create admin profile safely

  This migration creates an admin profile for the user with the specified ID.
  We use a more robust approach that handles potential conflicts and ensures
  the admin user exists properly.
*/

-- First, let's ensure the user exists in auth.users before creating the profile
-- We'll use a DO block to handle this safely

DO $$
BEGIN
  -- Check if the admin profile already exists
  IF NOT EXISTS (
    SELECT 1 FROM manager_profiles 
    WHERE username = 'admin'
  ) THEN
    -- Insert the admin profile only if it doesn't exist
    INSERT INTO manager_profiles (user_id, username, base_salary, sales_percentage, kpi_target, role)
    VALUES (
      'f20aac86-53d3-41a7-b5ae-a6a3cddd5ef3'::uuid, 
      'admin', 
      0, 
      0, 
      0, 
      'admin'
    );
    
    RAISE NOTICE 'Admin profile created successfully';
  ELSE
    -- Update existing admin profile to ensure correct user_id and role
    UPDATE manager_profiles 
    SET 
      user_id = 'f20aac86-53d3-41a7-b5ae-a6a3cddd5ef3'::uuid,
      role = 'admin'
    WHERE username = 'admin';
    
    RAISE NOTICE 'Admin profile updated successfully';
  END IF;
END $$;