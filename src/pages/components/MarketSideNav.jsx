import { useEffect, useState } from 'react'

function MarketSideNav({ onFilter, categoryActive, onCat }) {
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

  const categories = [
    { id: 1, title: '全部商品', img_url: '' },
    {
      id: 2,
      title: 'HG 1/144',
      img_url:
        'https://cmncvclhjzmwzdvowmih.supabase.co/storage/v1/object/public/products-img/categories/ICONS/ICON_HG.jpg',
    },
    {
      id: 3,
      title: 'RG 1/144',
      img_url:
        'https://cmncvclhjzmwzdvowmih.supabase.co/storage/v1/object/public/products-img/categories/ICONS/ICON_RG.jpg',
    },
    {
      id: 4,
      title: 'MG 1/100',
      img_url:
        'https://cmncvclhjzmwzdvowmih.supabase.co/storage/v1/object/public/products-img/categories/ICONS/ICON_MG.jpg',
    },
    {
      id: 5,
      title: 'PG 1/60',
      img_url:
        'https://cmncvclhjzmwzdvowmih.supabase.co/storage/v1/object/public/products-img/categories/ICONS/ICON_PG.jpg',
    },
    { id: 6, title: '其他', img_url: '' },
  ]

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
        {categories.map((item) => {
          return (
            <li key={item.id} className="flex items-center border-b-1 border-[#5f5f5f]">
              <button
                type="button"
                onClick={(e) => {
                  onFilter(e)
                  onCat(item.id)
                }}
                className={`${categoryActive === item.id ? 'bg-[#d1d1d1] text-black' : ''} mb-1 flex w-full cursor-pointer items-center rounded px-2 text-start transition hover:bg-[#7a7163]`}
              >
                {item.img_url ? (
                  <img className="h-full w-1/4 rounded" src={item.img_url} alt="HG" />
                ) : (
                  <div></div>
                )}
                <span className="pl-1">{item.title}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default MarketSideNav
