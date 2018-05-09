import {map} from 'wasmuth'

export default function render ({
  active,
  prev,
  next,
  className = 'carousel-slide',
  getRef,
  getStyle,
  wrapperClass,
  children
}) {
  return <div className={`carousel-block carousel ${wrapperClass}`}>
    <div className='card-carousel-content row'>
      <nav className='nav prev'>
        <button onClick={prev} />
      </nav>
      <div className='slides'>
        {map((c, idx) =>
          <div
            ref={(ref) => idx === 0 && getRef(ref)}
            style={getStyle(idx, active)}
            class={`${className}${idx === active ? ' active' : ''}`}
          >{c}</div>
        , children)}
      </div>
      <nav className='nav next'>
        <button onClick={next} />
      </nav>
    </div>
  </div>
}
