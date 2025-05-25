import { toast } from 'sonner'
import supabase from './supabaseClient'

export async function apiGetCarts(userId) {
  try {
    let { data: carts, error } = await supabase
      .from('cart_items')
      .select('id,quantity,products:products(id,img_url,price,title)')
      .eq('user_id', userId)
    if (error) throw error
    return {
      carts,
      error,
    }
  } catch (error) {
    if (error instanceof Error) {
      toast.error(`發生錯誤: ${error.message}`)
    } else {
      toast.error('發生未知錯誤，請稍後再試')
    }
  }
}
