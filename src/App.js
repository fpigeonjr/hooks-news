import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function App() {
  const [results, setResults] = useState([])

  useEffect(() => {
    axios
      .get('http://hn.algolia.com/api/v1/search?query=reacthooks')
      .then(response => {
        console.log(response.data)
        setResults(response.data.hits)
      })
  }, [])

  return (
    <>
      <h1>React Hook News</h1>
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
