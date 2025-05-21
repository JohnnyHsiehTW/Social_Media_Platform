import { NavLink } from 'react-router'
import { IoHome } from 'react-icons/io5'
import { FaShop } from 'react-icons/fa6'
import { IoPersonCircle } from 'react-icons/io5'
import { FaFileAlt } from 'react-icons/fa'
import { MdAddToPhotos } from 'react-icons/md'

function Navbar() {
  return (
    <div className="fixed bottom-0 z-20 flex w-full justify-center bg-[#434343] p-3 text-white">
      <div className="container mx-auto flex items-center justify-center text-center">
        <div className="flex w-20 items-center justify-center">
          <NavLink to="/">
            {({ isActive }) => (
              <div className="flex items-center justify-center">
                <IoHome
                  className={`self-center text-2xl hover:text-[#FFE5AD] ${isActive ? 'text-[#FFE5AD]' : 'text-[#948979]'}`}
                />
              </div>
            )}
            {/* <div>首頁</div> */}
          </NavLink>
        </div>
        <div className="flex w-20 items-center justify-center">
          <NavLink to="/market">
            {({ isActive }) => (
              <div className="flex items-center justify-center">
                <FaShop
                  className={`self-center text-2xl hover:text-[#FFE5AD] ${isActive ? 'text-[#FFE5AD]' : 'text-[#948979]'}`}
                />
              </div>
            )}
            {/* <div>交易市集</div> */}
          </NavLink>
        </div>
        <div className="flex w-20 items-center justify-center">
          <NavLink to="/memberInfo">
            {({ isActive }) => (
              <div className="flex items-center justify-center">
                <IoPersonCircle
                  className={`self-center text-3xl hover:text-[#FFE5AD] ${isActive ? 'text-[#FFE5AD]' : 'text-[#948979]'}`}
                />
              </div>
            )}
            {/* <div>會員中心</div> */}
          </NavLink>
        </div>
        <div className="flex w-20 items-center justify-center">
          <NavLink to="/my-posts">
            {({ isActive }) => (
              <div className="flex items-center justify-center">
                <FaFileAlt
                  className={`self-center text-2xl hover:text-[#FFE5AD] ${isActive ? 'text-[#FFE5AD]' : 'text-[#948979]'}`}
                />
              </div>
            )}
            {/* <div>我的貼文</div> */}
          </NavLink>
        </div>
        <div className="flex w-20 items-center justify-center">
          <NavLink to="/new-post">
            {({ isActive }) => (
              <div className="flex items-center justify-center">
                <MdAddToPhotos
                  className={`self-center text-2xl hover:text-[#FFE5AD] ${isActive ? 'text-[#FFE5AD]' : 'text-[#948979]'}`}
                />
              </div>
            )}
            {/* <div>新增貼文</div> */}
          </NavLink>
        </div>

        {/* <NavLink to="/market">交易市集</NavLink>
        <NavLink to="/memberInfo">會員中心</NavLink>
        <NavLink to="/my-posts">我的貼文</NavLink>
        <NavLink to="/new-post">新增貼文</NavLink> */}
      </div>
    </div>
  )
}

export default Navbar
