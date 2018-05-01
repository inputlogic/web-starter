export const App = ({isActive, children}) =>
  <div style={isActive ? {} : {display: 'none'}}>
    {children}
  </div>

export default App
