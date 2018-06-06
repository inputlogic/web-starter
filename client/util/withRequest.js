import withRequests from '/util/withRequests'

export default function withRequest () {
  console.warn('withRequest will be deprecated. Use withRequests instead.')
  return withRequests.apply(withRequests, arguments)
}
