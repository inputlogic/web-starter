// import ProgressExample from './progress'
import Image from './image'

export default ({openExampleModal}) =>
  <div className='guide-component'>
    <h1>Modals</h1>
    <button onClick={openExampleModal}>Open Modal</button>
    <hr />
    <h1>Dropdown</h1>
    <hr />
    <h1>Progress</h1>
    <p>Uncomment progress to view it (changes state a lot)</p>
    {/* <ProgressExample /> */}
    <Image />
  </div>
