import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className="sticky top-0 flex justify-between items-center px-8 bg-gray-800 p-2 text-white">
      <div className="my-custom-font font-extrabold text-3xl">Recipes</div>
      <nav className="flex w-max gap-10 text-sm">
        <Link to="/">Home</Link>
        <Link to="/breakfast">Breakfast</Link>
        <Link to="/lunch">Lunch</Link>
        <Link to="/dinner">Dinner</Link>
        <button className="bg-red-500">Login/sign-up</button>
      </nav>
    </div>
  )
}

export default NavBar
