import { GoogleSpreadsheet } from 'google-spreadsheet'
// const { isColor } = require('is-color')

export async function handler(event, context, callback) {
  // // Identifying which document we'll be accessing/reading from
  const SPREADSHEET_ID = process.env.NODE_ENV_SHEET_ID
  const GOOGLE_SERVICE_ACCOUNT_EMAIL =
    process.env.NODE_ENV_GOOGLE_SERVICE_ACCOUNT_EMAIL
  const GOOGLE_PRIVATE_KEY = process.env.NODE_ENV_GOOGLE_PRIVATE_KEY

  // spreadsheet key is the long id in the sheets URL
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID)
  // use service account creds
  await doc.useServiceAccountAuth({
    client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: GOOGLE_PRIVATE_KEY
  })
  // OR load directly from json file if not in secure environment
  // await doc.useServiceAccountAuth(creds)
  // OR use API key -- only for read-only access to public sheets
  // doc.useApiKey('YOUR-API-KEY');
  await doc.loadInfo() // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[0]
  await sheet.loadCells('A1:Z13') // loads a range of cells
  // console.log(sheet.cellStats)
  // can pass in { limit, offset }
  // read/write row values
  const rows = await sheet.getRows()
  const obj = rows.map((row) => {
    // const value = isColor(row.value) ? row.value : 'currenColor'
    return [row.name, row.value]
  })
  const cssVariables = Object.fromEntries(obj)
  // const title = doc.title
  const res = {
    statusCode: 200,
    body: JSON.stringify({ msg: 'upd', cssVariables })
  }
  return res
}
