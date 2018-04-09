import wasmuth from 'wasmuth'

import PageNotification from '/components/elements/page-notification'
import Modals from '/components/modals'

import {Router} from '/util/route'
import logger from '/util/logger'

import routes from '/routes'

window.W = wasmuth
window.log = logger

log.debug('@TODO: Please remove me.', true, 981923)

const Main = () =>
  <div className='wrap'>
    <PageNotification />
    <Router routes={routes} />
    <Modals />
  </div>

Preact.render(<Main />, document.body)
