import { Card, CardContent } from '@/components/ui/card'
import Navbar from './components/Navbar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
import Model_Logo_md from '@/img/Model_Logo_md.png'

import { useForm } from 'react-hook-form'
import { useLogin } from '@/hooks/useAuth'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

import { AiFillEye } from 'react-icons/ai'
import { AiFillEyeInvisible } from 'react-icons/ai'

const loginSchema = z.object({
  email: z.string().trim().email({ message: '請輸入正確的信箱格式' }),
  password: z
    .string()
    .trim()
    .regex(/[a-z]/, '需包含至少一個小寫字母')
    .regex(/[0-9]/, '需包含至少一個數字')
    .min(6, { message: '密碼長度不得小於6個字元' })
    .max(20, { message: '密碼長度最多20個字元' }),
})

function LoginPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema), mode: 'onChange', reValidateMode: 'onBlur' })

  const { apiLoginHandler } = useLogin()

  const onSubmit = (data) => {
    apiLoginHandler(data)
    reset()
  }

  // 顯示輸入密碼
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
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
                    className="mb-1 bg-white text-black"
                    type="email"
                    placeholder="請輸入註冊信箱"
                    autoComplete="email"
                    required
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
                      className="mb-1 bg-white text-black"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="請輸入密碼"
                      autoComplete="current-password"
                      required
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
              </div>
              <Button type="submit" className="mb-5 text-base" variant="outline">
                登入
              </Button>
            </form>
            <Link to="/register" className="text-sm text-neutral-300">
              還沒有帳號嗎? 立即註冊
            </Link>
          </CardContent>
        </Card>
      </div>
      <Navbar />
    </>
  )
}

export default LoginPage
