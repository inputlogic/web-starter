import wasmuth from 'wasmuth'

import NotFound from '/project/pages/not-found'
import PageNotification from '/project/elements/page-notification'
import Modals from '/project/modals'

import Main from '/apps/main'
import Guide from '/apps/guide'

import logger from '/util/logger'

window.W = wasmuth
window.log = logger

const MainApp = () =>
  <div className='main-app-container' >
    <PageNotification />

    <Main />
    <Guide />

    <NotFound />
    <Modals />
  </div>

Preact.render(<MainApp />, document.body, document.body.children[0])
