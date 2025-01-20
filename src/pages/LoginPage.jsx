import { useState } from 'react'
import { RegisterForm, LoginForm } from '../components'

const LoginPage = () => {
  const [sigUpForm, setSignUpForm] = useState(false)

  return (
    <div className="h-full pt-10 lg:w-4/12 sm:w-4/5 lg:m-auto sm:m-auto">
      <div className="w-full flex flex-1 justify-between rounded-t">
        <button
          onClick={() => setSignUpForm(false)}
          className="w-1/2 bg-gray-800 text-white p-4 rounded-tl"
        >
          Login
        </button>
        <button
          onClick={() => setSignUpForm(true)}
          className="w-1/2 bg-gray-400 rounded-tr"
        >
          Sign Up
        </button>
      </div>
      {sigUpForm ? <RegisterForm /> : <LoginForm />}
    </div>
  )
}
export default LoginPage
