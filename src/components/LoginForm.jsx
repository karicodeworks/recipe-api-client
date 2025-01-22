import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { email, password } = values
    const userCreds = { email, password }

    try {
      const { data } = await axios.post('/api/v1/auth/login', userCreds)
      setValues({ email: '', password: '' })
      alert(`Welcome, ${data.user.name}. Redirecting to dashboard...`)
      setLoading(false)
      navigate('/dashboard')
    } catch (error) {
      setError(error.response.data.message)
      setLoading(false)
    }
  }

  return (
    <>
      <form
        onSubmit={handleLogin}
        autoComplete="off"
        className="bg-gray-300 shadow-md rounded-b px-8 pt-6 pb-8"
      >
        <h1 className="font-bold text-2xl text-center mb-4">Login In</h1>
        <div className="mb-4">
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
            value={values.email}
            type="email"
            placeholder="User Email"
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
            value={values.password}
            type="password"
            placeholder="******************"
            onChange={handleChange}
          />
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {loading ? 'loading' : 'Sign In'}
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </>
  )
}
export default LoginForm
