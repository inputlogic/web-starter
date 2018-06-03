import Helmet from 'preact-helmet'
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

    <h1 style='padding: 1em;'>
      <DynamicText id='main-header' >Welcome</DynamicText>
    </h1>
  </div>

export default Home
