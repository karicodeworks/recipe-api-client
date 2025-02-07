import axios from 'axios'

const createRecipe = async (recipe) => {
  const response = await axios.post(`/api/v1/recipes`, recipe)
  return response.data
}

const getRecipes = async (url) => {
  const response = await axios.get(url)
  return response.data
}

const getRecipeById = async (id) => {
  const response = await axios.get(`/api/v1/recipes/${id}`)
  return response.data
}

const updateRecipe = async (id, recipe) => {
  const response = await axios.patch(`/api/v1/recipes/${id}`, recipe)
  return response.data
}

const deleteRecipe = async (id) => {
  const response = await axios.delete(`/api/v1/recipes/${id}`)
  return response.data
}

export { createRecipe, getRecipes, getRecipeById, updateRecipe, deleteRecipe }
