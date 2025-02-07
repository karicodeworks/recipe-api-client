import { useState } from 'react'
import { RegisterForm, LoginForm } from '../components'

const LoginPage = () => {
  const [sigUpForm, setSignUpForm] = useState(false)

  const formToggle = () => setSignUpForm(false)

  return (
    <div className="form-container">
      <div className="form-toggle">
        <button onClick={() => setSignUpForm(false)}>Login</button>
        <button onClick={() => setSignUpForm(true)}>Sign Up</button>
      </div>
      {sigUpForm ? <RegisterForm formToggle={formToggle} /> : <LoginForm />}
    </div>
  )
}
export default LoginPage
