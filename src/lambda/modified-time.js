import axios from "axios"


export const handler = async () => {
  const sheetId = process.env.NODE_ENV_SHEET_ID
  const driveApiKey = process.env.NODE_ENV_API_KEY_DRIVE
  // SOME STUPID CACHING ON GOOGLES SIDE. DOES NOT UPDATE ALL/REAL TIME, CHANGES
  const driveApi = `https://www.googleapis.com/drive/v3/files/${sheetId}?key=${driveApiKey}&fields=modifiedTime`
    try {
      const response = await axios.get(`${driveApi}`)
      const data = new Date(response.data.modifiedTime)
      return {
        statusCode: 200,
        body: JSON.stringify({ msg: data })
      }
    } catch (err) {
      console.log(err) // output to netlify function log
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
      }
    }
  }
