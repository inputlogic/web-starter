import Header from '/components/elements/header'
import {App} from '/components/elements/app'
import {Router} from '/util/route'

import routes from './routes'

export const Main = () =>
  <App routes={routes}>
    <Header />
    <div className='wrap'>
      <Router routes={routes} />
    </div>
  </App>

export default Main
