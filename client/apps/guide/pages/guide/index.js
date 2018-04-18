import {dispatch} from '/store'
import {openModal} from '/project/elements/modal/actions'
import BaseComponents from './base'

export default () =>
  BaseComponents({
    openExampleModal: () => dispatch(openModal('Example'))
  })
