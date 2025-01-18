import axios from 'axios'
import { useEffect, useState } from 'react'

const HomePage = () => {
  useEffect(() => {
    axios.get('/api/v1/recipes').then((response) => console.log(response.data))
  }, [])

  return (
    <div className="grid grid-cols-4 gap-2 bg-gray-300 h-auto m-4 p-2 ">
      <h1>new</h1>
    </div>
  )
}
export default HomePage
