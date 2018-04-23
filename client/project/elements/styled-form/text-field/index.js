import {compose, setNodeName} from '/util/compose'
import render from './base'

export const TextField = compose(
  setNodeName('TextField'),
  {render}
)

export default TextField
