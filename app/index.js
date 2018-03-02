import wasmuth from 'wasmuth'

import PageNotification from '/components/elements/page-notification'
import Modals from '/components/modals'

import {Router} from '/util/route'

import routes from '/routes'

window.W = wasmuth

const Main = () =>
  <div className='wrap'>
    <PageNotification />
    <Router routes={routes} />
    <Modals />
  </div>

Preact.render(<Main />, document.body)
