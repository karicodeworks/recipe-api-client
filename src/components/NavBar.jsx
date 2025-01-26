import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'

const NavBar = () => {
  const { user, logoutUser } = useGlobalContext()
  return (
    <div className="sticky top-0 flex justify-between items-center py-2 bg-gray-800 p-2 text-white px-24">
      <div className="my-custom-font font-extrabold text-3xl">
        <Link to="/">Recipes</Link>
      </div>
      {user ? (
        <>
          <p>Welcome, {user.name}</p>
          <button className="border rounded p-1" onClick={logoutUser}>
            logout
          </button>
        </>
      ) : (
        <nav className="flex w-max gap-10 text-sm items-center">
          <Link to="/login">
            <button className="border rounded p-1">Login/Register</button>
          </Link>
        </nav>
      )}
    </div>
  )
}

export default NavBar
