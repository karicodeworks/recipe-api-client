import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'
import useLocalState from '../utils/LocalState'

const LoginForm = () => {
  const { saveUser } = useGlobalContext()
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const { loading, setLoading, alert, showAlert, hideAlert } = useLocalState()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    hideAlert()
    setLoading(true)
    const { email, password } = values
    const userCreds = { email, password }

    try {
      const { data } = await axios.post('/api/v1/auth/login', userCreds)
      setValues({ email: '', password: '' })
      showAlert({
        text: `Welcome, ${data.user.name}. Redirecting to dashboard...`,
        type: 'success',
      })
      setLoading(false)
      saveUser(data.user)
      navigate('/dashboard')
    } catch (error) {
      showAlert({ text: error.response.data.message })
      setLoading(false)
    }
  }

  return (
    <>
      {alert.show && (
        <div className={`alert alert-${alert.type}`}>{alert.text}</div>
      )}
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
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Sign In'}
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
