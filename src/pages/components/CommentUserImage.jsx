function CommentUserImage({ imgUrl }) {
  return (
    <div className="mb-1 flex items-center">
      <img src={imgUrl} alt="" className="mr-2 h-7 w-7 rounded-full object-cover" />
    </div>
  )
}

export default CommentUserImage
