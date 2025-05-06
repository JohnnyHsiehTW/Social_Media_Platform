import { getUserId } from '@/supabaseService/apiAuth'
import { apiGetUser } from '@/supabaseService/apiUsers'
import supabase from '@/supabaseService/supabaseClient'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

// 取得使用者基本資料
export function useMemberInfo() {
  const [userInfo, setUserInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getUserInfo = async () => {
      // 取得登入狀態
      const { data } = await supabase.auth.getSession()
      // 取得 userId
      const user = await getUserId()

      if (!data) {
        setIsLoading(false)
        return
      }

      try {
        // 以 userId 取得使用者資料
        const users = await apiGetUser(user.id)
        if (users && users.length > 0) {
          setUserInfo(users[0])
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error('請先登入才能使用此功能')
        } else {
          toast.error('發生未知錯誤，請稍後再試')
        }
      } finally {
        setIsLoading(false)
      }
    }

    getUserInfo()
  }, [])

  return {
    userInfo,
    isLoading,
  }
}
