import Helmet from 'preact-helmet'
import {urlFor} from '/util/route'
import {DynamicText} from '/project/elements/dynamic'

const Home = ({url, modals = {}}) =>
  <div>
    <Helmet
      title='Web Starter | Home'
      meta={[
        {name: 'description', content: 'Helmet application'},
        {property: 'og:type', content: 'article'}
      ]}
    />

    <h1 style='padding: 1em 0;'>
      <DynamicText id='main-header'>Welcome</DynamicText>
    </h1>

    <p>Check out the <a href={urlFor('users')}>Users</a> page for dynamically loaded content.</p>
  </div>

export default Home
