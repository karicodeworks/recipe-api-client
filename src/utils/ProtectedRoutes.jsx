import { Outlet, Navigate } from 'react-router-dom'
import { useGlobalContext } from '../context'

const ProtectedRoutes = () => {
  const { user } = useGlobalContext()

  return user ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes
