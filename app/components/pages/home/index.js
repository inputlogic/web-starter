import {map, pipe, range} from 'wasmuth'

// Components
import Carousel from '/components/elements/carousel'
import Card from '/components/elements/card'
import Button from '/components/elements/button'
import Dropdown from '/components/elements/dropdown'
import {
  Form,
  FormHeading,
  FieldSet,
  TextField
} from '/components/elements/form'
import {Row, Column} from '/components/elements/grid'
import Link from '/components/elements/link'
import Page from '/components/elements/page'
import PageTitle from '/components/elements/page-title'

// State
import {dispatch} from '/store'
import {openModal} from '/components/elements/modal/actions'

const OpenModal = pipe(
  ({modals}) => ({
    modals,
    handleClick: (ev) =>
      ev.preventDefault() || dispatch(openModal({'Example': {name: 'example'}}))
  }),
  ({handleClick, modals}) =>
    <div>
      <Button to={handleClick}>Win!</Button>
    </div>
)

const Home = ({url, modals = {}}) =>
  <Page>
    <PageTitle title='With Preact'>
      <OpenModal modals={modals} />
    </PageTitle>
    <div style='max-width: 640px; margin: 1rem auto;'>
      <h1>Hello World</h1>
      <Card className='elevated hover-scale'>
        <p>{url}</p>
        <Link to='http://google.ca'>Google</Link>
        <Button to='http://news.ycombinator.com'>Hacker News</Button>
      </Card>
      <div class='spaced'>
        <h2>Dropdown</h2>
        <Dropdown>
          <ul>
            <li><a href=''>Hotdog</a></li>
            <li><a href=''>Cola</a></li>
            <li><a href=''>Fruit Smoothie</a></li>
            <li><a href=''>Dinasaur Egg</a></li>
          </ul>
        </Dropdown>
      </div>
      <Card className='spaced'>
        <Form>
          <FormHeading>
            <h2>Sign In</h2>
            <p>Sign in to your account below.</p>
          </FormHeading>

          <FieldSet>
            <Button className='btn-outline'>Sign In with Google</Button>
          </FieldSet>

          <div class='or'>
            <span>Or</span>
          </div>

          <FieldSet>
            <TextField placeholder='Your Email' name='email' />
            <TextField placeholder='Your Password' name='pass' />
          </FieldSet>

          <FieldSet className='submit'>
            <Button type='submit'>Sign In</Button>
          </FieldSet>
        </Form>
      </Card>
      <Row><h2>Grid</h2></Row>
      <Row>{range(0, 4).map((n) =>
        <Column>
          <Card>{n}</Card>
        </Column>
      )}</Row>
      <Row>{range(4, 6).map((n) =>
        <Column>
          <Card>{n}</Card>
        </Column>
      )}</Row>

    </div>
    <div className='spaced'>
      <Carousel>
        {map((hex) =>
          <img src={`http://www.placehold.it/400x300/${hex}/f44?text=${hex}`} />
        , ['fff', 'a7c', '09d', '411', '111'])}
      </Carousel>
    </div>

    <div className='container'>
      <h2>Styled Table</h2>

      <table className='styled'>
        <tr>
          <th>Company</th>
          <th>Contact</th>
          <th>Country</th>
        </tr>
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
        <tr>
          <td>Berglunds snabbköp</td>
          <td>Christina Berglund</td>
          <td>Sweden</td>
        </tr>
        <tr>
          <td>Centro comercial Moctezuma</td>
          <td>Francisco Chang</td>
          <td>Mexico</td>
        </tr>
        <tr>
          <td>Ernst Handel</td>
          <td>Roland Mendel</td>
          <td>Austria</td>
        </tr>
        <tr>
          <td>Island Trading</td>
          <td>Helen Bennett</td>
          <td>UK</td>
        </tr>
        <tr>
          <td>Königlich Essen</td>
          <td>Philip Cramer</td>
          <td>Germany</td>
        </tr>
        <tr>
          <td>Laughing Bacchus Winecellars</td>
          <td>Yoshi Tannamuri</td>
          <td>Canada</td>
        </tr>
        <tr>
          <td>Magazzini Alimentari Riuniti</td>
          <td>Giovanni Rovelli</td>
          <td>Italy</td>
        </tr>
        <tr>
          <td>North/South</td>
          <td>Simon Crowther</td>
          <td>UK</td>
        </tr>
        <tr>
          <td>Paris spécialités</td>
          <td>Marie Bertrand</td>
          <td>France</td>
        </tr>
      </table>

    </div>

  </Page>

export default Home
