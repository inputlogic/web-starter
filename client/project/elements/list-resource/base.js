import DefaultLoader from '/project/elements/loader'

export const ListResource = ({
  isLoading = false,
  results = [],
  child,
  Loader,
  ...props
}) =>
  <div {...props}>
    {isLoading
      ? Loader != null
        ? <Loader />
        : <DefaultLoader className='med center' />
      : null}
    {W.map(child, results)}
  </div>

export default ListResource
