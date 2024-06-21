import HomePage from '~/pages/HomePage'
import LoginPage from '~/pages/LoginPage'
import RegisterPage from '~/pages/RegisterPage'
import ProfilePage from '~/pages/ProfilePage'
import ProfileSettingPage from '~/pages/SettingPage/ProfileSettingPage'
import ChatPage from '~/pages/ChatPage/ChatPage'
import MyProductPage from '~/pages/MyProductPage/MyProductPage'
import ProductPage from '~/pages/ProductPage/ProductPage'
import CartPage from '~/pages/CartPage/CartPage'
import DefaultLayout from '~/layout/defaultLayout'
import ConfirmationPage from '~/pages/ConfirmationPage'

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
    path: '/confirmation',
    element: <ConfirmationPage />,
  },
  {
    path: '/profile/:username',
    element: <ProfilePage />,
  },
  {
    path: '/setting/profile',
    element: (
      <DefaultLayout>
        <ProfileSettingPage />
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
