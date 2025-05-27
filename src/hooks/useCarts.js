import { apiGetCarts } from '@/supabaseService/apiCarts'
import { useQuery } from '@tanstack/react-query'

export function useCarts(userId) {
  const {
    data: carts = [],
    error: isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['carts', userId],
    queryFn: () => apiGetCarts(userId),
    enabled: !!userId,
  })

  return { carts, isError, isLoading, refetch }
}
