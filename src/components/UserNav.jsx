import { Link } from 'react-router-dom'

const UserNav = () => {
  return (
    <div className="user-nav">
      <Link to="/dashboard">Stats</Link>
      <Link to="/dashboard">My Recipes</Link>
      <Link to="/dashboard/add-recipe">Add New Recipe</Link>
      <Link to="/dashboard/add-recipe">My Profile</Link>
    </div>
  )
}
export default UserNav
