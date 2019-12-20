import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

export default function App() {
  const [results, setResults] = useState([])
  const [query, setQuery] = useState('react hooks')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const searchInputRef = useRef()

  useEffect(() => {
    getResults()
  }, [])

  const handleSearch = event => {
    event.preventDefault()
    getResults()
  }

  const clearResults = () => {
    setQuery('')
    searchInputRef.current.focus()
  }

  const getResults = async () => {
    setLoading(true)

    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      )
      setResults(response.data.hits)
    } catch (err) {
      setError(err)
    }

    setLoading(false)
  }

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-200 shadow-lg rounded">
      <img
        src="https://icon.now.sh/react/c0c"
        alt="React Logo"
        className="float-right h-12"
      />
      <h1 className="text-grey-darkest font-thin">
        {query.toLocaleUpperCase()} NEWS
      </h1>
      <form className="mb-2" onSubmit={handleSearch}>
        <input
          type="text"
          onChange={e => setQuery(e.target.value)}
          value={query}
          ref={searchInputRef}
          className="border p-1 rounded"
        />
        <button
          type="submit"
          className="bg-orange-500 rounded m-1 p-1"
          onClick={getResults}
        >
          Search
        </button>
        <button
          type="button"
          className="bg-teal-500 text-white p-1 rounded"
          onClick={clearResults}
        >
          Clear
        </button>
      </form>
      {loading ? (
        <p className="font-bold text-orange-500">Loading...</p>
      ) : (
        <ul className="list-reset leading-normal ">
          {results.map(result => (
            <li key={result.objectID}>
              <a
                className="text-indigo-500 hover:text-indigo-800"
                href={result.url}
              >
                {result.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      {error && <div className="text-red-500 font-bold">{error.message}</div>}
    </div>
  )
}
