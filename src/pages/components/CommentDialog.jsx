import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import UserComment from './UserComment'

import { IoMdClose } from 'react-icons/io'
import { IoMdSend } from 'react-icons/io'

import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import supabase from '@/supabaseService/supabaseClient'
import { useGetUserId } from '@/hooks/useAuth'
import { useCommentsData } from '@/hooks/usePosts'
import { toast } from 'sonner'

function CommentDialog({ postId }) {
  const { userId } = useGetUserId()

  const { register, handleSubmit, reset } = useForm()

  const [open, setOpen] = useState(false)

  // 新增留言
  const { comments } = useCommentsData(postId)
  const [commentsData, setCommentsData] = useState([])

  useEffect(() => {
    if (comments.length > 0 && commentsData.length === 0) {
      setCommentsData(comments)
    }
  }, [comments, commentsData])

  async function apiAddComment(newComment) {
    try {
      const { data: inserted, error } = await supabase
        .from('comments')
        .insert([newComment])
        .select('*, users(*)')
      if (inserted && inserted.length > 0) {
        setCommentsData((prev) => [...inserted, ...prev])
      }
      if (error) {
        toast.error('留言失敗，請確認是否已登入')
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error('留言失敗，請稍後再試')
      } else {
        toast.error('發生不明錯誤，請稍後再試')
      }
    }
  }

  const onSubmit = (data) => {
    const newComment = {
      content: data.comment,
      post_id: postId,
      user_id: userId,
    }
    apiAddComment(newComment)
    reset()
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {/* Dialog 開關 */}
      <AlertDialogTrigger className="rounded px-1 hover:bg-[#7a7163]">
        查看 {commentsData.length} 則留言
      </AlertDialogTrigger>

      <AlertDialogContent className="flex h-[60vh] w-full flex-col">
        {/* 標題 */}
        <div className="flex justify-center">
          <h4 className="mb-2 text-xl font-bold text-white">留言區</h4>
          <div className="absolute top-5 right-3">
            <AlertDialogCancel className="border-0 text-white">
              <IoMdClose className="text-2xl" style={{ height: '20px', width: '20px' }} />
            </AlertDialogCancel>
          </div>
        </div>
        <VisuallyHidden>
          <AlertDialogTitle />
          <AlertDialogDescription />
        </VisuallyHidden>

        {/* 滾動區 */}
        <div className="min-h-0 flex-1 overflow-hidden">
          <UserComment comments={commentsData} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative w-full">
            <Input
              {...register('comment')}
              type="text"
              className="w-full pr-10 text-white"
              placeholder="留下評論吧!!!"
              required
            ></Input>
            <button className="absolute top-1/2 right-1 -translate-y-1/2 px-2" type="submit">
              <IoMdSend className="text-xl text-white" />
            </button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CommentDialog
