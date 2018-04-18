import {set} from '/store'

export const openModal = (name) => set('modal', name)
export const closeModal = () => set('modal', null)
