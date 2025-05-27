import { toast } from 'sonner'
import supabase from './supabaseClient'

// 取得購物車資料
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

// 建立購物車
export async function apiCreateCart(userId) {
  await supabase.from('carts').insert([{ user_id: userId }])
}

// 加入購物車
// 資料型式：商品、數量
export async function apiAddCartItems(productId, userId, cartId) {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .insert([{ user_id: userId, quantity: 1, product_id: productId, cart_id: cartId }])
    if (error) throw error
    toast.success('成功加入購物車')
    return data
  } catch (error) {
    console.log(error)
  }
}

// 更新購物車
// 資料型式：商品、數量
export async function apiUpdateCartItems(cartItemId, quantity) {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity: quantity })
      .eq('id', cartItemId)
    if (error) throw error
    toast.success('成功更新購物車數量')
    return data
  } catch (error) {
    console.log(error)
  }
}

// mutationFn 判斷加入或更新購物車
export async function apiAddOrUpdateCartItem({
  productId,
  userId,
  cartId,
  cartItemId,
  quantity,
  isUpdate,
}) {
  if (isUpdate) {
    // 更新
    return await apiUpdateCartItems(cartItemId, quantity)
  } else {
    // 新增
    return await apiAddCartItems(productId, userId, cartId)
  }
}

// 刪除購物車商品
export async function apiDeleteCartItems(productId) {
  const { error } = await supabase.from('cart_items').delete().eq('product_id', productId)
  if (error) throw error
}
