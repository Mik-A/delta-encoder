import React, { useRef, useEffect, useState, Fragment } from 'react'
import download from 'in-browser-download'
import DragDropFile from '../components/DragDropFile'

import '../styles/aitobrand.css'
import '../styles/common.css'

const FrontPage = () => {
  const [mode, setMode] = useState('Encode')
  const [query, setQuery] = useState('')
  const [msg, setMsg] = useState({
    loading: false,
    msg: '',
    fileName: 'no file uploaded'
  })

  const handleApiCall = (api) => (e) => {
    e.preventDefault()
    setMsg({ loading: true })
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
        setMsg({ loading: false, msg: json.msg })
        download(json.encoded, 'encoded.txt')
      })
  }
  const handleDecode = (api) => (e) => {
    setMsg({ loading: true })
    // const text = uploadedEncodedText
    fetch('/.netlify/functions/' + api, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fetchMessage: 'Fetch request from front',
        text: e
      })
    })
      .then((response) => response.json())
      .then((json) => {
        setMsg({ loading: false, msg: json.msg })
        download(json.decodedText, 'decoded.txt')
      })
  }
  const updateFileName = (e) => {
    setMsg({ fileName: e.name })
  }
  return (
    <article className='grid-center main'>
      <h1>{`Aito Delta ${mode}r`}</h1>
      <p />

      <div className='switch-field grid-2-col'>
        <div>
          <input
            type='radio'
            id='radio-one'
            name='switch-one'
            defaultChecked={mode === 'Encode'}
            value='Encode'
            onClick={() => setMode('Encode')}
          />
          <label htmlFor='radio-one'>Encode</label>
        </div>
        <div>
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
        <article>
          <form onSubmit={handleApiCall('encode')} className='grid-2-col'>
            <div>
              <input
                type='url'
                name='query'
                pattern='https?://.+'
                required
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div>
              <input type='submit' value='Fetch text from url' />
            </div>
          </form>
          {msg.loading ? 'Loading...' : ''}
          <p></p>
          {/* <section className='preview'>{msg.msg}</section> */}
        </article>
      )}
      {mode === 'Decode' && (
        <article className='min-width-300'>
          <DragDropFile
            fileUploadHandler={handleDecode('decode')}
            fileName={msg.fileName}
            updateFileName={updateFileName}
          />
          {/* <section className='preview'>{msg.msg}</section> */}
        </article>
      )}
    </article>
  )
}

export default FrontPage
