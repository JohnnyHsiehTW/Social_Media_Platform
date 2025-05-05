import Navbar from '../pages/components/Navbar'

import { IoIosHeartEmpty } from 'react-icons/io'
import { IoIosHeart } from 'react-icons/io'
import { BiCommentDetail } from 'react-icons/bi'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

import Header from './components/Header'
import { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css/bundle'

import { useDispatch, useSelector } from 'react-redux'
import { useGetUserId } from '@/hooks/useAuth'
import { useMyPostsData } from '@/hooks/usePosts'
import supabase from '@/supabaseService/supabaseClient'
import { useQueryClient } from '@tanstack/react-query'
import CommentDialog from './components/CommentDialog'
import UserImage from './components/UserImage'
import PostDeleteDialog from './components/PostDeleteDialog'
import { NavLink } from 'react-router'

function MyPosts() {
  // 取得 user id
  const { userId } = useGetUserId()

  // 取得貼文
  const [postsData, setPostData] = useState([])
  const { myPosts, isLoading, isError } = useMyPostsData(userId)

  // 按讚功能
  const dispatch = useDispatch()
  const likedPosts = useSelector((state) => state.posts)
  const handleLikeButton = (postId) => {
    dispatch(toggleLike({ postId }))
    // 補更新按讚數
    // 按讚id、更新按讚數量
  }

  useEffect(() => {
    if (!isLoading && !isError && myPosts.length > 0) {
      setPostData(myPosts)
    }
  }, [myPosts, isLoading, isError])

  // 刪除貼文
  const queryClient = useQueryClient()
  const handleDelete = async (postId) => {
    try {
      await supabase.from('posts').delete().eq('id', postId)
      await queryClient.invalidateQueries({ queryKey: ['posts', userId] })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Header />
      <div className="mx-auto h-full p-5 pt-17 pb-[60px]">
        <h3 className="mb-2 text-center text-xl font-bold text-white">我的貼文</h3>
        {postsData.length > 5 ? (
          postsData.map((post) => {
            const isLiked = likedPosts[post.id] || false
            const postContent = post.content.replace(/\\n/g, '\n')
            return (
              <Card
                key={post.id}
                className="bg-card container mx-auto mb-5 border-0 text-white md:max-w-[680px]"
              >
                <CardHeader>
                  <div className="flex justify-between">
                    <UserImage
                      imgUrl={post.users.img_url}
                      username={post.users.username}
                      createdAt={post.created_at}
                    />
                    <div className="flex-col">
                      <PostDeleteDialog postId={post.id} handleDelete={handleDelete} />
                      <div></div>
                    </div>
                  </div>

                  <div className="preserved-text">{postContent}</div>
                </CardHeader>
                <CardContent>
                  <Swiper
                    modules={[Navigation, Pagination]}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    centeredSlides={true}
                    className="bg-background rounded-sm"
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
                      <div className="flex items-center gap-2 py-2">
                        <button type="submit" onClick={() => handleLikeButton(post.id)}>
                          {isLiked ? (
                            <IoIosHeart className="text-2xl" />
                          ) : (
                            <IoIosHeartEmpty className="text-2xl" />
                          )}
                        </button>
                        <p>{post.likes}</p>
                      </div>
                      <div className="flex items-center gap-2 py-2">
                        <BiCommentDetail className="text-2xl" />
                        <CommentDialog postId={post.id} userId={post.user_id} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        ) : (
          <div className="space-y-1 text-center text-2xl text-white">
            <p>目前沒有內容可以顯示</p>
            <p>
              快去
              <NavLink to="/new-post">
                <button className="btn-post mx-2 rounded px-2 text-2xl font-bold">新增貼文</button>
              </NavLink>
              吧！
            </p>
          </div>
        )}
      </div>
      <Navbar />
    </>
  )
}

export default MyPosts
