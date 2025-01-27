import { useEffect, useState } from 'react'
import { useGlobalContext } from '../context'
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const VerifyPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const { isLoading } = useGlobalContext()
  const query = useQuery()

  const verifyEmail = async () => {
    setLoading(true)
    try {
      const { data } = await axios.post('/api/v1/auth/verify-email', {
        verificationToken: query.get('token'),
        email: query.get('email'),
      })
      setMessage(data.message)
    } catch (error) {
      setError(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!isLoading) {
      verifyEmail()
    }
  }, [])

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h1>Loading...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h1>There was an error, double check your verification Email</h1>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex-col flex justify-center items-center">
      <h1>{message}</h1>
      <Link to="/login" className="bg-gray-800 text-white p-3">
        Please login
      </Link>
    </div>
  )
}
export default VerifyPage
