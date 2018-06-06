import Home from './pages/home'
import Users from './pages/users'
import User from './pages/user'
import Login from './pages/login'

export const routes = {
  home: {
    path: '/',
    component: Home
  },
  users: {
    path: '/users',
    component: Users
  },
  user: {
    path: '/users/:id',
    component: User
  },
  login: {
    path: '/login',
    component: Login
  }
}

export default routes
