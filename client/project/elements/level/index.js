import check from 'check-arg-types'

const toType = check.prototype.toType

const classMap = {
  noPadding: 'no-padding',
  halfPadding: 'half-padding',
  notSpaced: 'not-spaced',
  withUnderline: 'with-underline'
}

const cls = (obj) =>
  'level ' +
  Object
    .keys(obj)
    .filter((k) => obj[k] === true)
    .map((k) => classMap[k])
    .join(' ')

const Level = ({
  // Components as props
  left,
  right,
  // CSS modifiers
  noPadding,
  halfPadding,
  notSpaced,
  withUnderline,
  // ...rest
  children,
  ...props
}) =>
  <div {...props}>
    {children.length > 0 &&
      <div class={cls({noPadding, halfPadding, notSpaced, withUnderline})}>
        {children}
      </div>}

    {!children.length &&
      <div class={cls({noPadding, halfPadding})}>
        <div class='level-left'>
          {toType(left) === 'function' ? left(props) : left}
        </div>
        <div class='level-right'>
          {toType(right) === 'function' ? right(props) : right}
        </div>
      </div>}
  </div>

export default Level
