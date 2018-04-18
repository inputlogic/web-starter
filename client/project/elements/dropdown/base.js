import {DownArrow} from '/project/elements/arrow'
import Level from '/project/elements/level'

function BaseDropdown ({
  isOpen,
  handleClick,
  Trigger,
  buttonText = 'Select',
  noWrapper = false,
  children
}) {
  const cls = isOpen
    ? 'dropdown-menu open'
    : isOpen === false
      ? 'dropdown-menu close'
      : 'dropdown-menu'
  return <div>
    {Trigger === undefined
      ? <button className='btn btn-dropdown black-ghost-btn' onClick={handleClick}>
        <Level noPadding>{buttonText} <DownArrow /></Level>
      </button>
      : <Trigger className='btn-dropdown' onClick={handleClick} />}
    {noWrapper
      ? isOpen && children
      : <div className={cls}>
        <div class='dropdown-arrow' />
        {children}
      </div>}
  </div>
}

export default BaseDropdown
