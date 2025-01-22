import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { username: name, email, password, confirm_password } = values
    if (password !== confirm_password) {
      setError('Passwords do not much.')
      setLoading(false)
      return
    }
    if (password.length < 6) {
      setError('Password should be more than 6 characters')
      setLoading(false)
      return
    }
    try {
      const newUser = { name, email, password }
      const { data } = await axios.post('/api/v1/auth/register', newUser)
      setValues({ username: '', email: '', password: '', confirm_password: '' })
      setMessage(data.message)
      setLoading(false)
      navigate('/login')
    } catch (error) {
      setError(error.response.data.message)
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleRegister}
      autoComplete="off"
      className="bg-gray-300 shadow-md rounded-b px-8 pt-6 pb-8"
    >
      <h1 className="font-bold text-2xl text-center mb-4">Login In</h1>
      {message && <p className="text-red-500 text-xs italic">{message}</p>}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2  mb-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          name="username"
          placeholder="Username"
          value={values.username}
          onChange={handleChange}
        />
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          User Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          name="email"
          type="email"
          placeholder="User Email"
          value={values.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          name="password"
          type="password"
          placeholder="******************"
          value={values.password}
          onChange={handleChange}
        />
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="confirm-password"
        >
          Confirm Password
        </label>
        <input
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="confirm-password"
          name="confirm_password"
          type="password"
          placeholder="******************"
          value={values.confirm_password}
          onChange={handleChange}
        />
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {loading ? 'Signing Up' : 'Sign Up'}
        </button>
        <a
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
        >
          Back to Login
        </a>
      </div>
    </form>
  )
}
export default RegisterForm
