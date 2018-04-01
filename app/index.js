import wasmuth from 'wasmuth'

import NotFound from '/components/pages/not-found'
import Main from '/apps/main'
import PageNotification from '/components/elements/page-notification'
import Modals from '/components/modals'

window.W = wasmuth

const MainApp = () =>
  <div className='main-app-container' >
    <PageNotification />
    <Main />
    <NotFound />
    <Modals />
  </div>

Preact.render(<MainApp />, document.body)
