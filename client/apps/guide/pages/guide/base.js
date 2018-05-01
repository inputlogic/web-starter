import GuideSection from './guide-section'
import Image from './image'
import ExampleForm from './form'

export default ({openExampleModal}) =>
  <div className='guide-component'>
    <GuideSection name='Modals'>
      <button onClick={openExampleModal}>Open Modal</button>
    </GuideSection>
    <GuideSection name='Image'>
      <Image />
    </GuideSection>
    <GuideSection name='Form'>
      <ExampleForm />
    </GuideSection>
  </div>
