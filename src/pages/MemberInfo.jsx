import Navbar from '../pages/components/Navbar'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Header from './components/Header'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

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

import '@/styles/tabs.css'
import '@/styles/badge.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import supabase from '@/supabaseService/supabaseClient'
import { useMemberInfo } from '@/hooks/useMemberInfo'
import { useLogout } from '@/hooks/useAuth'
import { Skeleton } from '@/components/ui/skeleton'
import { useForm } from 'react-hook-form'
import { apiUpdateUser, apiUpdateUserImage } from '@/supabaseService/apiUsers'

import { v4 as uuidv4 } from 'uuid'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

const userSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: '至少輸入3個字元' })
    .max(20, { message: '最多20個字元' }),
  name: z
    .string()
    .trim()
    .min(2, { message: '至少輸入2個字元' })
    .max(20, { message: '最多20個字元' }),
  phone: z
    .string()
    .trim()
    .startsWith('0', { message: '請輸入台灣手機號碼格式，不須加-符號' })
    .length(10, { message: '請輸入台灣手機號碼格式，不須加-符號' }),
  address: z.string().trim().min(10, { message: '請輸入正確的地址' }),
})

function MemberInfo() {
  const [userData, setUserData] = useState({})
  const { userInfo, isLoading } = useMemberInfo()

  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUserData(userInfo)
        reset({
          email: userInfo?.email,
          username: userInfo?.username,
          name: userInfo?.name,
          phone: userInfo?.phone,
          address: userInfo?.address,
        })
      }
    })
    return () => {
      data.subscription.unsubscribe()
    }
  }, [userInfo])

  // 登出
  const navigate = useNavigate()
  const { apiLogoutHandler } = useLogout()
  const logoutHandler = () => {
    apiLogoutHandler()
    navigate('/')
  }

  // 更新使用者圖片
  // 上傳圖片
  async function apiUploadUserImage(file) {
    const userId = userData.id
    const generateImageId = () => {
      const id = uuidv4()
      return id
    }

    try {
      const extention = file.name.split('.').pop()
      const imageName = `${generateImageId()}.${extention}`
      const filePath = `${userId}/${imageName}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('users-avatar')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) throw uploadError
      const { data: urlData, error: urlError } = supabase.storage
        .from('users-avatar')
        .getPublicUrl(uploadData.path)

      if (urlError) throw urlError
      const publicUrl = urlData.publicUrl

      await apiUpdateUserImage(publicUrl, userId)
      return publicUrl
    } catch (error) {
      toast.error(error.message)
    }
  }
  const handleUpdateImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const newUrl = await apiUploadUserImage(file)
    if (newUrl) {
      setUserData((prev) => ({
        ...prev,
        img_url: newUrl,
      }))
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValue: {
      username: '',
      name: '',
      phone: '',
      address: '',
    },
  })

  const userId = userData?.id
  const onSubmit = async (data) => {
    try {
      await apiUpdateUser(data, userId)
      setIsEdit(false)
    } catch (error) {
      toast.error(error.message)
    }
  }

  // 取消編輯
  const handleCancelEdit = () => {
    setIsEdit(false)
    reset({
      email: userInfo?.email,
      username: userInfo?.username,
      name: userInfo?.name,
      phone: userInfo?.phone,
      address: userInfo?.address,
    })
  }

  return (
    <>
      <Header />
      <h1 className="mb-3 pt-15 text-center text-3xl font-bold text-white">會員中心</h1>
      <Tabs
        defaultValue="account"
        className="mx-auto w-full max-w-[680px] px-5 pb-15 md:py-3 md:pb-3"
      >
        <div className="bg-background w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger className="custom-tab-trigger" value="account">
              基本資料
            </TabsTrigger>
            <TabsTrigger className="custom-tab-trigger" value="tradeHistory">
              交易紀錄
            </TabsTrigger>
          </TabsList>
        </div>
        {/* 基本資料 */}
        {isLoading ? (
          <TabsContent value="account">
            <Card className="text-white">
              <CardHeader>
                <form className="flex-col text-center">
                  <Skeleton className="bg-background mx-auto h-35 w-35 rounded-full border-2 object-cover" />
                  <Button className="mx-auto mt-3">更換頭貼</Button>
                </form>
              </CardHeader>
              <form>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Skeleton className="bg-background h-[14px] w-[100px]" />
                    <Skeleton className="bg-background h-[36px] w-full" />
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="bg-background h-[14px] w-[100px]" />
                    <Skeleton className="bg-background h-[36px] w-full" />
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="bg-background h-[14px] w-[100px]" />
                    <Skeleton className="bg-background h-[36px] w-full" />
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="bg-background h-[14px] w-[100px]" />
                    <Skeleton className="bg-background h-[36px] w-full" />
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="bg-background h-[14px] w-[100px]" />
                    <Skeleton className="bg-background h-[36px] w-full" />
                  </div>
                </CardContent>
                <CardFooter className="mx-auto mt-4 flex justify-center">
                  <Button type="button">修改會員資料</Button>
                </CardFooter>
              </form>
            </Card>
            <div className="mx-auto my-2 text-center"></div>
          </TabsContent>
        ) : (
          <TabsContent value="account">
            <Card className="text-white">
              <CardHeader>
                <form className="flex-col text-center">
                  <img
                    className="mx-auto h-35 w-35 rounded-full border-2 object-cover"
                    src={userData?.img_url}
                    alt=""
                  />
                  <Button type="button" className="btn mx-auto mt-3">
                    <label htmlFor="imgUpdate">
                      <p>更換頭貼</p>
                    </label>
                    <input
                      id="imgUpdate"
                      className="hidden"
                      type="file"
                      accept="image/*"
                      onChange={handleUpdateImage}
                    />
                  </Button>
                </form>
              </CardHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="email">會員帳號</Label>
                    <Input id="email" {...register('email')} disabled />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">
                      會員暱稱{' '}
                      {errors.username && (
                        <span className="text-red-400">{errors.username.message}</span>
                      )}
                    </Label>
                    <Input
                      {...register('username')}
                      id="username"
                      placeholder="請輸入會員暱稱"
                      disabled={!isEdit}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="name">
                      會員姓名
                      {errors.name && <span className="text-red-400">{errors.name.message}</span>}
                    </Label>
                    <Input
                      {...register('name')}
                      id="name"
                      placeholder="請輸入姓名"
                      disabled={!isEdit}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="tel">
                      聯絡電話
                      {errors.phone && <span className="text-red-400">{errors.phone.message}</span>}
                    </Label>
                    <Input
                      {...register('phone')}
                      id="phone"
                      placeholder="請輸入聯絡電話"
                      disabled={!isEdit}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="address">
                      地址
                      {errors.address && (
                        <span className="text-red-400">{errors.address.message}</span>
                      )}
                    </Label>
                    <Input
                      {...register('address')}
                      id="address"
                      placeholder="請輸入地址"
                      disabled={!isEdit}
                    />
                  </div>
                </CardContent>
                <CardFooter className="mx-auto mt-4 flex justify-center">
                  {isEdit ? (
                    <div className="flex justify-center gap-3">
                      <Button className="btn" type="button" onClick={() => handleCancelEdit()}>
                        取消編輯
                      </Button>
                      <Button className="btn" type="submit">
                        確認修改
                      </Button>
                    </div>
                  ) : (
                    <Button className="btn" type="button" onClick={() => setIsEdit(true)}>
                      修改會員資料
                    </Button>
                  )}
                </CardFooter>
              </form>
            </Card>
            <div className="mx-auto my-2 text-center">
              <AlertDialog>
                <AlertDialogTrigger
                  type="button"
                  className="btn-danger-trigger text-md mt-3 rounded-sm px-3 py-1 text-white"
                >
                  登出帳號
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">確定要登出帳號嗎?</AlertDialogTitle>
                  </AlertDialogHeader>
                  <VisuallyHidden>
                    <AlertDialogDescription />
                  </VisuallyHidden>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="btn-logout text-white">取消</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={logoutHandler}
                      className="btn-danger-trigger border border-white"
                    >
                      登出
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </TabsContent>
        )}

        {/* 交易紀錄 */}
        <TabsContent value="tradeHistory" className="mb-7 w-full">
          <div className="bg-background mx-auto w-full pb-3">
            <Input
              className="w-full p-2 text-white caret-white"
              placeholder="輸入商品名稱搜尋訂單"
            />
          </div>
          <ScrollArea className="h-[620px] rounded-xl md:w-[640px]">
            <Card className="mb-5 text-white">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <p>
                      訂單編號：<span>202504061325001</span>
                    </p>
                    <p>
                      訂單時間：<span>2025-04-06 13:25:43</span>
                    </p>
                  </div>
                  <Badge className="badge max-h-6">已完成</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/2 max-w-1/2 text-white">品項</TableHead>
                      <TableHead className="text-white">數量</TableHead>
                      <TableHead className="text-white">售價</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">商品名稱_001</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>
                        $<span>500</span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <p className="text-end">
                  訂單金額 <span>$500</span>
                </p>
              </CardContent>
            </Card>
            <Card className="mb-5 text-white">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <p>
                      訂單編號：<span>202504061325001</span>
                    </p>
                    <p>
                      訂單時間：<span>2025-04-06 13:25:43</span>
                    </p>
                  </div>
                  <Badge className="badge max-h-6">已完成</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/2 max-w-1/2 text-white">品項</TableHead>
                      <TableHead className="text-white">數量</TableHead>
                      <TableHead className="text-white">售價</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">商品名稱_001</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>
                        $<span>500</span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <p className="text-end">
                  訂單金額 <span>$500</span>
                </p>
              </CardContent>
            </Card>
            <Card className="mb-5 text-white">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <p>
                      訂單編號：<span>202504061325001</span>
                    </p>
                    <p>
                      訂單時間：<span>2025-04-06 13:25:43</span>
                    </p>
                  </div>
                  <Badge className="badge max-h-6">已完成</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/2 max-w-1/2 text-white">品項</TableHead>
                      <TableHead className="text-white">數量</TableHead>
                      <TableHead className="text-white">售價</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">商品名稱_001</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>
                        $<span>500</span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <p className="text-end">
                  訂單金額 <span>$500</span>
                </p>
              </CardContent>
            </Card>
          </ScrollArea>
        </TabsContent>
      </Tabs>
      <Navbar />
    </>
  )
}

export default MemberInfo
