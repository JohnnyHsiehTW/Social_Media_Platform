import { apiGetUser, apiGetUsers } from '@/supabaseService/apiUsers'
import { useQuery } from '@tanstack/react-query'

// 取得所有使用者資料
export function useUsersData() {
  const {
    data: users = [],
    error: isError,
    isLoading,
  } = useQuery({
    queryKey: ['users'],
    queryFn: apiGetUsers,
  })

  return { users, isError, isLoading }
}

// 取得特定使用者資料
export function useUserData() {
  const {
    data: user = [],
    error: isError,
    isLoading,
  } = useQuery({
    queryKey: ['user'],
    queryFn: apiGetUser,
  })

  return { user, isError, isLoading }
}
