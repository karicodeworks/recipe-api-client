import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className="sticky top-0 flex justify-between items-center py-2 bg-gray-800 p-2 text-white px-24">
      <div className="my-custom-font font-extrabold text-3xl">Recipes</div>
      <nav className="flex w-max gap-10 text-sm items-center">
        <Link to="/">Home</Link>
        <Link to="/breakfast">Breakfast</Link>
        <Link to="/lunch">Lunch</Link>
        <Link to="/dinner">Dinner</Link>
        <Link to="/login">
          <button className="border rounded p-1">Login/Register</button>
        </Link>
      </nav>
    </div>
  )
}

export default NavBar
