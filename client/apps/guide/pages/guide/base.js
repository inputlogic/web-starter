import GuideSection from './guide-section'
import Image from './image'
import ExampleForm from './form'
import Tooltip from '/project/elements/tooltip'
import Dropdown from '/project/elements/dropdown'
import Carousel from '/project/elements/carousel'
import {DynamicText, Dynamic} from '/project/elements/dynamic'

export default ({openExampleModal}) =>
  <div className='guide-component'>

    <GuideSection name='Dynamic'>
      <h2><DynamicText id='primary-header' >Cool</DynamicText></h2>
      <Dynamic id='main-image' default='/images/icon-question.png' >
        {({value}) => <img src={value} />}
      </Dynamic>
    </GuideSection>

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
    <GuideSection name='Dropdown'>
      <Dropdown uid='food'>
        <ul>
          <li><a href=''>Hotdog</a></li>
          <li><a href=''>Cola</a></li>
          <li><a href=''>Fruit Smoothie</a></li>
          <li><a href=''>Dinasaur Egg</a></li>
        </ul>
      </Dropdown>
    </GuideSection>
    <GuideSection name='Carousel'>
      <Carousel withDots>
        {W.map((hex) =>
          <img src={`http://www.placehold.it/400x300/${hex}/f44?text=${hex}`} style='width: 100%;' />
        , ['fff', 'a7c', '09d', '411', '111'])}
      </Carousel>
    </GuideSection>

  </div>
