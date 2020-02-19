import React, { useContext, useEffect, useState } from 'react'
// import isColor from 'is-color'
import axios from 'axios'
import './App.css'

// Below is only for front end tests in case node env can't be fetched
const sheetId = process.env.REACT_APP_SHEET_ID
const sheetKey = process.env.REACT_APP_SHEET_API_KEY
const sheetApiGetRows = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchGet?ranges=Styles&majorDimension=ROWS&key=${sheetKey}`

const App = () => {
  const defaultTheme = {
    '--color-solid': 'black',
    '--color-surface': 'white',
    '--color-primary': 'teal'
  }

  const darkTheme = {
    '--color-solid': 'white',
    '--color-surface': 'black',
    '--color-primary': 'purple'
  }

  const [currentTheme, setTheme] = useState('default') // initial
  const [currentDefault, setMainColors] = useState(defaultTheme)
  const [msg, setMsg] = useState({ loading: false, msg: 'Here comes the sun' })

  const applyTheme = (nextTheme, cb) => {
    const theme = nextTheme === 'default' ? currentDefault : darkTheme
    Object.keys(theme).map((key) => {
      const value = theme[key]
      document.documentElement.style.setProperty(key, value)
    })
    cb()
  }

  const onToggleColors = () => {
    fetch(sheetApiGetRows)
      .then((response) => {
        return response.json()
      })
      .then((myJson) => {
        const colorsFromSheet = Object.fromEntries(myJson.valueRanges[0].values)
        setMainColors(colorsFromSheet)
      })

    const nextTheme = currentTheme === 'default' ? 'dark' : 'default'
    setTheme(nextTheme)
    applyTheme(nextTheme, () => setTheme(nextTheme))
  }

  const handleApiCall = (api) => (e) => {
    e.preventDefault()
    fetch('/.netlify/functions/' + api)
      .then((response) => response.json())
      .then((json) => setMsg({ loading: false, msg: json.msg }))
  }

  const handleApiCallStore = (api) => (e) => {
    e.preventDefault()
    fetch('/.netlify/functions/' + api)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        setMsg({ loading: false, msg: 'json.msg' })
      })
    // .then((json) => setMainColors(json))

    const nextTheme = currentTheme === 'default' ? 'dark' : 'default'
    setTheme(nextTheme)
    applyTheme(nextTheme, () => setTheme(nextTheme))
  }

  // just for testing

  const handlerTest = async () => {
    const sheetKey = 'AIzaSyDEo-oYexMJyI4HVd54-Z2lftwNZ5_BoPE'
    const sheetId = '1ALBBjIigmzQVmGSzvFAYYyElPUshwT5Duhfvt0krgbw'

    const sheetApiGetRows = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchGet?ranges=Styles&majorDimension=ROWS&key=${sheetKey}`

    try {
      const response = await axios.get(`${sheetApiGetRows}`)
      const data = response
      const colorsFromSheet = Object.fromEntries(data.valueRanges[0].values)
      return {
        statusCode: 200,
        body: JSON.stringify({
          msg: colorsFromSheet
        })
      }
    } catch (err) {
      console.log(err) // output to netlify function log
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: err }) // Could be a custom message or object i.e. JSON.stringify(err)
      }
    }
  }

  return (
    <div className='App'>
      <h1>{currentTheme === 'default' ? 'Light theme' : 'Dark theme'}</h1>
      <button onClick={handlerTest}>Test function</button>

      {/* <button onClick={onToggleColors}>Toggle theme</button> */}
      <button onClick={handleApiCallStore('update-variable-store')}>
        {msg.loading ? 'Loading...' : 'Update colors'}
      </button>
      <button onClick={handleApiCall('modified-time')}>
        {msg.loading ? 'Loading...' : 'Call me'}
      </button>
      <p>{msg.msg}</p>
    </div>
  )
}

export default App
