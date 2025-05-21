import Model_Logo_md from '@/img/Model_Logo_md.png'
import { useEffect, useState } from 'react'
import { IoCartOutline } from 'react-icons/io5'
import { Link } from 'react-router'

function Header() {
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY

      if (scrollY <= 0) {
        // 當滾動到最頂端，顯示 div
        setIsVisible(true)
      } else if (scrollY > lastScrollY && scrollY > 30) {
        // 當往下滾動超過 100px，隱藏 div
        setIsVisible(false)
      } else if (scrollY < lastScrollY && scrollY > 50) {
        // 當往上滾動超過 150px，顯示 div
        setIsVisible(true)
      }

      // 更新最後的滾動距離
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
      className={`fixed z-50 flex h-13 w-full items-center bg-[#434343]`}
      style={{
        transform: `translateY(${isVisible ? 0 : -100}px)`, // 滾動到 100px 後隱藏
        opacity: isVisible ? 1 : 0, // 控制顯示隱藏的透明度
        transition: 'transform 0.4s ease-in-out, opacity 0.3s ease-in-out', // 合併過渡屬性
      }}
    >
      <Link className="mx-auto" to="/">
        <img className="max-h-10" src={Model_Logo_md} alt="" />
      </Link>
      <Link to="/cart" className="fixed top-4 right-7">
        <div className="absolute -top-2 left-5 flex items-center justify-start rounded-md bg-white px-1 text-left">
          <p className="">99</p>
        </div>
        <IoCartOutline className="text-3xl text-white" />
      </Link>
    </div>
  )
}

export default Header
