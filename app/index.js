import {Router} from '/util/route'

import Header from '/components/elements/header'
import Modals from '/components/modals'

import routes from '/routes'

import {subscribe, getState} from '/store'

subscribe(() => console.log('state', getState()))

const Main = () =>
  <div>
    <Header />
    <Router routes={routes} />
    <Modals />
  </div>

Preact.render(<Main />, document.body)
