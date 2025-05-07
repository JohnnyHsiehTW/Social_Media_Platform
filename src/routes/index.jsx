import { createHashRouter } from 'react-router'
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
import PageNotFound from '@/pages/PageNotFound'

const router = createHashRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'market', element: <Market /> },
      { path: 'memberInfo', element: <MemberInfo /> },
      { path: 'my-posts', element: <MyPosts /> },
      { path: 'new-post', element: <NewPost /> },
      { path: 'cart', element: <Cart /> },
      { path: 'comment', element: <UserComment /> },
      { path: '*', element: <PageNotFound /> },
    ],
  },
])

export default router
