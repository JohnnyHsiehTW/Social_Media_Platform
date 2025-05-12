import { toast } from 'sonner'
import supabase from './supabaseClient'

// 取得特定使用者資料
export async function apiGetUsers() {
  try {
    let { data: users, error } = await supabase.from('users').select('*')
    if (error) throw error
    return users
  } catch (error) {
    if (error instanceof Error) {
      toast.error(`發生錯誤: ${error.message}`)
    } else {
      toast.error('發生未知錯誤，請稍後再試！')
    }
  }
}

// 取得特定使用者資料
export async function apiGetUser(userId) {
  try {
    let { data: users, error } = await supabase.from('users').select('*').eq('id', userId)
    if (error) throw error
    return users
  } catch (error) {
    if (error instanceof Error) {
      toast.error(`發生錯誤: ${error.message}`)
    } else {
      toast.error('發生未知錯誤，請稍後再試！')
    }
  }
}

// 新增使用者資料 (新增資料至 users 資料表)

// 更新使用者資料
export async function apiUpdateUser(updateData, userId) {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({
        username: updateData?.username,
        name: updateData?.name,
        phone: updateData?.phone,
        address: updateData?.address,
      })
      .eq('id', userId)
      .select()
    if (error) throw error
    toast.success('使用者資料已成功更新')
    return data
  } catch (error) {
    toast.error('使用者資料更新失敗，請稍後再試')
    if (error instanceof Error) {
      toast.error('使用者資料更新失敗，請稍後再試')
    } else {
      toast.error('發生未知錯誤，請稍後再試')
    }
  }
}

// 更新使用者頭貼
export async function apiUpdateUserImage(publicUrl, userId) {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({
        img_url: publicUrl,
      })
      .eq('id', userId)
      .select()
    if (error) throw error
    toast.success('使用者頭貼已成功更新')
    return data
  } catch (error) {
    if (error instanceof Error) {
      toast.error('使用者頭貼更新失敗，請稍後再試')
    } else {
      toast.error('發生未知錯誤，請稍後再試')
    }
  }
}
