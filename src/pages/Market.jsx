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
import MarketSideNav from './components/MarketSideNav'

function Market() {
  const [productsData, setProdcuctsData] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      const data = await apiGetProducts()
      setProdcuctsData(data)
      setFilteredData(data)
    }
    getProducts()
  }, [])

  // 取得篩選資料
  const [filteredData, setFilteredData] = useState([])
  const [open, setOpen] = useState(false) // 控制 Drawer 關閉
  const [categoryActive, setcategoryActive] = useState(1)

  const onFilter = (e) => {
    e.preventDefault()
    console.log('target', e)
    const category = e.target.innerText.replace(/\n/g, ' ')
    setFilteredData(() => {
      return productsData.filter((product) => {
        if (category === 'HG 1/144') {
          return product.category === 'HG'
        }
        if (category === 'RG 1/144') {
          return product.category === 'RG'
        }
        if (category === 'MG 1/100') {
          return product.category === 'MG'
        }
        if (category === 'PG 1/60') {
          return product.category === 'PG'
        }
        if (category === '其他') {
          return product.category === '其他'
        } else {
          return true
        }
      })
    })
    setOpen(false)
    setcategoryActive(true)
  }

  const onCat = (id) => {
    setcategoryActive(id)
  }
  console.log('categoryActive', categoryActive)

  console.log(filteredData)

  // 加入購物車
  const handleAddCart = () => {
    toast.success('加入購物車')
  }

  return (
    <>
      <Header />
      <div className="relative mx-auto md:max-w-[800px]">
        {/* 電腦版選單 */}
        {/* 商品區域 */}
        <div className="flex justify-center px-5 pt-18 pb-15 md:px-3">
          <MarketSideNav onFilter={onFilter} onCat={onCat} categoryActive={categoryActive} />
          {/* 陣列長度判斷，若無顯示無商品 */}
          <div className="md:flex-5">
            {filteredData.length > 0 ? (
              filteredData.map((product) => {
                return (
                  <Card key={product.id} className={`mb-5 rounded-md border-0 p-3 py-4 text-white`}>
                    <div className="flex w-full gap-3">
                      <div className="flex flex-1">
                        <img
                          className="bg-background w-full rounded-md object-contain"
                          src={product.img_url[0].url}
                          alt={product.title}
                        />
                      </div>
                      <div className="flex flex-2 flex-col justify-between px-2">
                        <div>
                          <Badge variant="secondary" className="font-bold">
                            {product.category}
                          </Badge>
                          <p className="text-md mt-2 line-clamp-2 max-h-12 overflow-hidden font-bold overflow-ellipsis md:text-lg">
                            {product.title}
                          </p>
                          <p className="text-md mt-2 line-clamp-3 hidden max-h-18 overflow-hidden overflow-ellipsis text-gray-300 sm:block">
                            {product.description}
                          </p>
                        </div>
                        <div className="mt-3 flex justify-between">
                          <p className="text-2xl font-bold">
                            $<span className="pl-1">{product.price}</span>
                          </p>
                          <button
                            type="button"
                            className="btn cursor-pointer rounded px-1"
                            onClick={() => handleAddCart()}
                          >
                            <div className="flex items-center">
                              <IoCartOutline className="text-3xl" />
                              <p className="hidden pl-1 md:block">加入購物車</p>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })
            ) : (
              <div className="mt-5 flex w-full justify-center text-center">
                <p className="text-center text-2xl font-bold text-white">
                  該分類暫無商品
                  <br />
                  請選擇其他分類
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 手機版選單 */}
      <div className="fixed right-3 bottom-15 mb-2 text-end md:hidden">
        <Drawer open={open} onOpenChange={setOpen}>
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
              <button
                type="button"
                onClick={onFilter}
                className="w-20 rounded-full border bg-white p-2 md:h-20"
              >
                <p className="text-center text-sm font-bold text-black">全部</p>
              </button>
              <button
                type="button"
                onClick={onFilter}
                className="w-20 rounded-full border bg-white p-2 md:h-20"
              >
                <p className="text-center text-sm font-bold text-black">
                  HG
                  <br />
                  1/144
                </p>
              </button>
              <button
                type="button"
                onClick={onFilter}
                className="w-20 rounded-full border bg-white p-2 md:h-20"
              >
                <p className="text-center text-sm font-bold text-black">
                  RG
                  <br />
                  1/144
                </p>
              </button>
              <button
                type="button"
                onClick={onFilter}
                className="w-20 rounded-full border bg-white p-2 md:h-20"
              >
                <p className="text-center text-sm font-bold text-black">
                  MG
                  <br />
                  1/100
                </p>
              </button>
              <button
                type="button"
                onClick={onFilter}
                className="w-20 rounded-full border bg-white p-2 md:h-20"
              >
                <p className="text-center text-sm font-bold text-black">
                  PG
                  <br />
                  1/60
                </p>
              </button>
              <button
                type="button"
                onClick={onFilter}
                className="w-20 rounded-full border bg-white p-2 md:h-20"
              >
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
