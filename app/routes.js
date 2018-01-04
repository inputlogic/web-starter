import Home from '/components/pages/home'
import Resource from '/components/pages/resource'
import Guide from '/components/pages/guide'

export const routes = {
  home: {
    path: '/',
    component: Home
  },
  guide: {
    path: '/guide',
    component: Guide
  },
  resource: {
    path: '/resource/:id',
    component: Resource,
    isAuthed: () => false
  },
  _notAuthed: {
    path: '/401',
    component: Home
  }
}

export default routes
