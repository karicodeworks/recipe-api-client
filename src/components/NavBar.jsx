import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'
import UserNav from './UserNav'

const NavBar = () => {
  const { user, logoutUser } = useGlobalContext()
  return (
    <div className="nav-container">
      <div className="logo">
        <Link to="/">Chef to Chef</Link>
      </div>
      {user ? (
        <div className="user-welcome">
          <UserNav />
          <p>Hello, {user.name}</p>
          <button className="logout-btn" onClick={logoutUser}>
            Logout
          </button>
        </div>
      ) : (
        <button className="login-btn">
          <Link to="/login">Login/Register</Link>
        </button>
      )}
    </div>
  )
}

export default NavBar
