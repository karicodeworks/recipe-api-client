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
      <form onSubmit={handleLogin} autoComplete="off" className="form">
        {alert.show && (
          <div className={`alert alert-${alert.type}`}>{alert.text}</div>
        )}
        <h1>Login In</h1>
        <div className="form-field">
          <label htmlFor="email">User Email</label>
          <input
            id="email"
            name="email"
            value={values.email}
            type="email"
            placeholder="User Email"
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            value={values.password}
            type="password"
            placeholder="******************"
            onChange={handleChange}
          />
        </div>
        <div className="form-buttons">
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Sign In'}
          </button>
          <a>Forgot Password?</a>
        </div>
      </form>
    </>
  )
}
export default LoginForm
