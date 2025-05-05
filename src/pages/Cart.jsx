import { Button } from '@/components/ui/button'
import Header from './components/Header'
import Navbar from './components/Navbar'
import '@/styles/table.css'

import { FaAngleUp } from 'react-icons/fa'
import { FaAngleDown } from 'react-icons/fa'
import { FaCashRegister } from 'react-icons/fa6'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

function Cart() {
  return (
    <>
      <Header />
      <div className="mx-auto p-3 pt-17 md:max-w-1/2">
        <div className="mb-3 flex justify-end">
          <Button className="bg-white text-black">清空購物車</Button>
        </div>
        <div className="text-white">
          <Table>
            <TableHeader>
              <TableRow className="text-lg">
                <TableHead className="max-w-[200px] font-bold text-white">品項</TableHead>
                <TableHead className="max-w-[30px] text-center text-white">數量</TableHead>
                <TableHead className="max-w-[50px] text-right text-white">單價</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="max-w-[200px]">
                  <p className="truncate">HG 1/144 GQuuuuuux 組裝模型HG 1/144 GQuuuuuux 組裝模型</p>
                </TableCell>
                <TableCell className="flex items-center justify-center gap-1 text-center">
                  <p>1</p>
                  <div className="flex flex-col">
                    <button>
                      <FaAngleUp />
                    </button>
                    <button>
                      <FaAngleDown />
                    </button>
                  </div>
                </TableCell>
                <TableCell className="text-right">$700</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="max-w-[200px]">
                  <p className="truncate">HG 1/144 GQuuuuuux 組裝模型HG 1/144 GQuuuuuux 組裝模型</p>
                </TableCell>
                <TableCell className="flex items-center justify-center gap-1 text-center">
                  <p>1</p>
                  <div className="flex flex-col">
                    <button>
                      <FaAngleUp />
                    </button>
                    <button>
                      <FaAngleDown />
                    </button>
                  </div>
                </TableCell>
                <TableCell className="text-right">$700</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-5">
            <p className="text-right text-lg">
              合計金額<span className="pl-5">$1400</span>
            </p>
          </div>
          <div className="fixed right-3 bottom-0 pb-17">
            <Button className="bg-white text-black">
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
