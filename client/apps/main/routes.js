import Home from './pages/home'
import Users from './pages/users'
import Login from './pages/login'

export const routes = {
  home: {
    path: '/',
    component: Home
  },
  users: {
    path: '/users',
    component: Users,
    isAuthed: () => false
  },
  login: {
    path: '/login',
    component: Login
  }
}

export default routes
