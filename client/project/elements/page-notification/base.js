const PageNotification = ({message, type, isOpen, didClickClose}) =>
  <div className={`notification-bar ${type} ${isOpen ? 'open' : 'close'}`}>
    <span className='text'>
      {message}
    </span>
    <div className='close-icon' onClick={didClickClose} />
  </div>

export default PageNotification
