import axios from 'axios'

export const handler = async () => {
  let sheetId = process.env.NODE_ENV_SHEET_ID
  let driveApiKey = process.env.NODE_ENV_API_KEY_DRIVE
  let sheetKey = process.env.NODE_ENV_API_KEY_SHEET
  // NODE_ENV_API_KEY_SHEET=AIzaSyDEo-oYexMJyI4HVd54-Z2lftwNZ5_BoPE
  // NODE_ENV_API_KEY_DRIVE=AIzaSyDPjhJ03yNynLS2rdEmYQzIyXTPNH5wO0I
  // NODE_ENV_SHEET_ID=1ALBBjIigmzQVmGSzvFAYYyElPUshwT5Duhfvt0krgbw
  sheetKey = 'AIzaSyDEo-oYexMJyI4HVd54-Z2lftwNZ5_BoPE'
  sheetId = '1ALBBjIigmzQVmGSzvFAYYyElPUshwT5Duhfvt0krgbw'
  driveApiKey = 'AIzaSyDPjhJ03yNynLS2rdEmYQzIyXTPNH5wO0I'

  // SOME STUPID CACHING ON GOOGLES SIDE. DOES NOT UPDATE ALL/REAL TIME, CHANGES
  const driveApi = `https://www.googleapis.com/drive/v3/files/${sheetId}?key=${driveApiKey}&fields=modifiedTime`
  const sheetApiGetRows = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchGet?ranges=Styles&majorDimension=ROWS&key=${sheetKey}`

  try {
    const response = await axios.get(`${sheetApiGetRows}`)
    const data = response
    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: Object.entries(data).length > 0 ? data : 'empty response'
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

// import axios from "axios"

// export async function handler(event, context) {
//         // const sheetId = process.env.NODE_ENV_SHEET_ID
//     // const sheetKey = process.env.NODE_ENV_API_KEY_SHEET
//     const sheetKey = 'AIzaSyDEo-oYexMJyI4HVd54-Z2lftwNZ5_BoPE'
//     const sheetId = "1ALBBjIigmzQVmGSzvFAYYyElPUshwT5Duhfvt0krgbw"
//     const sheetApiGetRows =  `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchGet?ranges=Styles&majorDimension=ROWS&key=${sheetKey}`

//   try {
//     const response = await axios.get(sheetApiGetRows)
//     const data = response
//     const colorsFromSheet = Object.fromEntries(data.valueRanges[0].values);

//     return {
//       statusCode: 200,
//       body: JSON.stringify({ msg:colorsFromSheet })
//     }
//   } catch (err) {
//     console.log(err) // output to netlify function log
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
//     }
//   }
// }

// export const handler = () => {
//     // const sheetId = process.env.NODE_ENV_SHEET_ID
//     // const sheetKey = process.env.NODE_ENV_API_KEY_SHEET
//     const sheetKey = 'AIzaSyDEo-oYexMJyI4HVd54-Z2lftwNZ5_BoPE'
//     const sheetId = "1ALBBjIigmzQVmGSzvFAYYyElPUshwT5Duhfvt0krgbw"

//     const sheetApiGetRows =  `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchGet?ranges=Styles&majorDimension=ROWS&key=${sheetKey}`

//     fetch(sheetApiGetRows)
//     .then((response) => {
//     return response.json();
//   })
//   .then((myJson) => {
//     const colorsFromSheet = Object.fromEntries(myJson.valueRanges[0].values);
//     return {
//         statusCode: 200,
//         body: JSON.stringify({ var: colorsFromSheet })
//       }
//   })
// }
