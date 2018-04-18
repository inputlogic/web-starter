import withState from '/util/withState'
import Base from './base'

export const App = withState(
  ({route = {}}, {routes}) => ({name: route.name})
)(({routes, name, children}) => {
  if (!routes) {
    console.warn('App component expects routes prop')
  }
  return Base({
    isActive: Object.keys(routes).includes(name)
  })
})

export default App
