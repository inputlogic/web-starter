import BaseTooltip from './base'

export default (props) =>
  BaseTooltip({
    pos: W.pipe(
      W.pick(['up', 'right', 'down', 'left']),
      W.filter(x => !!x),
      W.toPairs,
      W.path('0.0')
    )(props),
    ...props
  })
