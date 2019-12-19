import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

export default function App() {
  const [results, setResults] = useState([])
  const [query, setQuery] = useState('react hooks')
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
    const response = await axios.get(
      `http://hn.algolia.com/api/v1/search?query=${query}`
    )
    setResults(response.data.hits)
  }

  return (
    <>
      <h1>{query.toLocaleUpperCase()} NEWS</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          onChange={e => setQuery(e.target.value)}
          value={query}
          ref={searchInputRef}
        />
        <button type="submit" onClick={getResults}>
          Search
        </button>
        <button type="button" onClick={clearResults}>
          Clear
        </button>
      </form>
      <ul>
        {results.map(result => (
          <li key={result.objectID}>
            <a href={result.url}>{result.title}</a>
          </li>
        ))}
      </ul>
    </>
  )
}
