export async function handler(event, context) {
  //   const test = 'myxa\n3 o'
  const params = JSON.parse(event.body)
  const text = params.text

  const arr = text.split('\n') // make array with help of line break :D
  const result = []

  for (let i = 0; i < arr.length; i++) {
    const currElement = arr[i]
    let prevElement = arr[i - 1] ? arr[i - 1] : null

    const deltaNrSeparatorIndex = currElement.indexOf(' ', 0)
    const deltaValue = Number(currElement.substring(0, deltaNrSeparatorIndex))

    if (!prevElement) {
      result.push(currElement.substring(deltaNrSeparatorIndex + 1))
    }
    if (prevElement) {
      result.push(
        result[i - 1].substring(0, deltaValue) +
          currElement.substring(deltaNrSeparatorIndex + 1)
      )
    }
  }
  const decodedText = result.join('\n')
  const previewText = 'Excerpt from decoded text: ' + text.slice(0, 280) + '...'

  return {
    statusCode: 200,
    body: JSON.stringify({ msg: previewText, text, decodedText })
  }
}
