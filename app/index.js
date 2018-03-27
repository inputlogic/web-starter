import wasmuth from 'wasmuth'

import Main from '/apps/main'
import PageNotification from '/components/elements/page-notification'
import Modals from '/components/modals'

import logger from '/util/logger'

window.W = wasmuth
window.log = logger

log.debug('@TODO: Please remove me.', true, 981923)

const MainApp = () =>
  <div className='main-app-container' >
    <PageNotification />
    <Main />
    <Modals />
  </div>

Preact.render(<MainApp />, document.body)
