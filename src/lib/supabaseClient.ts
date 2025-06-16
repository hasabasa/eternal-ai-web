import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if environment variables are properly configured
if (!supabaseUrl || !supabaseAnonKey || 
    supabaseUrl === 'your_supabase_project_url_here' || 
    supabaseAnonKey === 'your_supabase_anon_key_here') {
  throw new Error('Please configure your Supabase environment variables. Click "Connect to Supabase" in the top right to set up your project.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to get current user
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Helper function to get user profile
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('manager_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
  
  return data
}

// Helper function to check if user is admin
export const isAdmin = async (userId: string) => {
  const profile = await getUserProfile(userId)
  return profile?.role === 'admin'
}