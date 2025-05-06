import { toast } from 'sonner'
import supabase from './supabaseClient'

// 取得用戶id
export async function getUserId() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  } catch (error) {
    if (error instanceof Error) {
      toast.error('取得使用者資料失敗，請嘗試重新登入')
    } else {
      toast.error('發生未知錯誤，請稍後再試')
    }
  }
}
