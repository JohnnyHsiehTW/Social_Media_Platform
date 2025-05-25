import { apiGetCarts } from '@/supabaseService/apiCarts'
import { useQuery } from '@tanstack/react-query'

export function useCartItems(userId) {
  const {
    data: carts = [],
    error: isError,
    isLoading,
  } = useQuery({
    queryKey: ['carts', userId],
    queryFn: () => apiGetCarts(userId),
    enabled: !!userId,
  })

  return { carts, isError, isLoading }
}
