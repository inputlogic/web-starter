export const GuideSection = ({name, children, toggle, hidden}) =>
  <div className='guide-section'>
    <h1 onClick={toggle}>{name}</h1>
    {!hidden && children}
  </div>

export default GuideSection
