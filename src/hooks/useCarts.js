import { apiGetCarts } from '@/supabaseService/apiCarts'
import { useQuery } from '@tanstack/react-query'

export function useCartItems(userId) {
  const {
    data: cartItems = [],
    error: isError,
    isLoading,
  } = useQuery({
    queryKey: ['cartItems', userId],
    queryFn: () => apiGetCarts(userId),
    enabled: !!userId,
  })

  return { cartItems, isError, isLoading }
}
