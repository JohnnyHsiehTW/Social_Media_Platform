import supabase from './supabaseClient'

// 取得用戶id
export async function getUserId() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.log(error)
  }
}
