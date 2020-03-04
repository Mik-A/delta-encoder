import React, { useRef, useEffect, useState, Fragment } from 'react'
// import isColor from 'is-color'
import '../styles/aitobrand.css'
import '../styles/common.css'

const FrontPage = () => {
  const defaultTheme = {
    '--color-solid': 'black',
    '--color-surface': 'white',
    '--color-primary': 'teal'
  }

  const [currentStyle, setStyle] = useState(defaultTheme)
  const [mode, setMode] = useState('Encode')
  const [query, setQuery] = useState('')

  const [msg, setMsg] = useState({
    loading: false,
    msg: 'Preview\n...'
  })

  //     const prevRef = useRef()

  useEffect(() => {
    console.log('query', query)
  })

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
    const url = query
    fetch('/.netlify/functions/' + api, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fetchMessage: 'Fetch request done',
        url
      })
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('json front end', json)
        const msg = json.msg.slice(0, 280) + '...'
        setMsg({ loading: false, msg })
      })
  }

  return (
    <article className='grid-center'>
      <h1>Aito Delta Encoder</h1>
      <p />

      <div className='switch-field'>
        <div className='switch-field'>
          <input
            type='radio'
            id='radio-one'
            name='switch-one'
            defaultChecked={mode === 'Encode'}
            value='Encode'
            onClick={() => setMode('Encode')}
          />
          <label htmlFor='radio-one'>Encode</label>
          <input
            type='radio'
            id='radio-two'
            name='switch-one'
            defaultChecked={mode === 'Decode'}
            value='Decode'
            onClick={() => setMode('Decode')}
          />
          <label htmlFor='radio-two'>Decode</label>
        </div>
      </div>
      {mode === 'Encode' && (
        <article className='min-width-300'>
          <form onSubmit={handleApiCallStore('test')}>
            <input
              type='url'
              name='query'
              pattern='https?://.+'
              required
              onChange={(e) => setQuery(e.target.value)}
            />
            <input type='submit' value='Fetch text from url' />
          </form>
          {msg.loading ? 'Loading...' : ''}
          <p></p>
          <div style={{ width: 300 }}>{msg.msg}</div>
        </article>
      )}
      {mode === 'Decode' && (
        <article className='min-width-300'>Decode </article>
      )}
    </article>
  )
}

export default FrontPage
