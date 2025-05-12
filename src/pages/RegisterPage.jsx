import Model_Logo_md from '@/img/Model_Logo_md.png'
import { Card, CardContent } from '@/components/ui/card'
import Navbar from './components/Navbar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
import { useRegister } from '@/hooks/useAuth'
import { useForm } from 'react-hook-form'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

import { AiFillEye } from 'react-icons/ai'
import { AiFillEyeInvisible } from 'react-icons/ai'

// 註冊欄位驗證
const passwordSchema = z
  .string()
  .trim()
  .min(6, { message: '密碼長度不得小於6個字元' })
  .max(20, { message: '密碼長度最多20個字元' })
  .regex(/[a-z]/, '需包含至少一個小寫字母')
  .regex(/[0-9]/, '需包含至少一個數字')
const userSchema = z
  .object({
    email: z.string().trim().email({ message: '請輸入正確的信箱格式' }),
    password: passwordSchema,
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '密碼與確認密碼不一致',
    path: ['passwordConfirm'],
  })

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
    reValidateMode: 'onBlur',
  })

  const { apiSignup } = useRegister()

  const onSubmit = (data) => {
    const userAvatarDefault =
      'https://cmncvclhjzmwzdvowmih.supabase.co/storage/v1/object/sign/users-avatar/Avatar_default.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1c2Vycy1hdmF0YXIvQXZhdGFyX2RlZmF1bHQucG5nIiwiaWF0IjoxNzQ2MDkwNjMzLCJleHAiOjE3Nzc2MjY2MzN9.L_wYMe-kR2rc__a3WgPuBaNg-kEeHaTxlpwZ5w_KLNc'
    apiSignup({
      email: data.email,
      password: data.password,
      userData: { email: data.email, username: '新人駕駛員', img_url: userAvatarDefault },
    })
  }

  // 顯示輸入密碼
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const handleShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm)
  }

  return (
    <>
      <div className="mx-auto flex h-full flex-col items-center justify-center p-5 pb-[60px]">
        <img className="max-w-80 p-10" src={Model_Logo_md} alt="Model_Logo_md" />
        <Card className="bg-card container mx-auto mb-5 border-0 text-white md:max-w-[400px]">
          <CardContent className="flex flex-col text-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-7">
                <div className="mb-4">
                  <Label htmlFor="email" className="text-md pb-2">
                    信箱
                    {errors.email && (
                      <span className="px-3 text-sm text-red-400">{errors.email.message}</span>
                    )}
                  </Label>
                  <Input
                    {...register('email')}
                    id="email"
                    type="email"
                    placeholder="請輸入註冊信箱"
                    className="mb-1 bg-white text-black"
                    autoComplete="email"
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="password" className="text-md pb-2">
                    密碼
                    {errors.password && (
                      <p className="px-3 text-start text-sm text-red-400">
                        {errors.password.message}
                      </p>
                    )}
                  </Label>
                  <div className="relative">
                    <Input
                      {...register('password')}
                      id="password"
                      className="mb-1 bg-white text-black"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="請輸入密碼"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={handleShowPassword}
                      className="absolute top-1/2 right-2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <AiFillEyeInvisible className="text-background text-xl" />
                      ) : (
                        <AiFillEye className="text-background text-xl" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  <Label htmlFor="password-confirm" className="text-md pb-2">
                    確認密碼
                    {errors.passwordConfirm && (
                      <p className="px-3 text-start text-sm text-red-400">
                        {errors.passwordConfirm.message}
                      </p>
                    )}
                  </Label>
                  <div className="relative">
                    <Input
                      {...register('passwordConfirm')}
                      id="password-confirm"
                      className="mb-1 bg-white text-black"
                      type={showPasswordConfirm ? 'text' : 'password'}
                      placeholder="再次輸入密碼"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={handleShowPasswordConfirm}
                      className="absolute top-1/2 right-2 -translate-y-1/2"
                    >
                      {showPasswordConfirm ? (
                        <AiFillEyeInvisible className="text-background text-xl" />
                      ) : (
                        <AiFillEye className="text-background text-xl" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <Button className="mb-5 text-base" variant="outline">
                註冊
              </Button>
            </form>
            <div>
              <Link
                to="/login"
                className="rounded p-0.5 text-sm text-neutral-300 hover:bg-[#7a7163]"
              >
                已經有帳號了嗎? 前往登入
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <Navbar />
    </>
  )
}

export default RegisterPage
