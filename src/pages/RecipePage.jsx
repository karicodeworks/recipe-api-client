import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRecipeById } from '../api/recipeApi'

const RecipePage = () => {
  const [recipe, setRecipe] = useState([])
  const { id } = useParams()

  const fetchRecipe = async () => {
    try {
      const data = await getRecipeById(id)
      setRecipe(data.recipe)
    } catch (error) {}
  }

  useEffect(() => {
    fetchRecipe()
  }, [])

  return (
    <div className="recipe-page">
      <div className="recipe-container">
        <h1>Recipe Title</h1>
        <div className="recipe-image">
          <img src="/food.jpg" alt="The Food" />
          <div>
            <h2>Ingredients</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              semper condimentum bibendum. Pellentesque condimentum justo
              turpis, sit amet consectetur velit cursus quis. Praesent
              ullamcorper, augue eu imperdiet condimentum, sapien diam ornare
              quam, egestas consequat purus quam a nibh.
            </p>
          </div>
        </div>
        <hr />

        <div className="recipe-procedure">
          <h2>Description</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            semper condimentum bibendum. Pellentesque condimentum justo turpis,
            sit amet consectetur velit cursus quis. Praesent ullamcorper, augue
            eu imperdiet condimentum, sapien diam ornare quam, egestas consequat
            purus quam a nibh.
          </p>
        </div>

        <div className="recipe-procedure">
          <h2>Method</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            semper condimentum bibendum. Pellentesque condimentum justo turpis,
            sit amet consectetur velit cursus quis. Praesent ullamcorper, augue
            eu imperdiet condimentum, sapien diam ornare quam, egestas consequat
            purus quam a nibh.
          </p>
        </div>
      </div>
    </div>
  )
}
export default RecipePage
