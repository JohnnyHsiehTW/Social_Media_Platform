import { toast } from 'sonner'
import supabase from './supabaseClient'

// 取得貼文資料
export async function apiGetPosts() {
  try {
    let { data: posts, error } = await supabase
      .from('posts')
      .select(
        '*,users:users(id,username,img_url),comments:comments(id,created_at,content),post_likes:post_likes(post_id,user_id))'
      )
      .order('created_at', { ascending: false })
    if (error) throw error
    return posts
  } catch (error) {
    if (error instanceof Error) {
      toast.error('取得貼文失敗，請稍後再試')
    } else {
      toast.error('發生未知錯誤，請稍後再試')
    }
  }
}

// 取得我的貼文資料
export async function apiGetMyPosts(userId) {
  try {
    let { data: posts, error } = await supabase
      .from('posts')
      .select(
        '*,users:users(id,username,img_url),comments:comments(id,created_at,content,users:users(id,username,img_url))'
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return posts
  } catch (error) {
    if (error instanceof Error) {
      toast.error('取得貼文失敗，請稍後再試')
    } else {
      toast.error('發生未知錯誤，請稍後再試')
    }
  }
}

// 取得貼文留言資料
export async function apiGetComments(postId) {
  try {
    let { data: posts, error } = await supabase
      .from('comments')
      .select('*,users:users(*)')
      .eq('post_id', postId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return posts
  } catch (error) {
    if (error instanceof Error) {
      toast.error('取得留言失敗，請稍後再試')
    } else {
      toast.error('發生未知錯誤，請稍後再試')
    }
  }
}

// 新增留言
export async function apiAddComment() {
  try {
    await supabase
      .from('comments')
      .insert([{ content: 'text', post_id: 'postId', user_id: 'userId' }])
      .select()
  } catch (error) {
    if (error instanceof Error) {
      toast.error('新增留言失敗，請稍後再試')
    } else {
      toast.error('發生未知錯誤，請稍後再試')
    }
  }
}

// 取得按讚狀態

// 新增按讚
export async function apiAddLike(postId, userId) {
  await supabase
    .from('post_likes')
    .insert([{ post_id: postId, user_id: userId }])
    .select()
    .throwOnError()
}

// 取消按讚
export async function apiDeleteLike(postId, userId) {
  await supabase
    .from('post_likes')
    .delete()
    .eq('post_id', postId)
    .eq('user_id', userId)
    .select()
    .throwOnError()
}
