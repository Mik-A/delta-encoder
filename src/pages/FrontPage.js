import React, { useRef, useEffect, useState, Fragment } from 'react'
import download from 'in-browser-download'
import DragDropFile from '../components/DragDropFile'

import '../styles/aitobrand.css'
import '../styles/common.css'

const FrontPage = () => {
  const defaultTheme = {
    '--color-solid': 'black',
    '--color-surface': 'white',
    '--color-primary': 'teal'
  }

  const [mode, setMode] = useState('Encode')
  const [query, setQuery] = useState('')
  const [uploadedEncodedText, setEncodedText] = useState('')

  const [msg, setMsg] = useState({
    loading: false,
    msg: 'Preview\n...'
  })

  // useEffect(() => {
  //   console.log('query', query)
  // })

  const handleApiCall = (api) => (e) => {
    e.preventDefault()
    const url = query
    fetch('/.netlify/functions/' + api, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fetchMessage: 'Fetch request from front',
        url
      })
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('json front end', json)
        setMsg({ loading: false, msg: json.msg })
        download(json.encoded, 'encoded.txt')
      })
  }
  const handleDecode = (api) => (e) => {
    e.preventDefault()
    // const text = uploadedEncodedText
    fetch('/.netlify/functions/' + api, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fetchMessage: 'Fetch request from front',
        uploadedEncodedText
      })
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('json front end', json)
        setMsg({ loading: false, msg: json.msg })
        download(json.denoded, 'decoded.txt')
      })
  }
  const handleFile = (text) => {
    setEncodedText(text)
    handleDecode('decode')
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
          <form onSubmit={handleApiCall('encode')}>
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
        <article className='min-width-300'>
          <h2>Decode</h2>
          <DragDropFile fileUploadHandler={handleFile} />
        </article>
      )}
    </article>
  )
}

export default FrontPage
