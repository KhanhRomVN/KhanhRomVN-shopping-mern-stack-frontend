import HomePage from '~/pages/HomePage'
import LoginPage from '~/pages/LoginPage'
import RegisterPage from '~/pages/RegisterPage/RegisterPage'
import ProfilePage from '~/pages/ProfilePage'
import PersonalInfoSettingPage from '~/pages/SettingPage/PersonalInfoSettingPage'
import ChatPage from '~/pages/ChatPage/ChatPage'
import MyProductPage from '~/pages/MyProductPage/MyProductPage'
import ProductPage from '~/pages/ProductPage/ProductPage'
import CartPage from '~/pages/CartPage/CartPage'
import DefaultLayout from '~/layout/defaultLayout'
import EmailPage from '~/pages/RegisterPage/EmailPage'
import SettingLayout from '~/layout/settingLayout'
import ProfileSettingPage from '~/pages/SettingPage/ProfileSettingPage'

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
    path: '/register/:email',
    element: <RegisterPage />,
  },
  {
    path: '/register/email',
    element: <EmailPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/profile/:username',
    element: <ProfilePage />,
  },
  {
    path: '/setting/personal-info',
    element: (
      <DefaultLayout>
        <SettingLayout>
          <PersonalInfoSettingPage />
        </SettingLayout>
      </DefaultLayout>
    ),
  },
  {
    path: '/setting/profile',
    element: (
      <DefaultLayout>
        <SettingLayout>
          <ProfileSettingPage />
        </SettingLayout>
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
