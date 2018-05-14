import Level from '/project/elements/level'

export default function render ({
  active,
  prev,
  next,
  setActive,
  wrapperClass = '',
  className = 'carousel-slide',
  noNav = false,
  withDots = false,
  getRef,
  getStyle,
  getSlidesStyle,
  children
}) {
  return <div className={`carousel ${wrapperClass}`}>
    <div>
      <div className='carousel-inner'>
        {!noNav &&
          <nav className='nav prev'>
            <button onClick={prev} />
          </nav>}
        <div className='slides-wrapper'>
          <div className='slides' style={getSlidesStyle()}>
            {W.map((c, idx) =>
              <div
                ref={(ref) => idx === 0 && getRef(ref)}
                style={getStyle(idx, active)}
                class={`${className}${idx === active ? ' active' : ''}`}
              >{c}</div>
            , children)}
          </div>
        </div>
        {!noNav &&
          <nav className='nav next'>
            <button onClick={next} />
          </nav>}
      </div>
      {withDots &&
        <Level className='carousel-dots'>
          {W.map(i =>
            <button onClick={setActive(i)} className={`${i === active ? 'active' : ''}`}>{i}</button>
          , W.range(0, children.length))}
        </Level>}
    </div>
  </div>
}
