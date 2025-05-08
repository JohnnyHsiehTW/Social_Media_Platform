import supabase from '@/supabaseService/supabaseClient'
import { useState, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router'
import { toast } from 'sonner'

function ProtectedRoutes() {
  const [isAuth, setIsAuth] = useState(null)

  useEffect(() => {
    let isMounted = true

    // 1. 先取一次 session
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (isMounted) setIsAuth(!!session)
      })
      .catch(() => {
        if (isMounted) setIsAuth(false)
      })

    // 2. 監聽登入登出
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) setIsAuth(!!session)
    })

    // 3. 清除訂閱
    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  if (isAuth === null) {
    return <div>載入中…</div>
  } else if (isAuth === false) {
    toast.error('請先登入才能使用此功能')
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoutes
