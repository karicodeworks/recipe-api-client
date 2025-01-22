import axios from 'axios'
import { useEffect, useState } from 'react'

const HomePage = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState([])

  useEffect(() => {
    axios
      .get('/api/v1/recipes')
      .then((response) => setData(response.data.recipes))
      .catch((error) => setError(error.message))
  }, [])

  return (
    <div className="grid grid-cols-4 gap-2 h-auto m-4 p-2 ">
      {data.map((data, index) => (
        <div
          key={index}
          className="bg-gray-300 max-w-sm rounded overflow-hidden shadow-lg"
        >
          <img className="w-full" src="./food.jpg" alt="The food" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{data.title}</div>
            <p className="text-gray-700 text-base">{data.description}</p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <button className="inline-block bg-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 mr-2 mb-2">
              Read More
            </button>
          </div>
        </div>
      ))}
      {error && <p className="text-red-500 text-xl italic">{error}</p>}
    </div>
  )
}

export default HomePage
