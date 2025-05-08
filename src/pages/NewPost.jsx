import Navbar from '../pages/components/Navbar'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { IoImagesSharp } from 'react-icons/io5'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css/bundle'
import supabase from '@/supabaseService/supabaseClient'

import { v4 as uuidv4 } from 'uuid'
import { useGetUserId } from '@/hooks/useAuth'
import { Navigate, useNavigate } from 'react-router'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'

function NewPost() {
  const { register, handleSubmit } = useForm()
  // 取得 user id
  const { userId } = useGetUserId()

  // 產生 ImageId
  const generateImageId = () => {
    const id = uuidv4()
    return id
  }

  // 上傳圖片
  // 預覽上傳圖片
  const [images, setImages] = useState([])
  const [files, setFiles] = useState([])
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files) // 取得選擇的檔案
    const imageUrls = []
    selectedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        imageUrls.push(reader.result) // 把每個檔案的 Base64 URL 新增至陣列
        if (imageUrls.length === selectedFiles.length) {
          setImages(imageUrls) // 當所有檔案都讀取完畢，更新 state
          setFiles(selectedFiles) // 更新 files state，保存原始檔案
        }
      }
      reader.readAsDataURL(file) // 讀取檔案
    })
  }

  // 取得圖片url
  const getImageUrls = (res) => {
    const { data } = supabase.storage.from('posts-img').getPublicUrl(res?.path)
    console.log('getImageUrls', data)
    return data //publicUrl
  }

  // 上傳圖片
  async function apiUploadImage() {
    try {
      const uploadPromise = files.map((file) => {
        return supabase.storage.from('posts-img').upload(`${userId}/${generateImageId()}`, file, {
          cacheControl: '3600',
          upsert: false,
        })
      })
      const results = await Promise.all(uploadPromise)
      const urls = []
      for (const { data, error } of results) {
        if (error) {
          console.log('Error uploading file:', error)
        } else {
          console.log('File uploaded successfully:', data)
          const imgPath = getImageUrls(data)
          urls.push({ url: imgPath?.publicUrl })
        }
      }
      return urls
    } catch (error) {
      console.log(error)
    }
  }

  // 新增至post
  const navigate = useNavigate()
  async function apiAddPost({ text, img_urls }) {
    try {
      await supabase
        .from('posts')
        .insert([{ user_id: userId, content: text, img_urls: img_urls }])
        .select()
      navigate('/')
      toast.success('新增貼文成功')
    } catch (error) {
      if (error instanceof Error) {
        toast.error('新增貼文失敗，請稍後再試')
      } else {
        toast.error('發生未知錯誤，請稍後再試')
      }
    }
  }

  // 提交
  const onSubmit = async (data) => {
    const urls = await apiUploadImage()
    await apiAddPost({ text: data.text, img_urls: urls })
  }

  // 取消按鈕
  const handleCancel = () => {
    navigate('/')
    console.log('cancel new post')
  }

  return (
    <div className="flex h-screen flex-col">
      <main className="mx-auto flex w-full flex-col items-center justify-center p-5 pb-15 text-white md:max-w-[680px]">
        <h3 className="text-2xl font-bold">新增貼文</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="h-full w-full">
          <Textarea
            {...register('text')}
            className="my-5 w-full p-5 caret-white"
            placeholder="輸入貼文內容"
            required
          />
          {/* 預覽上傳圖片 */}
          <div className={`${images.length > 0 ? 'inline' : 'hidden'} text-center`}>
            <p className="text-xl font-bold">預覽圖片</p>
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={1}
              pagination={{ clickable: true }}
              centeredSlides={true}
              className="bg-background mb-3 h-[50vh] rounded-sm"
            >
              {images.map((img) => {
                return (
                  <SwiperSlide>
                    <div className="flex h-full items-center justify-center">
                      <img
                        src={img}
                        alt="Preview"
                        className="h-full max-h-[50vh] w-full object-contain md:max-h-[50vh]"
                      />
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>

          <Button type="button" className="mb-5 h-[80px] w-full border p-0">
            <Input
              onChange={handleImageChange}
              type="file"
              accept="image/*"
              id="uploadImg"
              multiple
              className="hidden"
            />
            <label
              htmlFor="uploadImg"
              className="flex h-full w-full flex-col items-center justify-center text-white"
            >
              <p className="font-bold">上傳圖片</p>
              <IoImagesSharp className="text-white" style={{ width: '30px', height: '30px' }} />
            </label>
          </Button>
          <div className="flex justify-center gap-3 pb-5">
            <AlertDialog>
              <AlertDialogTrigger type="button" className="btn-basic rounded-md border px-3">
                取消
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white">確定要取消這則貼文嗎?</AlertDialogTitle>
                  <AlertDialogDescription className="text-white">
                    取消後將會返回首頁，已輸入的內容將會消失！
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="btn-basic text-white">返回</AlertDialogCancel>
                  <AlertDialogAction
                    className="btn-danger-trigger border text-white"
                    onClick={handleCancel}
                  >
                    確定取消
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button type="submit" className="btn-basic border">
              立即發布
            </Button>
          </div>
        </form>
      </main>
      <Navbar />
    </div>
  )
}

export default NewPost
