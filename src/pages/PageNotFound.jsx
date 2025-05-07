import { Button } from '@/components/ui/button'
import { NavLink } from 'react-router'

function PageNotFound() {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 w-full -translate-1/2">
        <div className="flex flex-col items-center justify-center gap-3 text-white">
          <p className="text-8xl font-bold">404</p>
          <p className="text-3xl font-bold">糟糕！此頁面不存在</p>
          <p className="text-lg font-bold">你可能誤入了不明的宙域</p>
          <Button className="btn-basic border text-lg">
            <NavLink to="/">回首頁</NavLink>
          </Button>
        </div>
      </div>
    </>
  )
}

export default PageNotFound
