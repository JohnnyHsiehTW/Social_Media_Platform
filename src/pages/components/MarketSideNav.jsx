import { useEffect, useState } from 'react'

function MarketSideNav() {
  const [lastScrollY, setLastScrollY] = useState(0)
  const [translateDist, setTranslateDist] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (scrollY <= 0) {
        setTranslateDist(0)
      } else if (scrollY > 50) {
        setTranslateDist(-60)
      }
      setLastScrollY(scrollY)
    }
    // 綁定滾動事件
    window.addEventListener('scroll', handleScroll)

    // 清除事件監聽器
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  return (
    <div
      className="sticky top-15 hidden h-1/2 p-5 md:inline md:flex-1"
      style={{
        transform: `translateY(${translateDist}px)`,
        transition: 'transform 0.4s ease',
      }}
    >
      <p className="mb-3 pl-1 text-xl font-bold text-white">商品分類</p>
      <ul className="space-y-3 text-white">
        <li className="flex items-center border-b-1">
          <button className="mb-1 flex w-full cursor-pointer items-center rounded px-2 text-start hover:bg-[#7a7163]">
            <img
              className="h-full w-1/4 rounded"
              src="https://cmncvclhjzmwzdvowmih.supabase.co/storage/v1/object/public/products-img/categories/ICONS/ICON_HG.jpg"
              alt="HG"
            />
            <span className="pl-1">HG 1/144</span>
          </button>
        </li>
        <li className="flex items-center border-b-1">
          <button className="mb-1 flex w-full cursor-pointer items-center rounded px-2 text-start hover:bg-[#7a7163]">
            <img
              className="h-full w-1/4 rounded"
              src="https://cmncvclhjzmwzdvowmih.supabase.co/storage/v1/object/public/products-img/categories/ICONS/ICON_RG.jpg"
              alt="RG"
            />
            <span className="pl-1">RG 1/144</span>
          </button>
        </li>
        <li className="flex items-center border-b-1">
          <button className="mb-1 flex w-full cursor-pointer items-center rounded px-2 text-start hover:bg-[#7a7163]">
            <img
              className="h-full w-1/4 rounded"
              src="https://cmncvclhjzmwzdvowmih.supabase.co/storage/v1/object/public/products-img/categories/ICONS/ICON_MG.jpg"
              alt="MG"
            />
            <span className="pl-1">MG 1/144</span>
          </button>
        </li>
        <li className="flex items-center border-b-1">
          <button className="mb-1 flex w-full cursor-pointer items-center rounded px-2 text-start hover:bg-[#7a7163]">
            <img
              className="h-full w-1/4 rounded"
              src="https://cmncvclhjzmwzdvowmih.supabase.co/storage/v1/object/public/products-img/categories/ICONS/ICON_PG.jpg"
              alt="PG"
            />
            <span className="pl-1">PG 1/144</span>
          </button>
        </li>
        <li className="border-b-1">
          <button className="mb-1 w-full cursor-pointer rounded px-2 text-start hover:bg-[#7a7163]">
            其他 Others
          </button>
        </li>
      </ul>
    </div>
  )
}

export default MarketSideNav
