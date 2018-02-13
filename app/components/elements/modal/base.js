import Portal from 'preact-portal'

export default ({className, dispatchCloseModal, handleModalContainerClick, children}) =>
  <Portal into='body'>
    <div
      class={'modal-container ' + className}
      onClick={ev => handleModalContainerClick(ev)}
    >
      <div class='modal-content'>
        <div className='close' onClick={() => dispatchCloseModal()} >
          close
        </div>
        {children}
      </div>
    </div>
  </Portal>
