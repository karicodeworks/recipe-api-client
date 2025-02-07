import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'

const RecipeForm = ({ onSubmit }) => {
  const [recipe, setRecipe] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [method, setMethod] = useState([])
  const [difficulty, setDifficulty] = useState('')
  const [ingredientInput, setIngredientInput] = useState('')
  const [methodInput, setMethodInput] = useState('')
  const [category, setCategory] = useState('')

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    try {
      const {
        data: {
          image: { src },
        },
      } = await axios.post('/api/v1/recipes/image-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setImageUrl(src)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const addIngredient = () => {
    if (ingredientInput) {
      setIngredients([...ingredients, ingredientInput])
      setIngredientInput('')
    }
  }

  const addMethodStep = () => {
    if (methodInput) {
      setMethod([...method, methodInput])
      setMethodInput('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      !title ||
      !description ||
      !imageUrl ||
      ingredients.length === 0 ||
      method.length === 0 ||
      !difficulty ||
      !category
    ) {
      toast.error('Unafaa kujaza fields zote.')
      return
    }

    const recipe = {
      title,
      description,
      imageUrl,
      ingredients,
      method,
      category,
      difficulty,
    }
    onSubmit(recipe)
  }

  return (
    <div className="recipe-form">
      <form onSubmit={handleSubmit}>
        <div className="recipe-form-row">
          <h3>Recipe Title:</h3>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="recipe-form-row">
          <h3>Recipe Description:</h3>
          <textarea
            rows="4"
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="recipe-form-row">
          <h3>Upload an Image:</h3>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageUpload}
          />
        </div>
        <div className="recipe-form-row">
          <h3>Ingredients:</h3>
          <ol>
            {ingredients.map((eng, index) => (
              <li key={index}>{eng}</li>
            ))}
          </ol>
          <div className="recipe-input">
            <input
              type="text"
              name="ingredients"
              placeholder="Ingredient"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
            />
            <button type="button" onClick={addIngredient}>
              <FontAwesomeIcon icon={faAdd} />
            </button>
          </div>
        </div>
        <div className="recipe-form-row">
          <h3>Method Steps:</h3>
          <ol>
            {method.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          <div className="recipe-input">
            <input
              type="text"
              name="ingredients"
              placeholder="Ingredient"
              value={methodInput}
              onChange={(e) => setMethodInput(e.target.value)}
            />
            <button type="button" onClick={addMethodStep}>
              <FontAwesomeIcon icon={faAdd} />
            </button>
          </div>
        </div>
        <div className="recipe-form-row">
          <h3>Recipe Category:</h3>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>
        <div className="recipe-form-row">
          <h3>Recipe Difficulty:</h3>
          <select
            name="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <button type="submit">SAVE RECIPE</button>
      </form>
    </div>
  )
}
export default RecipeForm
