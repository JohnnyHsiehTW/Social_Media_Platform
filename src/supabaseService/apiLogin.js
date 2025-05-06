import { toast } from 'sonner'
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
    if (error instanceof Error) {
      toast.error(`發生錯誤: ${error.message}`)
    } else {
      toast.error('發生未知錯誤，請稍後再試！')
    }
  }
}
