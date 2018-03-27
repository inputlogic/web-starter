import {App} from '/components/elements/app'
import {Router} from '/util/route'

import routes from './routes'

export const Main = () =>
  <App routes={routes}>
    <div className='wrap'>
      <Router routes={routes} />
    </div>
  </App>

export default Main
