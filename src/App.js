import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function App() {
  const [results, setResults] = useState([])
  const [query, setQuery] = useState('react hooks')

  useEffect(() => {
    getResults()
  }, [])

  const handleSearch = event => {
    event.preventDefault()
    getResults()
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
        <input type="text" onChange={e => setQuery(e.target.value)} />
        <button type="submit" onClick={getResults}>
          Search
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
