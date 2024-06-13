import HomePage from '~/pages/HomePage'
import LoginPage from '~/pages/LoginPage/LoginPage'
import RegisterPage from '~/pages/RegisterPage'
import ProfilePage from '~/pages/ProfilePage'
import SettingPage from '~/pages/SettingPage'
import MessagePage from '~/pages/MessagePage'
import MyProductPage from '~/pages/MyProductPage/MyProductPage'
import ProductPage from '~/pages/ProductPage'
import CartPage from '~/pages/CartPage'

const publicRoutes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/user/:username', component: ProfilePage },
  { path: '/setting', component: SettingPage },
  { path: '/message', component: MessagePage },
  { path: '/my-product', component: MyProductPage },
  { path: '/product/:prod_id', component: ProductPage },
  { path: '/cart', component: CartPage },
  { path: '/profile', component: ProfilePage },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
