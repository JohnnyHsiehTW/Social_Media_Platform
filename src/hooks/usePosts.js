import {
  apiAddLike,
  apiDeleteLike,
  apiGetComments,
  apiGetMyPosts,
  apiGetPosts,
} from '@/supabaseService/apiPosts'
import supabase from '@/supabaseService/supabaseClient'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

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
export function useUserLikedPosts(userId) {
  const [likedPostIds, setLikedPostIds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!userId) return

    setLoading(true)
    supabase
      .from('post_likes')
      .select('post_id')
      .eq('user_id', userId)
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
    } catch (error) {
      if (error instanceof Error) {
        toast.error('若要使用此功能，請先登入', {
          action: {
            label: '登入',
            onClick: () => navigate('/login'),
          },
        })
      } else {
        toast.error('發生未知錯誤，請稍後再試')
      }
    }
  }

  return { likedPostIds, loading, error, handleToggleLike }
}
