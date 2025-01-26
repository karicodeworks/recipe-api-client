import { useState } from 'react'

const useLocalState = () => {
  const [loading, setLoading] = useState(false)
  const [sucess, setSuccess] = useState(false)
  const [alert, setAlert] = useState({
    show: false,
    text: '',
    type: 'danger',
  })

  const showAlert = ({ text, type = 'danger' }) => {
    setAlert({ show: true, text, type })
  }

  const hideAlert = () => {
    setAlert({ show: false, text: '', type: 'danger' })
  }

  return {
    sucess,
    setSuccess,
    loading,
    setLoading,
    alert,
    setAlert,
    showAlert,
    hideAlert,
  }
}
export default useLocalState
