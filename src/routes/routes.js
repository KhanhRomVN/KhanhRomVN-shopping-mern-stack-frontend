import HomePage from '~/pages/HomePage'
import LoginPage from '~/pages/LoginPage'
import RegisterPage from '~/pages/RegisterPage'
import ProfilePage from '~/pages/ProfilePage'
import SettingPage from '~/pages/SettingPage'
import MessagePage from '~/pages/MessagePage'

const publicRoutes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/user/:username', component: ProfilePage },
  { path: '/setting', component: SettingPage },
  { path: '/message', component: MessagePage },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
