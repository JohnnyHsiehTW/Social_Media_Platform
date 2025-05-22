import { toast } from 'sonner'
import supabase from './supabaseClient'

export async function apiGetProducts() {
  try {
    let { data: products, error } = await supabase.from('products').select('*')
    if (error) throw error
    return products
  } catch (error) {
    if (error instanceof Error) {
      toast.error('取得商品失敗，請稍後再試')
    } else {
      toast.error('發生不明錯誤，請稍後再試')
    }
  }
}

// 圖片格式
// const product001 = [
//   {
//     url: 'https://cmncvclhjzmwzdvowmih.supabase.co/storage/v1/object/public/products-img/categories/HG/HG_Product_001/GQuuuuuux_001.jpg',
//   },
//   {
//     url: 'https://cmncvclhjzmwzdvowmih.supabase.co/storage/v1/object/public/products-img/categories/HG/HG_Product_001/GQuuuuuux_002.jpg',
//   },
//   {
//     url: 'https://cmncvclhjzmwzdvowmih.supabase.co/storage/v1/object/public/products-img/categories/HG/HG_Product_001/GQuuuuuux_003.jpg',
//   },
// ]
