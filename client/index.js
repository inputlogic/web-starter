import wasmuth from 'wasmuth'

import NotFound from '/project/pages/not-found'
import PageNotification from '/project/elements/page-notification'
import AdminHeader from '/project/elements/admin-header'
import Modals from '/project/modals'

import Main from '/apps/main'
import Guide from '/apps/guide'

import logger from '/util/logger'

if (typeof window !== 'undefined') {
  window.W = wasmuth
  window.log = logger
}

export const MainApp = (props) =>
  <div className='main-app-container' >
    <PageNotification />
    <AdminHeader />

    <Main {...props} />
    <Guide {...props} />

    <NotFound />
    <Modals />
  </div>

if (typeof window !== 'undefined') {
  Preact.render(<MainApp />, document.body, document.body.children[0])
}
