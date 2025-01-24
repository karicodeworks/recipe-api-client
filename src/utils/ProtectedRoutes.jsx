import { Route, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useGlobalContext()

  return (
    <Route
      {...rest}
      render={() => (user ? children : useNavigate('/login'))}
    ></Route>
  )
}

export default PrivateRoute
