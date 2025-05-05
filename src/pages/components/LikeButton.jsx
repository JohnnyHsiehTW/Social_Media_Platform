import { IoIosHeartEmpty } from 'react-icons/io'
import { IoIosHeart } from 'react-icons/io'

function LikeButton({ isLiked, handleToggleLike }) {
  // 按讚功能

  return (
    <div className="flex items-center gap-2 py-2">
      <button type="button" onClick={handleToggleLike}>
        {isLiked ? <IoIosHeart className="text-2xl" /> : <IoIosHeartEmpty className="text-2xl" />}
      </button>
      <p></p>
    </div>
  )
}

export default LikeButton
