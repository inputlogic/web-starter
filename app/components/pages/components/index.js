import {dispatch} from '/store'
import {openModal} from '/components/elements/modal/actions'
import BaseComponents from './base'

export default () => {
  return BaseComponents({
    openExampleModal: () => dispatch(openModal('Example'))
  })
}
