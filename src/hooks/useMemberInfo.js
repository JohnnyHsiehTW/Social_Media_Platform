import { apiGetUser } from '@/supabaseService/apiUsers'
import supabase from '@/supabaseService/supabaseClient'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

// 取得使用者基本資料
export function useMemberInfo() {
  const [userInfo, setUserInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await supabase.auth.getSession()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setAuthUser(user)

      const session = data.session
      if (!data) {
        setIsLoading(false)
        return
      }

      const userId = session.user.id

      try {
        const users = await apiGetUser({ userId })
        if (users && users.length > 0) {
          setUserInfo(users[0])
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error('取得使用者資料失敗，請稍後再試')
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
    authUser,
  }
}
