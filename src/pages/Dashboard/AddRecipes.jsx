import { useNavigate } from 'react-router-dom'
import { RecipeForm } from '../../components'
import { toast } from 'react-toastify'
import { createRecipe } from '../../api/recipeApi'

const AddRecipes = () => {
  const navigate = useNavigate()

  const handleSubmit = async (recipe) => {
    try {
      const data = await createRecipe(recipe)
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  return (
    <div className="add-recipe-page">
      <h1>Create A New Recipe</h1>
      <RecipeForm onSubmit={handleSubmit} />
    </div>
  )
}
export default AddRecipes
