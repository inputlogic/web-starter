import {map} from 'wasmuth'
import Helmet from 'preact-helmet'

// Components
import Carousel from '/project/elements/carousel'
import Dropdown from '/project/elements/dropdown'
import {
  Form,
  SubmitButton,
  TextField,
  Checkbox
} from '/project/elements/styled-form'

import {watchPath, dispatch, remove} from '/store'

watchPath(['nested', 'test'], (newVal, oldVal) =>
  console.warn('nested', newVal, oldVal)
)

const removeNested = ev => {
  ev.preventDefault()
  dispatch(remove('nested.test'))
}

const Home = ({url, modals = {}}) =>
  <div>
    <Helmet
      title='Web Starter | Home'
      meta={[
        {name: 'description', content: 'Helmet application'},
        {property: 'og:type', content: 'article'}
      ]}
    />

    <div className='intro' style='max-width: 640px; margin: 1rem auto;'>
      <h1>Hello World</h1>
      <div className='card elevated hover-scale'>
        <p>{url}</p>
        <a href='http://google.ca'>Google</a>
        <a className='btn' href='http://news.ycombinator.com'>Hacker News</a>
      </div>
      <div class='spaced'>
        <h2>Dropdown</h2>
        <Dropdown uid='food'>
          <ul>
            <li><a onClick={removeNested} href='#'>Hotdog</a></li>
            <li><a href=''>Cola</a></li>
            <li><a href=''>Fruit Smoothie</a></li>
            <li><a href=''>Dinasaur Egg</a></li>
          </ul>
        </Dropdown>
      </div>

    </div>

    <div className='card spaced'>
      <Form name='SignIn' onSubmit={({data}) => log.debug('SignIn', data)}>
        <h2>Sign In</h2>
        <p>Sign in to your account below.</p>

        <TextField fancy focus type='email' label='Your Email' name='email' />
        <TextField fancy type='password' label='Your Password' name='pass' rules={{min: 8}} />

        <Checkbox label='Subscibe to your newsletter?' name='newsletter' />

        <SubmitButton className='btn'>Sign In</SubmitButton>
      </Form>
    </div>

    <div className='card spaced'>
      <Form name='Gavin' onSubmit={({data}) => log.debug('Gavin', data)}>
        <fieldset className='padding-top'>
          <TextField type='text' placeholder='Email' name='username' />
          <TextField type='password' placeholder='Password' name='password' />
        </fieldset>
        <br />
        <fieldset className='padding-top'>
          <SubmitButton class='btn'>Login</SubmitButton>
        </fieldset>
      </Form>
    </div>

    <div className='test'>
      <h1>Lorem ipsum um vero natus</h1>
    </div>

    <div className='spaced'>
      <Carousel>
        {map((hex) =>
          <img src={`http://www.placehold.it/400x300/${hex}/f44?text=${hex}`} />
        , ['fff', 'a7c', '09d', '411', '111'])}
      </Carousel>
    </div>
  </div>

export default Home
