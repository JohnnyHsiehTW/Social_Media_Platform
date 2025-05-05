import Model_Logo_md from '@/img/Model_Logo_md.png'
import { Card, CardContent } from '@/components/ui/card'
import Navbar from './components/Navbar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
import { useRegister } from '@/hooks/useAuth'
import { useForm } from 'react-hook-form'

function RegisterPage() {
  const { register, handleSubmit } = useForm()
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

  return (
    <>
      <div className="mx-auto flex h-full flex-col items-center justify-center p-5 pb-[60px]">
        <img className="max-w-80 p-10" src={Model_Logo_md} alt="" />
        <Card className="bg-card container mx-auto mb-5 border-0 text-white md:max-w-1/2">
          <CardContent className="flex flex-col text-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                {...register('email')}
                className="mb-5"
                type="email"
                placeholder="請輸入註冊信箱"
              />
              <Input
                {...register('password')}
                className="mb-5"
                type="password"
                placeholder="請輸入密碼"
              />
              {/* <Input {...register('checkPassword')} className="mb-5" type="password" placeholder="再次輸入密碼" /> */}
              <Button className="mb-5 text-base" variant="outline">
                註冊
              </Button>
            </form>
            <Link to="/login">登入</Link>
          </CardContent>
        </Card>
      </div>
      <Navbar />
    </>
  )
}

export default RegisterPage
