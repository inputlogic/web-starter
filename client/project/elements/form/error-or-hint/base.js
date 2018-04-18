export const ErrorOrHint = ({className = '', error, hint}) =>
  <span
    className={`field-hint ${error ? 'is-error' : ''} ${className}`}
  >
    {error || hint}
  </span>

export default ErrorOrHint
