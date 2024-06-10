import HomePage from '~/pages/HomePage'
import LoginPage from '~/pages/LoginPage'
import RegisterPage from '~/pages/RegisterPage'
import ProfilePage from '~/pages/ProfilePage'
import SettingPage from '~/pages/SettingPage'

const publicRoutes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/user/:username', component: ProfilePage },
  { path: '/setting', component: SettingPage },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
