import Home from './pages/home'
import Users from './pages/users'

export const routes = {
  home: {
    path: '/',
    component: Home
  },
  users: {
    path: '/users',
    component: Users
  }
}

export default routes