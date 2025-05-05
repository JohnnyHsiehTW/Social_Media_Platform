import { Card } from '@/components/ui/card'
import Header from './components/Header'
import Navbar from './components/Navbar'
import { IoMenuSharp } from 'react-icons/io5'
import { IoCartOutline } from 'react-icons/io5'
import product01 from '@/img/categories/HG/HG_Product_001/GQuuuuuux_001.jpg'

import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { VisuallyHidden } from 'radix-ui'
import { Badge } from '@/components/ui/badge'

function Market() {
  return (
    <>
      <Header />
      <div className="mx-auto px-3 pt-17 pb-15 md:max-w-1/2">
        <Card className="mb-5 border-0 p-3 py-4 text-white">
          <div className="flex w-full gap-3">
            <div className="flex w-1/2">
              <img className="w-full rounded-md object-contain" src={product01} alt="" />
            </div>
            <div className="flex w-full flex-col justify-between px-2">
              <div>
                <Badge variant="secondary" className="font-bold">
                  HG
                </Badge>
              </div>
              <div>
                <p className="text-md">HG 1/144 GQuuuuuux 組裝模型</p>
              </div>
              <div className="flex justify-end gap-3">
                <p className="text-2xl">
                  $<span>700</span>
                </p>
                <button type="button">
                  <IoCartOutline className="text-3xl" />
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="fixed right-3 bottom-15 mb-2 text-end">
        <Drawer>
          <DrawerTrigger className="rounded-full border bg-white p-2">
            <IoMenuSharp className="text-2xl" />
          </DrawerTrigger>
          <DrawerTitle>
            <VisuallyHidden.Root>分類</VisuallyHidden.Root>
          </DrawerTitle>
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
