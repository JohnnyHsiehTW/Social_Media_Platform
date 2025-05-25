import { toast } from 'sonner'
import supabase from './supabaseClient'

export async function apiGetCarts(userId) {
  try {
    let { data: carts, error } = await supabase
      .from('carts')
      .select(
        'id,total_amount,cart_items:cart_items(id,quantity,products:products(id,img_url,price,title))'
      )
      .eq('user_id', userId)
    if (error) throw error
    return carts
  } catch (error) {
    if (error instanceof Error) {
      toast.error(`發生錯誤: ${error.message}`)
    } else {
      toast.error('發生未知錯誤，請稍後再試')
    }
  }
}
