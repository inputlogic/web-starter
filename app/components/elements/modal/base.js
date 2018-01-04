import Portal from 'preact-portal'

export default ({className, dispatchCloseModal, children}) =>
  <Portal into='body'>
    <div
      class={'modal-container ' + className}
    >
      <div class='modal-content'>
        <div className='close' onClick={() => dispatchCloseModal()} >
          close
        </div>
        {children}
      </div>
    </div>
  </Portal>
