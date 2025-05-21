import Navbar from '../pages/components/Navbar'

import { BiCommentDetail } from 'react-icons/bi'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

import Header from './components/Header'
import { usePostsData, useUserLikedPosts } from '@/hooks/usePosts'
import { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css/bundle'

import 'react-loading-skeleton/dist/skeleton.css'
import UserImage from './components/UserImage'
import CommentDialog from './components/CommentDialog'
import { Skeleton } from '@/components/ui/skeleton'
import LikeButton from './components/LikeButton'

import { useGetUserId } from '@/hooks/useAuth'

function HomePage() {
  const [postsData, setPostData] = useState([])
  const { posts, isLoading, isError } = usePostsData()
  const { userId } = useGetUserId()
  useEffect(() => {
    if (!isLoading && !isError && posts.length > 0) {
      setPostData(posts)
    }
  }, [posts, isLoading, isError])

  // 取得按讚狀態
  const { likedPostIds, handleToggleLike } = useUserLikedPosts(userId)

  // 取得裝置寬度
  const [showSwiperNav, setShowSwiperNav] = useState('')
  useEffect(() => {
    const updateWidth = () => {
      setShowSwiperNav(window.innerWidth >= 768)
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  return (
    <>
      <Header />
      {isLoading ? (
        <div className="mx-auto h-full p-5 pt-17 pb-[60px]">
          <Card className="bg-card container mx-auto mb-5 w-full border-0 text-white md:max-w-[680px]">
            <div className="mx-auto flex w-full flex-col justify-center space-y-3 px-5">
              <div className="space-y-2">
                <Skeleton className="bg-background h-4 w-1/3" />
                <Skeleton className="bg-background h-4 w-1/4" />
              </div>
              <Skeleton className="bg-background h-[400px] w-full rounded-xl px-5" />
            </div>
          </Card>
          <Card className="bg-card container mx-auto mb-5 w-full border-0 text-white md:max-w-[680px]">
            <div className="mx-auto flex w-full flex-col justify-center space-y-3 px-5">
              <div className="space-y-2">
                <Skeleton className="bg-background h-4 w-1/3" />
                <Skeleton className="bg-background h-4 w-1/4" />
              </div>
              <Skeleton className="bg-background h-[400px] w-full rounded-xl px-5" />
            </div>
          </Card>
        </div>
      ) : (
        <div className="mx-auto h-full p-5 pt-17 pb-[60px]">
          {postsData.map((post) => {
            const isLiked = likedPostIds.includes(post.id)
            const postContent = post.content.replace(/\\n/g, '\n')

            return (
              <Card
                key={post.id}
                className="bg-card container mx-auto mb-5 overflow-visible border-0 text-white md:max-w-[680px]"
              >
                <CardHeader>
                  <UserImage
                    imgUrl={post.users.img_url}
                    username={post.users.username}
                    createdAt={post.created_at}
                  />
                  <div className="preserved-text">{postContent}</div>
                </CardHeader>
                <CardContent>
                  <Swiper
                    modules={[Navigation, Pagination]}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    centeredSlides={true}
                    navigation={showSwiperNav}
                    className="bg-background relative rounded-sm select-none"
                  >
                    {post.img_urls.map((img) => {
                      return (
                        <SwiperSlide>
                          <div className="mx-auto flex h-100 w-full items-center justify-center">
                            <img
                              src={img.url}
                              alt=""
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>
                  <div className="mt-1 flex justify-between">
                    <div className="flex gap-3">
                      <LikeButton
                        isLiked={isLiked}
                        handleToggleLike={() => handleToggleLike(post.id, userId, isLiked)}
                      />
                      <div className="flex items-center gap-2 py-2">
                        <BiCommentDetail className="text-2xl" />
                        <div>
                          <CommentDialog postId={post.id} userId={post.user_id} />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
      <Navbar />
    </>
  )
}

export default HomePage
