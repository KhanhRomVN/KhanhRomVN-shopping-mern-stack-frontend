//* Public Page
import HomePage from '~/pages/HomePage'

//* Auth Page
import RegisterPage from '~/pages/RegisterPage'
import UsernameGooglePage from '~/pages/UsernameGooglePage'
import LoginPage from '~/pages/LoginPage'

//* Shopping Page
import MyProductPage from '~/pages/MyProductPage/MyProductPage'
import ProductPage from '~/pages/ProductPage/ProductPage'
import CartPage from '~/pages/CartPage/CartPage'

//* Other Page
import ProfilePage from '~/pages/ProfilePage'
import ChatPage from '~/pages/ChatPage/ChatPage'
import FriendPage from '~/pages/FriendPage/FriendPage'

//* Setting Page
import AccountSecurityPage from '~/pages/SettingPage/AccountSecurityPage'
import PersonalInfoSettingPage from '~/pages/SettingPage/AccountSecurityPage'

//* Layout Component
import DefaultLayout from '~/layout/defaultLayout'
import SettingLayout from '~/layout/settingLayout'

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
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register/username/:sub',
    element: <UsernameGooglePage />,
  },
  {
    path: '/profile/:username',
    element: (
      <DefaultLayout>
        <ProfilePage />
      </DefaultLayout>
    ),
  },
  {
    path: '/friend',
    element: (
      <DefaultLayout>
        <FriendPage />
      </DefaultLayout>
    ),
  },
  {
    path: '/setting/account-security',
    element: (
      <DefaultLayout>
        <SettingLayout>
          <AccountSecurityPage />
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
