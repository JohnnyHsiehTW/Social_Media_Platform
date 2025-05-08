import { Card } from '@/components/ui/card'
import Header from './components/Header'
import Navbar from './components/Navbar'
import { IoMenuSharp } from 'react-icons/io5'
import { IoCartOutline } from 'react-icons/io5'

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { VisuallyHidden } from 'radix-ui'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from 'react'
import { apiGetProducts } from '@/supabaseService/apiProducts'
import { toast } from 'sonner'

const sytle = {
  cardGrid: 'md:grid md:grid-cols-2 md:gap-4',
}

function Market() {
  const [productsData, setProdcuctsData] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      const data = await apiGetProducts()
      setProdcuctsData(data)
    }
    getProducts()
  }, [])

  // 加入購物車
  const handleAddCart = () => {
    toast.error('功能更新中，暫時無法使用')
  }

  return (
    <>
      <Header />
      <div className={`mx-auto px-3 pt-17 pb-15 md:max-w-[680px] ${sytle.cardGrid}`}>
        {productsData.map((product) => {
          return (
            <Card key={product.id} className={`mb-5 border-0 p-3 py-4 text-white`}>
              <div className="flex w-full gap-3">
                <div className="flex flex-1">
                  <img
                    className="w-full rounded-md object-contain"
                    src={product.img_url[0].url}
                    alt=""
                  />
                </div>
                <div className="flex flex-2 flex-col justify-between px-2">
                  <div>
                    <Badge variant="secondary" className="font-bold">
                      {product.category}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-md mt-2 line-clamp-2 max-h-12 overflow-hidden overflow-ellipsis">
                      {product.title}
                    </p>
                  </div>
                  <div className="mt-3 flex justify-between">
                    <p className="text-2xl font-bold">
                      $<span className="">{product.price}</span>
                    </p>
                    <button type="button" onClick={() => handleAddCart()}>
                      <IoCartOutline className="text-3xl" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
      <div className="fixed right-3 bottom-15 mb-2 text-end">
        <Drawer>
          <DrawerTrigger className="rounded-full border bg-white p-2">
            <IoMenuSharp className="text-2xl" />
          </DrawerTrigger>
          <DrawerTitle>
            <VisuallyHidden.Root>分類</VisuallyHidden.Root>
          </DrawerTitle>
          <DrawerDescription>
            <VisuallyHidden.Root>商品分類</VisuallyHidden.Root>
          </DrawerDescription>
          <DrawerContent>
            <div className="my-3 flex justify-center gap-2 p-2 text-white">
              <button className="w-20 rounded-full border bg-white p-2 md:h-20">
                <p className="text-center text-sm font-bold text-black">全部</p>
              </button>
              <button className="w-20 rounded-full border bg-white p-2 md:h-20">
                <p className="text-center text-sm font-bold text-black">
                  HG
                  <br />
                  1/144
                </p>
              </button>
              <button className="w-20 rounded-full border bg-white p-2 md:h-20">
                <p className="text-center text-sm font-bold text-black">
                  RG
                  <br />
                  1/144
                </p>
              </button>
              <button className="w-20 rounded-full border bg-white p-2 md:h-20">
                <p className="text-center text-sm font-bold text-black">
                  MG
                  <br />
                  1/100
                </p>
              </button>
              <button className="w-20 rounded-full border bg-white p-2 md:h-20">
                <p className="text-center text-sm font-bold text-black">
                  PG
                  <br />
                  1/60
                </p>
              </button>
              <button className="w-20 rounded-full border bg-white p-2 md:h-20">
                <p className="text-center text-sm font-bold text-black">其他</p>
              </button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      <Navbar />
    </>
  )
}

export default Market
