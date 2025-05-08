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

// 全新動畫作品『機動戰士Gundam GQuuuuuuX』 正式啟動!
// 精密再現每個細節,將主角機最速立體商品化!
// 忠實再現了機體極具特徵的外型。
// 透過身體、股關節等各部位關節的可動性,實現充滿動感的架勢動作。
// 背包具有靈活的可動性,能夠藉由調整角度展現各種不同的造型。
// 附屬豐富多樣的武器配件。
