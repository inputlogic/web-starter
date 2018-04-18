import Header from '/project/elements/header'
import {App} from '/project/elements/app'
import {Router} from '/util/route'

import routes from './routes'

export const Guide = () =>
  <App routes={routes}>
    <Header />
    <div className='wrap'>
      <Router routes={routes} />
    </div>
  </App>

export default Guide
