import HomePage from '~/pages/HomePage'
import LoginPage from '~/pages/LoginPage/LoginPage'
import RegisterPage from '~/pages/RegisterPage'
import ProfilePage from '~/pages/ProfilePage'
import SettingPage from '~/pages/SettingPage'
import MessagePage from '~/pages/MessagePage'
import MyProductPage from '~/pages/MyProductPage'
import ProductPage from '~/pages/ProductPage'

const publicRoutes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/user/:username', component: ProfilePage },
  { path: '/setting', component: SettingPage },
  { path: '/message', component: MessagePage },
  { path: '/my-product', component: MyProductPage },
  { path: '/product/:prod_id', component: ProductPage },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
