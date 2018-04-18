import {urlFor} from '/util/route'

export default () =>
  <div>
    <a href={urlFor('home')}>Home</a>
    &nbsp;
    <a href={urlFor('guide')}>Guide</a>
  </div>
