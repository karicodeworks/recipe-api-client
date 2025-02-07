import { useEffect, useState, useCallback } from 'react'
import { getRecipes } from '../api/recipeApi'
import { Link } from 'react-router-dom'
import _ from 'lodash'

const RecipeList = () => {
  const [recipes, setRecipes] = useState([])
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const fetchRecipes = async (query) => {
    const url = query ? `/api/v1/recipes?search=${query}` : '/api/v1/recipes'
    try {
      const data = await getRecipes(url)
      setRecipes(data.recipes)
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchRecipes()
  }, [])

  const debouncedFetchRecipes = useCallback(_.debounce(fetchRecipes, 500), [])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    debouncedFetchRecipes(e.target.value)
  }

  return (
    <>
      <div>
        <input
          type="search"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="recipes-grid">
        {recipes.length === 0 && (
          <h1 className="no-recipes">No recipes to show</h1>
        )}
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <Link to={`/recipe/${recipe._id}`}>
              <img src={recipe.imageUrl} alt="The food" />
              <div className="card-details">
                <h2>{recipe.title}</h2>
                <p>{recipe.description}</p>
              </div>
            </Link>
          </div>
        ))}
        {error && <p>{error}</p>}
      </div>
    </>
  )
}
export default RecipeList
