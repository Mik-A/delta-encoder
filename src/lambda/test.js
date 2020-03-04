import axios from 'axios'

export async function handler(event, context) {
  try {
    const params = JSON.parse(event.body)
    const fetchMessage = params.fetchMessage || 'Default message'
    const url = params.url
    console.log('params', params)
    const response = await axios.get(url, {
      headers: { Accept: 'application/json' }
    })
    const data = response.data
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data, fetchMessage, url })
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
