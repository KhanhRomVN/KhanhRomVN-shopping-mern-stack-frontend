import HomePage from '~/pages/HomePage'
import LoginPage from '~/pages/LoginPage'
import RegisterPage from '~/pages/RegisterPage'
import ProfilePage from '~/pages/ProfilePage'
import SettingPage from '~/pages/SettingPage'
import ChatPage from '~/pages/ChatPage'
import MyProductPage from '~/pages/MyProductPage/MyProductPage'
import ProductPage from '~/pages/ProductPage'
import CartPage from '~/pages/CartPage'
import DefaultLayout from '~/layout/defaultLayout'

const publicRoutes = [
  {
    path: '/',
    element: (
      <DefaultLayout>
        <HomePage />
      </DefaultLayout>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/profile/:username',
    element: <ProfilePage />,
  },
  {
    path: '/setting',
    element: (
      <DefaultLayout>
        <SettingPage />
      </DefaultLayout>
    ),
  },
  {
    path: '/chat',
    element: <ChatPage />,
  },
  {
    path: '/my-product',
    element: (
      <DefaultLayout>
        <MyProductPage />
      </DefaultLayout>
    ),
  },
  {
    path: '/product/:prod_id',
    element: (
      <DefaultLayout>
        <ProductPage />
      </DefaultLayout>
    ),
  },
  {
    path: '/cart',
    element: (
      <DefaultLayout>
        <CartPage />
      </DefaultLayout>
    ),
  },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
