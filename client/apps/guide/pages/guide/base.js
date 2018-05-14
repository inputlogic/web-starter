import GuideSection from './guide-section'
import Image from './image'
import ExampleForm from './form'
import Tooltip from '/project/elements/tooltip'

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

    <GuideSection name='Tooltips'>

      <div className='demo-grid'>

        <Tooltip className='inline' text='I am up' pos='up'>
          <img src='/images/icon-question.png' alt='' />
        </Tooltip>

        <Tooltip className='inline' text='I am down' pos='down'>
          <img src='/images/icon-question.png' alt='' />
        </Tooltip>

        <Tooltip className='inline' text='I am left' pos='left'>
          <img src='/images/icon-question.png' alt='' />
        </Tooltip>

        <Tooltip className='inline' text='I am right' pos='right'>
          <img src='/images/icon-question.png' alt='' />
        </Tooltip>

        <Tooltip className='inline' text='Small' pos='up' length='small'>
          <img src='/images/icon-question.png' alt='' />
        </Tooltip>

        <Tooltip className='inline' text='Large' pos='up' length='large'>
          <img src='/images/icon-question.png' alt='' />
        </Tooltip>

      </div>
    </GuideSection>

  </div>
