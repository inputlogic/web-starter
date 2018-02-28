import {compose, setNodeName} from '/util/compose'
import render from './base'

export default compose(
  setNodeName('TextField'),
  {render}
)
