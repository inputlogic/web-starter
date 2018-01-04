import Image from '/components/elements/image'

const IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1482003297000-b7663a1673f1?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=ba0115a15252dd294a1e8ba14af74d31',
    class: 'image-one'
  },
  {
    url: 'https://images.unsplash.com/photo-1482003297000-b7663a1673f1?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=86598e0c76da1d4e39d0ae62fc8ae6dc',
    class: 'image-two'
  },
  {
    url: 'https://images.unsplash.com/photo-1482003297000-b7663a1673f1?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=adcc4d7d1ac808ab9987732f4057b157',
    class: 'image-three'
  },
  {
    url: 'https://images.unsplash.com/photo-1482003297000-b7663a1673f1?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=d1793be993ffb3d86e5538992e28a3c2',
    class: 'image-four'
  }
]

export default () =>
  <div>
    <h1>Images</h1>
    <p>The border changes color when a higher resolution image has loaded.</p>
    <Image images={IMAGES} />
  </div>
