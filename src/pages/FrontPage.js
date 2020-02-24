import React, { useRef, useEffect, useState } from 'react'
// import isColor from 'is-color'
import '../styles/datadriven.css'
import '../styles/common.css'

import { isEqual } from '../helperFunctions/'

const FrontPage = () => {
  const defaultTheme = {
    '--color-solid': 'black',
    '--color-surface': 'white',
    '--color-primary': 'teal'
  }

  const [currentStyle, setStyle] = useState(defaultTheme)
  const [msg, setMsg] = useState({ loading: false, msg: '' })

  //     const prevRef = useRef()

  //   useEffect(() => {
  //   }, [])

  const applyTheme = (styles) => {
    console.log('styles', styles)
    Object.keys(styles).map((key) => {
      const value = styles[key]
      document.documentElement.style.setProperty(key, value)
      return null
    })
  }

  // This is for another node api call, only in the sketches right now
  // const handleApiCall = (api) => (e) => {
  //   e.preventDefault()
  //   fetch('/.netlify/functions/' + api)
  //     .then((response) => response.json())
  //     .then((json) => setMsg({ loading: false, msg: json.msg }))
  // }

  const handleApiCallStore = (api) => (e) => {
    e.preventDefault()
    fetch('/.netlify/functions/' + api)
      .then((response) => response.json())
      .then((json) => {
        setStyle(json.cssVariables)
        applyTheme(json.cssVariables)
        setMsg({ loading: false, msg: json.msg })
      })
  }

  return (
    <article className='grid-center'>
      <h1>Interesting header</h1>
      <p>
        <button onClick={handleApiCallStore('update-variable-store')}>
          {msg.loading ? 'Loading...' : 'Upload style'}
        </button>
      </p>
      <p>{msg.msg}</p>
    </article>
  )
}

export default FrontPage
