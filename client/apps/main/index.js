import Header from '/project/elements/header'
import {App} from '/project/elements/app'
import {Router} from '/util/route'

import allRoutes from '/routes'

export const Main = () =>
  <App routes={allRoutes}>
    <Header />
    <div className='wrap'>
      <Router routes={allRoutes} />
    </div>
  </App>

export default Main
