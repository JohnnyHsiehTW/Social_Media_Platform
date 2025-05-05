import { Virtuoso } from 'react-virtuoso'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

const ITEM_HEIGHT = 28
const CONTAINER_HEIGHT = 350

function UserComment({ comments }) {
  // 只取出要顯示的留言
  const defaultVisibleCount = Math.floor(CONTAINER_HEIGHT / ITEM_HEIGHT)
  const [visibleCount, setVisibleCount] = useState(defaultVisibleCount)
  const virtuosoRef = useRef(null)
  const visibleComments = comments.slice(0, visibleCount)

  const scrollToTop = () => {
    if (virtuosoRef.current) {
      virtuosoRef.current.scrollToIndex({
        index: 0,
        align: 'start',
        behavior: 'smooth',
      })
    }
  }
  const prevLengthRef = useRef(comments.length)
  useEffect(() => {
    if (comments.length > prevLengthRef.current) {
      scrollToTop()
    }
    prevLengthRef.current = comments.length
  }, [comments])

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3)
  }

  const showLoadMore =
    comments.length * ITEM_HEIGHT > CONTAINER_HEIGHT && visibleCount < comments.length

  return (
    <div className="relative h-full w-full touch-pan-y overflow-auto overscroll-y-contain p-3">
      <Virtuoso
        ref={virtuosoRef}
        className="virt-scroll touch-pan-y overscroll-y-contain text-white"
        data={visibleComments}
        increaseViewportBy={30}
        itemContent={(index, comment) => {
          return (
            <div className="mb-4 flex items-center">
              <img
                src={comment?.users?.img_url}
                alt={comment?.users?.username}
                className="mr-2 h-7 w-7 rounded-full object-cover"
              />
              <span>{comment?.content}</span>
            </div>
          )
        }}
      />
      {showLoadMore && (
        <div className="absolute right-4 bottom-1 text-center text-white">
          <button
            type="button"
            onClick={handleLoadMore}
            className={comments.length < defaultVisibleCount ? 'hidden' : 'inline'}
          >
            顯示更多留言
          </button>
        </div>
      )}
    </div>
  )
}
export default UserComment
