import supabase from './supabaseClient'

export async function apiLogin({ email, password }) {
  try {
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data
  } catch (error) {
    console.log('error', error)
  }
}
