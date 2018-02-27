import withState from '/util/withState'
import {dispatch, set} from '/store'
import Base from './base'

export const GuideSection = withState(
  ({guideSection = {}}, {name}) => ({show: !!guideSection[name]})
)(({name, children, show}) => Base({
  name,
  children,
  hidden: !show,
  toggle: () => dispatch(set(['guideSection', name], !show))
}))

export default GuideSection
