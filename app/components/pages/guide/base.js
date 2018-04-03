import GuideSection from './guide-section'
import ProgressExample from './progress'
import Image from './image'
import ExampleForm from './form'
import AutoForm from './autoform'

export default ({openExampleModal}) =>
  <div className='guide-component'>
    <GuideSection name='Modals'>
      <button onClick={openExampleModal}>Open Modal</button>
    </GuideSection>
    <GuideSection name='Progress'>
      <ProgressExample />
    </GuideSection>
    <GuideSection name='Image'>
      <Image />
    </GuideSection>
    <GuideSection name='Form'>
      <ExampleForm />
    </GuideSection>
    <GuideSection name='AutoForm'>
      <AutoForm />
    </GuideSection>
  </div>
