export default ({className = '', text = 'I am default text', pos = 'left', length = 'medium', children}) =>
  <div className={`tooltip ${className}`} data-tooltip={text} data-tooltip-pos={pos} data-tooltip-length={length}>
    {children}
  </div>
