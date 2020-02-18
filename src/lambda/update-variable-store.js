import axios from "axios"


export const handler =  () => {
  const sheetId = process.env.NODE_ENV_SHEET_ID
  const sheetKey = process.env.NODE_ENV_API_KEY_SHEET

  const sheetApiGetRows =  `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchGet?ranges=Styles&majorDimension=ROWS&key=${sheetKey}`

  fetch(sheetApiGetRows)
  .then((response) => {
  return response.json();
})
.then((myJson) => {
  const colorsFromSheet = Object.fromEntries(myJson.valueRanges[0].values);
  return {
    statusCode: 200,
    body: JSON.stringify({ var: colorsFromSheet })
  }
}