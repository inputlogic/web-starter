import {getState, subscribe} from '/store'
import routes from '/routes'

import {Router, Route} from '/util/route'

import Header from '/components/elements/header'
import Home from '/components/pages/home'
import Resource from '/components/pages/resource'
import Components from '/components/pages/components'

subscribe(() => console.log('State', getState()))

const Main = () =>
  <div>
    <Header />
    <Router routes={routes}>
      <Route component={Home} name='home' />
      <Route component={Resource} name='resource' />
      <Route component={Components} name='components' />
    </Router>
  </div>

Preact.render(<Main />, document.body)
