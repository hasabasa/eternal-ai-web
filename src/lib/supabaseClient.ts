import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if environment variables are properly configured
if (!supabaseUrl || !supabaseAnonKey || 
    supabaseUrl === 'your_supabase_project_url_here' || 
    supabaseAnonKey === 'your_supabase_anon_key_here') {
  throw new Error('Please configure your Supabase environment variables. Click "Connect to Supabase" in the top right to set up your project.')
}

// Добавляем отладочную информацию
console.log('🔧 Supabase Configuration Debug:')
console.log('URL:', supabaseUrl)
console.log('Anon Key (first 20 chars):', supabaseAnonKey?.substring(0, 20) + '...')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to convert username to email format for Supabase Auth
export const usernameToEmail = (username: string) => {
  const email = `${username}@internal.local`
  console.log('🔄 Converting username to email:')
  console.log('Input username:', username)
  console.log('Generated email:', email)
  return email
}

// Helper function to extract username from email
export const emailToUsername = (email: string) => {
  const username = email.replace('@internal.local', '')
  console.log('🔄 Converting email to username:')
  console.log('Input email:', email)
  console.log('Extracted username:', username)
  return username
}

// Custom login function using username and password
export const loginWithUsername = async (username: string, password: string) => {
  console.log('🔐 Starting login process...')
  console.log('Username:', username)
  console.log('Password length:', password.length)
  
  const email = usernameToEmail(username)
  
  console.log('📧 Attempting Supabase auth with:', email)
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    console.log('📊 Supabase auth response:')
    console.log('Data:', data)
    console.log('Error:', error)
    
    if (error) {
      console.error('❌ Authentication failed:', error.message)
      console.error('Error details:', error)
    } else {
      console.log('✅ Authentication successful!')
      console.log('User ID:', data.user?.id)
      console.log('User email:', data.user?.email)
    }
    
    return { data, error }
  } catch (catchError) {
    console.error('💥 Unexpected error during authentication:', catchError)
    return { data: null, error: catchError }
  }
}

// Custom signup function using username and password
export const signUpWithUsername = async (username: string, password: string) => {
  console.log('📝 Starting signup process...')
  console.log('Username:', username)
  
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
  
  console.log('📊 Supabase signup response:')
  console.log('Data:', data)
  console.log('Error:', error)
  
  return { data, error }
}

// Helper function to get current user
export const getCurrentUser = async () => {
  console.log('👤 Getting current user...')
  const { data: { user } } = await supabase.auth.getUser()
  console.log('Current user:', user)
  return user
}

// Helper function to get user profile
export const getUserProfile = async (userId: string) => {
  console.log('📋 Getting user profile for ID:', userId)
  
  const { data, error } = await supabase
    .from('manager_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  console.log('📊 Profile query response:')
  console.log('Data:', data)
  console.log('Error:', error)
  
  if (error) {
    console.error('❌ Error fetching user profile:', error)
    return null
  }
  
  return data
}

// Helper function to check if user is admin
export const isAdmin = async (userId: string) => {
  const profile = await getUserProfile(userId)
  const adminStatus = profile?.role === 'admin'
  console.log('🔒 Admin check for user:', userId, 'Result:', adminStatus)
  return adminStatus
}

// Helper function to create user with username
export const createUserWithUsername = async (username: string, password: string, profileData: any) => {
  console.log('🆕 Creating new user with username:', username)
  
  try {
    // Create user in Supabase Auth
    const { data: authData, error: authError } = await signUpWithUsername(username, password)
    
    if (authError) {
      console.error('❌ Auth creation failed:', authError)
      throw authError
    }
    
    if (!authData.user) {
      console.error('❌ No user returned from auth')
      throw new Error('Failed to create user')
    }
    
    console.log('✅ Auth user created:', authData.user.id)
    
    // Create profile
    const { error: profileError } = await supabase
      .from('manager_profiles')
      .insert({
        user_id: authData.user.id,
        username: username,
        ...profileData
      })
    
    if (profileError) {
      console.error('❌ Profile creation failed:', profileError)
      throw profileError
    }
    
    console.log('✅ Profile created successfully')
    
    return { data: authData, error: null }
  } catch (error) {
    console.error('💥 User creation failed:', error)
    return { data: null, error }
  }
}

// Функция для проверки подключения к Supabase
export const testSupabaseConnection = async () => {
  console.log('🔍 Testing Supabase connection...')
  
  try {
    // Проверяем подключение к базе данных
    const { data, error } = await supabase
      .from('manager_profiles')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('❌ Database connection failed:', error)
      return { success: false, error: error.message }
    }
    
    console.log('✅ Database connection successful')
    
    // Проверяем аутентификацию
    const { data: { session } } = await supabase.auth.getSession()
    console.log('Current session:', session)
    
    return { success: true, data }
  } catch (error) {
    console.error('💥 Connection test failed:', error)
    return { success: false, error: error.message }
  }
}