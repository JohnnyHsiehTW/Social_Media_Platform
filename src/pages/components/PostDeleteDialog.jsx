import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

import { RiDeleteBin6Fill } from 'react-icons/ri'

function PostDeleteDialog({ postId, handleDelete }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <RiDeleteBin6Fill className="text-xl" />
      </AlertDialogTrigger>
      <AlertDialogContent className="text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-bold text-white">確定要刪除貼文嗎?</AlertDialogTitle>
          <AlertDialogDescription className="text-white">
            刪除貼文後將無法復原，請再次確認是否要刪除！
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="text-white">
          <AlertDialogCancel className="">取消</AlertDialogCancel>
          <Button
            className="btn-danger-trigger bg-danger mb-2 border"
            type="button"
            onClick={() => handleDelete(postId)}
          >
            確認刪除
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default PostDeleteDialog
