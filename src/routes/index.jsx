import { createBrowserRouter } from 'react-router'
import App from '@/App.jsx'
import HomePage from '@/pages/HomePage.jsx'
import LoginPage from '@/pages/LoginPage.jsx'
import Market from '@/pages/Market'
import MemberInfo from '@/pages/MemberInfo'
import MyPosts from '@/pages/MyPosts'
import NewPost from '@/pages/NewPost'
import RegisterPage from '@/pages/RegisterPage'
import Cart from '@/pages/Cart'
import UserComment from '@/pages/components/UserComment'

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: HomePage },
      { path: 'login', Component: LoginPage },
      { path: 'register', Component: RegisterPage },
      { path: 'market', Component: Market },
      { path: 'memberInfo', Component: MemberInfo },
      { path: 'my-posts', Component: MyPosts },
      { path: 'new-post', Component: NewPost },
      { path: 'cart', Component: Cart },
      { path: 'comment', Component: UserComment },
    ],
  },
])

export default router
