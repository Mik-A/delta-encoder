import axios from 'axios'
import fs from 'fs'

export async function handler(event, context) {
  const bColors = {
    // move to own file
    Reset: '\x1b[0m',
    OKBLUE: '\x1b[34m',
    OKGREEN: '\x1b[32m',
    FAIL: '\x1b[35m'
  }

  const { FAIL, OKGREEN, OKBLUE, Reset } = bColors

  try {
    const params = JSON.parse(event.body) // coming from frontend
    const fetchMessage =
      params.fetchMessage || 'Test, this text should not be in params'
    const url = params.url

    const response = await axios.get(url, {
      // fetching the url
      headers: { Accept: 'application/json' }
    })
    const data = response.data
    const previewText = 'Excerpt from original: ' + data.slice(0, 280) + '...'
    const text = data

    // compressing the text and saving it in file
    const outputDefault =
      'compressedFile_' +
      Math.random()
        .toString(36)
        .substr(2, 9) +
      '.txt'

    function findIndex(a, b) {
      // helper function to find first differing character (index of the char)
      let i = 0
      if (a === b) return -1
      while (a[i] === b[i]) i++
      return i
    }

    // let textToCompress = ''
    let result = ''
    const arr = text.split('\n') // we go with strings from beginning to end
    let diff = [] // the number part is coming here
    arr.forEach((x, i) => {
      // This function/loop finds the index of the first differing character comapred to previous word
      const nextString = arr[i + 1] ? arr[i + 1] : null
      diff.push(!nextString ? 0 : findIndex(x, nextString)) // We define the first word to be 0 (cause it aint have no previous wordahs)
    })
    diff.unshift(diff.pop()) // because the push leaves the first to last we move it back to first in the array. We could choose to have a if this n that instead

    result = diff
      .map((x, i) => x + ' ' + arr[i].substr(x, arr.length - 1))
      .join('\n')
    // const buf = Buffer.from(result, 'utf8')
    // console.log('buf', buf)
    // result is the compressed/encoded text as an string with line breaks
    const encoded = result

    // fs.writeFile('lib/encoded/' + outputDefault, encoded, function(err) {
    //   if (err) throw err
    //   console.log(
    //     `${OKBLUE}Encoded file is saved as ${outputDefault}\n${Reset}`
    //   )
    // })

    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: previewText,
        fetchMessage,
        url,
        fileName: outputDefault,
        encoded
      })
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: 'Please chek your url! ' + err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
