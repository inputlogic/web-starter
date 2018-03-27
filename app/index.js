import wasmuth from 'wasmuth'

import Main from '/apps/main'
import PageNotification from '/components/elements/page-notification'
import Modals from '/components/modals'

window.W = wasmuth

const MainApp = () =>
  <div className='main-app-container' >
    <PageNotification />
    <Main />
    <Modals />
  </div>

Preact.render(<MainApp />, document.body)
