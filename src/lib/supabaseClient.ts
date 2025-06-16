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

// Helper function to convert username to email format for Supabase Auth
export const usernameToEmail = (username: string) => {
  return `${username}@internal.local`
}

// Helper function to extract username from email
export const emailToUsername = (email: string) => {
  return email.replace('@internal.local', '')
}

// Custom login function using username and password
export const loginWithUsername = async (username: string, password: string) => {
  const email = usernameToEmail(username)
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  return { data, error }
}

// Custom signup function using username and password
export const signUpWithUsername = async (username: string, password: string) => {
  const email = usernameToEmail(username)
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: undefined, // Disable email confirmation
      data: {
        username: username
      }
    }
  })
  
  return { data, error }
}

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

// Helper function to create user with username
export const createUserWithUsername = async (username: string, password: string, profileData: any) => {
  try {
    // Create user in Supabase Auth
    const { data: authData, error: authError } = await signUpWithUsername(username, password)
    
    if (authError) {
      throw authError
    }
    
    if (!authData.user) {
      throw new Error('Failed to create user')
    }
    
    // Create profile
    const { error: profileError } = await supabase
      .from('manager_profiles')
      .insert({
        user_id: authData.user.id,
        username: username,
        ...profileData
      })
    
    if (profileError) {
      throw profileError
    }
    
    return { data: authData, error: null }
  } catch (error) {
    return { data: null, error }
  }
}