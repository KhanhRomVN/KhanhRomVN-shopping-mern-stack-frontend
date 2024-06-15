import HomePage from '~/pages/HomePage'
import LoginPage from '~/pages/LoginPage/LoginPage'
import RegisterPage from '~/pages/RegisterPage'
import ProfilePage from '~/pages/ProfilePage'
import SettingPage from '~/pages/SettingPage'
import ChatPage from '~/pages/ChatPage'
import MyProductPage from '~/pages/MyProductPage/MyProductPage'
import ProductPage from '~/pages/ProductPage'
import CartPage from '~/pages/CartPage'

const publicRoutes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/profile/:username', component: ProfilePage },
  { path: '/setting', component: SettingPage },
  { path: '/chat', component: ChatPage },
  { path: '/my-product', component: MyProductPage },
  { path: '/product/:prod_id', component: ProductPage },
  { path: '/cart', component: CartPage },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
