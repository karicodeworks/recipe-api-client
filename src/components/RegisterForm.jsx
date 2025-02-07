import axios from 'axios'
import { useState } from 'react'
import useLocalState from '../utils/LocalState'

const RegisterForm = ({ formToggle }) => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  })
  const { loading, setLoading, alert, showAlert, hideAlert } = useLocalState()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    hideAlert()
    setLoading(true)

    const { username: name, email, password, confirm_password } = values
    if (password !== confirm_password) {
      showAlert({ text: 'Passwords do not much' })
      setLoading(false)
      return
    }
    if (password.length < 6) {
      showAlert({ text: 'Password should be more than 6 characters' })
      setLoading(false)
      return
    }
    try {
      const newUser = { name, email, password }
      const { data } = await axios.post('/api/v1/auth/register', newUser)
      setValues({ username: '', email: '', password: '', confirm_password: '' })
      showAlert({
        text: `${data.message}. Check your email for verification.`,
        type: 'success',
      })
      setLoading(false)
    } catch (error) {
      showAlert({ text: error.response.data.message })
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleRegister} autoComplete="off" className="form">
        {alert.show && (
          <div className={`alert alert-${alert.type}`}>{alert.text}</div>
        )}
        <h1>Register</h1>
        <div className="form-field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            value={values.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label className="form-field" htmlFor="email">
            User Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="User Email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="******************"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            name="confirm_password"
            type="password"
            placeholder="******************"
            value={values.confirm_password}
            onChange={handleChange}
          />
        </div>
        <div className="form-buttons">
          <button type="submit" disabled={loading}>
            {loading ? 'Signing Up' : 'Sign Up'}
          </button>
          <a onClick={formToggle}>Back to Login</a>
        </div>
      </form>
    </>
  )
}
export default RegisterForm
