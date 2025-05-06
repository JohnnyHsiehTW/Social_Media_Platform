import { apiLogin } from '@/supabaseService/apiLogin'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import supabase from '@/supabaseService/supabaseClient'
import { getUserId } from '@/supabaseService/apiAuth'
import { toast } from 'sonner'

// 登入
export function useLogin() {
  const navigate = useNavigate()

  const apiLoginHandler = async ({ email, password }) => {
    try {
      const userData = await apiLogin({ email, password })
      if (userData) {
        toast.success('登入成功')
        navigate('/memberInfo')
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error('登入失敗，請稍後再試')
      } else {
        toast.error('發生未知錯誤，請稍後再試')
      }
    }
  }
  return {
    apiLoginHandler,
  }
}

// 登出
export function useLogout() {
  const apiLogoutHandler = async () => {
    try {
      let { error } = await supabase.auth.signOut()
      if (error) throw error
      toast.success('登出成功')
    } catch (error) {
      if (error instanceof Error) {
        toast.error('登出失敗，請稍後再試')
      } else {
        toast.error('發生未知錯誤，請稍後再試')
      }
    }
  }
  return {
    apiLogoutHandler,
  }
}

// 註冊
export function useRegister() {
  const navigate = useNavigate()
  const apiSignup = async ({ email, password, userData }) => {
    try {
      let { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })
      if (signUpData) {
        navigate('/login')
      }
      if (signUpError) throw signUpError

      const userId = signUpData.user.id

      const { insertError } = await supabase
        .from('users')
        .insert([
          {
            id: userId,
            email: userData.email,
            username: userData.username,
            img_url: userData.img_url,
          },
        ])
        .select()
      if (insertError) throw insertError
      toast.success('已成功註冊，請至登入頁面重新登入')
    } catch (error) {
      if (error instanceof Error) {
        toast.error('註冊失敗，請稍後再試')
      } else {
        toast.error('發生未知錯誤，請稍後再試')
      }
    }
  }
  return {
    apiSignup,
  }
}

// 取得用戶ID
export function useGetUserId() {
  const [userId, setUserId] = useState('')
  useEffect(() => {
    async function getUser() {
      const result = await getUserId()
      if (result !== null) {
        const id = result.id
        setUserId(id)
      }
    }
    getUser()
  }, [])
  return { userId }
}
