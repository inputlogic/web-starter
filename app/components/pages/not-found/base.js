import Match from 'preact-router/match'
import Router from 'preact-router'

export const NotFound = ({didMatchRoute}) =>
  <div>
    <Match path='/'>
      {() => didMatchRoute !== window.location.href && <div>Not Found</div>}
    </Match>
    <Router><div default /></Router>
  </div>

export default NotFound
