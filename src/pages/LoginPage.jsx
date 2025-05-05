import { Card, CardContent } from '@/components/ui/card'
import Navbar from './components/Navbar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
import Model_Logo_md from '@/img/Model_Logo_md.png'

import { useForm } from 'react-hook-form'
import { useLogin } from '@/hooks/useAuth'

function LoginPage() {
  const { register, handleSubmit, reset } = useForm()
  const { apiLoginHandler } = useLogin()

  const onSubmit = (data) => {
    apiLoginHandler(data)
    reset()
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
                // onChange={(e) => setEmail(e.target.value)}
                className="mb-5"
                type="email"
                placeholder="請輸入註冊信箱"
              />
              <Input
                {...register('password')}
                // onChange={(e) => setPassword(e.target.value)}
                className="mb-5"
                type="password"
                placeholder="請輸入密碼"
              />
              <Button type="submit" className="mb-5 text-base" variant="outline">
                登入
              </Button>
            </form>
            <Link to="/register">註冊</Link>
          </CardContent>
        </Card>
      </div>
      <Navbar />
    </>
  )
}

export default LoginPage
