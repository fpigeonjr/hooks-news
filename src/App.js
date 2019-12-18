import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function App() {
  const [results, setResults] = useState([])
  const [query, setQuery] = useState('reacthooks')

  useEffect(() => {
    getResults()
  }, [query])

  const getResults = async () => {
    const response = await axios.get(
      `http://hn.algolia.com/api/v1/search?query=${query}`
    )
    setResults(response.data.hits)
  }

  return (
    <>
      <h1>{query.toLocaleUpperCase()} NEWS</h1>
      <input type="text" onChange={e => setQuery(e.target.value)} />
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
