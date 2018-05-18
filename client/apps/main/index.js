import Header from '/project/elements/header'
import {App} from '/project/elements/app'
import {Router} from '/util/route'

import routes from './routes'

export const Main = ({url}) =>
  <App routes={routes}>
    <Header />
    <div className='wrap'>
      <Router routes={routes} url={url} />
    </div>
  </App>

export default Main
