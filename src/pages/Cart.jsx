import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import Header from './components/Header'
import Navbar from './components/Navbar'
import '@/styles/table.css'

import { FaAngleUp } from 'react-icons/fa'
import { FaAngleDown } from 'react-icons/fa'
import { FaCashRegister } from 'react-icons/fa6'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { IoMdClose } from 'react-icons/io'
import { useCarts } from '@/hooks/useCarts'
import { useGetUserId } from '@/hooks/useAuth'

import { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { apiDeleteCartItems } from '@/supabaseService/apiCarts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

function Cart() {
  // 取得使用者驗證
  const { userId } = useGetUserId()

  // 取得購物車資料
  const queryClient = useQueryClient()
  const { carts, isError, isLoading } = useCarts(userId)

  const [totalAmount, setTotalAmount] = useState(0)
  useEffect(() => {
    if (!isError && !isLoading && carts) {
      setTotalAmount(carts[0]?.total_amount)
    }
  }, [carts, isError, isLoading])

  const shippingFee = 100

  const mutation = useMutation({
    mutationFn: apiDeleteCartItems,
    onSuccess: () => {
      queryClient.invalidateQueries(['carts', userId])
    },
    onError: () => {
      toast.error('刪除商品失敗')
    },
  })

  // 刪除購物車單一商品
  const handleDelete = (cartItemId, productId) => {
    mutation.mutate({
      cartItemId,
      productId,
    })
  }

  // 清空購物車

  return (
    <>
      <Header />
      <div className="mx-auto p-3 pt-17 md:max-w-[1000px]">
        <div className="mb-3 flex justify-end">
          <Button className="btn-basic border">
            <RiDeleteBin6Fill />
            清空購物車
          </Button>
        </div>
        <div className="text-white">
          <table className="w-full">
            <thead className="w-full">
              <tr className="mb-3 flex w-full items-center justify-center rounded bg-[#292929] text-lg text-[#c8b9a2]">
                <th className="flex-1 p-1">
                  <Checkbox className="cursor-pointer data-[state=checked]:border-[#fce8ca] data-[state=checked]:text-[#fce8ca]" />
                </th>
                <th className="flex-2 p-2">圖片</th>
                <th className="flex-4 p-2">品名</th>
                <th className="flex-1 p-2">數量</th>
                <th className="flex-1 p-2">單價</th>
                <th className="flex-1 p-2">操作</th>
              </tr>
            </thead>
          </table>
          {carts[0]?.cart_items.length > 0 ? (
            <table className="w-full">
              <tbody>
                {carts[0]?.cart_items?.map((item) => {
                  return (
                    <tr
                      key={item.id}
                      className="bg-card mb-3 flex w-full items-center justify-center rounded py-2 transition hover:bg-[#38332d]"
                    >
                      <td className="flex-1 p-1 text-center">
                        <Checkbox className="cursor-pointer data-[state=checked]:border-[#fce8ca] data-[state=checked]:text-[#fce8ca]" />
                      </td>
                      <td className="flex-2 p-2">
                        <img
                          className="bg-background mx-auto h-20 w-20 rounded object-contain"
                          src={item.products?.img_url[0].url}
                          alt={item.products?.title}
                        />
                      </td>
                      <td className="w-15 flex-4 p-2">
                        <p className="truncate">{item.products?.title}</p>
                      </td>
                      <td className="flex-1 p-2">
                        <div className="flex items-center justify-center gap-1">
                          <p>{item.quantity}</p>
                          <div className="flex flex-col">
                            <button type="button" className="cursor-pointer hover:text-[#debf8c]">
                              <FaAngleUp />
                            </button>
                            <button type="button" className="cursor-pointer hover:text-[#debf8c]">
                              <FaAngleDown />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="flex-1 p-2">
                        <p className="text-center">${item.products?.price}</p>
                      </td>
                      <td className="flex-1 p-2 text-center">
                        <button
                          type="button"
                          className="cursor-pointer p-2 hover:text-red-400"
                          onClick={() => {
                            const cartItemId = item.id
                            const productId = item.products.id
                            handleDelete(cartItemId, productId)
                          }}
                        >
                          <IoMdClose
                            className="text-2xl"
                            style={{ height: '20px', width: '20px' }}
                          />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <div className="w-full p-10 text-center">
              <p>目前購物車沒有商品</p>
            </div>
          )}
          <div className="mb-3 flex justify-between sm:justify-end">
            <div className="hidden sm:block sm:flex-5"></div>
            <div className="my-5 flex w-full flex-col gap-7 sm:flex-2">
              <div className="flex items-center justify-between border-b border-gray-600 p-1">
                <p className="text-lg font-bold">運費</p>
                <p className="pl-5 text-lg font-bold">$100</p>
              </div>
              <div className="flex items-center justify-between border-b border-gray-600 p-1">
                <p className="text-lg font-bold">商品金額</p>
                <p className="pl-5 text-lg font-bold">${totalAmount}</p>
              </div>
              <div className="flex items-center justify-between border-b border-gray-600 p-1">
                <p className="text-lg font-bold">合計金額</p>
                <p className="pl-5 text-lg font-bold">${totalAmount + shippingFee}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center sm:justify-end">
            <Button className="btn-basic border">
              <FaCashRegister />
              結帳
            </Button>
          </div>
        </div>
      </div>
      <Navbar />
    </>
  )
}

export default Cart
