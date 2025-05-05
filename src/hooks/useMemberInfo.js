import { apiGetUser } from '@/supabaseService/apiUsers'
import supabase from '@/supabaseService/supabaseClient'
import { useEffect, useState } from 'react'

export function useMemberInfo() {
  const [userInfo, setUserInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
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
        setError('取得資料錯誤')
        setIsLoading(false)
        return
      }

      const userId = session.user.id

      try {
        const users = await apiGetUser({ userId })
        if (users && users.length > 0) {
          setUserInfo(users[0])
        } else {
          setError('找不到用戶資料')
        }
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    getUserInfo()
  }, [])

  return {
    userInfo,
    error,
    isLoading,
    authUser,
  }
}
