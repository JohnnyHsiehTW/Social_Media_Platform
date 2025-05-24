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

function Cart() {
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
              <tr className="bg-card flex w-full items-center justify-center text-xl">
                <th className="flex-1 p-1">
                  <Checkbox className="cursor-pointer data-[state=checked]:border-[#fce8ca] data-[state=checked]:text-[#fce8ca]" />
                </th>
                <th className="flex-2 p-2">商品圖片</th>
                <th className="flex-4 p-2">品名</th>
                <th className="flex-1 p-2">數量</th>
                <th className="flex-1 p-2">單價</th>
                <th className="flex-1 p-2">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr className="flex w-full items-center justify-center border-t-1 hover:bg-[#38332d]">
                <td className="flex-1 p-1 text-center">
                  <Checkbox className="cursor-pointer data-[state=checked]:border-[#fce8ca] data-[state=checked]:text-[#fce8ca]" />
                </td>
                <td className="flex-2 p-2">
                  <img
                    className="mx-auto w-20 rounded"
                    src="https://cmncvclhjzmwzdvowmih.supabase.co/storage/v1/object/public/products-img/categories/HG/HG_Product_001/GQuuuuuux_001.jpg"
                    alt=""
                  />
                </td>
                <td className="w-15 flex-4 p-2">
                  <p className="truncate">HG 1/144 GQuuuuuux 組裝模型HG 1/144 GQuuuuuux 組裝模型</p>
                </td>
                <td className="flex-1 p-2">
                  <div className="flex items-center justify-center gap-1">
                    <p>1</p>
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
                  <p className="text-center">$700</p>
                </td>
                <td className="flex-1 p-2 text-center">
                  <button type="button" className="cursor-pointer p-2 hover:text-[#debf8c]">
                    <IoMdClose className="text-2xl" style={{ height: '20px', width: '20px' }} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-5 flex items-center justify-end gap-2">
            <p className="text-right text-lg">
              合計金額<span className="pl-5">$1400</span>
            </p>
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
