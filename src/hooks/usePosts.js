import {
  apiAddLike,
  apiDeleteLike,
  apiGetComments,
  apiGetMyPosts,
  apiGetPosts,
} from '@/supabaseService/apiPosts'
import supabase from '@/supabaseService/supabaseClient'
// import supabase from '@/supabaseService/supabaseClient'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

// 取得貼文
export function usePostsData() {
  const {
    data: posts = [],
    error: isError,
    isLoading,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: apiGetPosts,
  })

  return { posts, isLoading, isError }
}

// 取得我的貼文
export function useMyPostsData(userId) {
  const {
    data: myPosts = [],
    error: isError,
    isLoading,
  } = useQuery({
    queryKey: ['posts', userId],
    queryFn: () => apiGetMyPosts(userId),
    enabled: !!userId,
  })

  return { myPosts, isLoading, isError }
}

// 取得貼文留言
export function useCommentsData(postId) {
  const {
    data: comments = [],
    error: isError,
    isLoading,
  } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => apiGetComments(postId),
    enabled: !!postId,
  })

  return { comments, isLoading, isError }
}

// 貼文按讚
// 1.建立 posts-like 資料表，儲存每則貼文的按讚狀態
// 2.顯示貼文時取得 post likes 原始數量
// 3.if toggled state = ture
// 4.apiUpdateLikes 更新為 true
// 5.if toggled state = false
// 6.apiUpdateLikes 更新為 false
// 7.posts likes 欄位計算 posts-like 符合 post id 的資料筆數
export function useUserLikedPosts(userId) {
  const [likedPostIds, setLikedPostIds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!userId) return

    setLoading(true)
    supabase
      .from('post_likes') // 假設你的 table 名稱
      .select('post_id') // 只取 post_id 欄位
      .eq('user_id', userId) // 過濾這個使用者
      .then(({ data, error }) => {
        if (error) {
          setError(error.message)
        } else {
          setLikedPostIds(data.map((item) => item.post_id))
        }
      })
      .finally(() => setLoading(false))
  }, [userId])

  const handleToggleLike = async (postId) => {
    try {
      if (!likedPostIds.includes(postId)) {
        await apiAddLike(postId, userId)
        setLikedPostIds((ids) => [...ids, postId])
      } else {
        await apiDeleteLike(postId, userId)
        setLikedPostIds((ids) => ids.filter((id) => id !== postId))
      }
    } catch (err) {
      console.error('按讚失敗', err)
    }
  }

  return { likedPostIds, loading, error, handleToggleLike }
}
