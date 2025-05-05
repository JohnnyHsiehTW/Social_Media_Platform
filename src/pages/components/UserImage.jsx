import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

function UserImage({ imgUrl, username, createdAt }) {
  dayjs.extend(utc)
  dayjs.extend(timezone)

  const timestamp = createdAt
  const taiwanTime = dayjs(timestamp).utc().tz('Asia/Taipei')
  const formattedTime = taiwanTime.format('YYYY-MM-DD HH:mm')

  return (
    <div className="mb-1">
      <div className="mb-1 flex items-center">
        <img src={imgUrl} alt="" className="mr-2 h-7 w-7 rounded-full object-cover" />
        <p>{username}</p>
      </div>
      <p className="text-sm text-zinc-400">{formattedTime}</p>
    </div>
  )
}

export default UserImage
