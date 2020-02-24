import { GoogleSpreadsheet } from 'google-spreadsheet'
// const { isColor } = require('is-color')

export async function handler(event, context, callback) {
  const SPREADSHEET_ID = process.env.NODE_ENV_SHEET_ID
  const GOOGLE_SERVICE_ACCOUNT_EMAIL =
    process.env.NODE_ENV_GOOGLE_SERVICE_ACCOUNT_EMAIL
  const GOOGLE_PRIVATE_KEY =
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDkEqZBH3mO0fbS\nWbumgXxHqmMKQbC//c21zCm1TsfXurbB8diMmR1nWiQ/BGT6q5ol/PzEocpzQKZq\n9fRE5zM9fcQxALcdImF/tjl7RUEZOLf1qGn6bvVQeBw1a8Oex3aFwm6miGiubQ+v\ne9GbM12CAx6cTAXFa4iffPdbx/UENkcDg5xcYM/09vXbmNmYbLMInvz+0RrEQoKZ\nHRdxMSu3O5zotiOWmmsPJc5K0woLR80O+pJUfwd7p+mDDSqdMkpB/8tGdU7N7GGV\nP/faypHo1vRB3EbIGZSuYXgtyqO6ee/eWgYpT24Ly8HeNZiWgYxx5xO0npL2YnY5\n/mbyb3ZZAgMBAAECggEAB2VD6xtvTIZqMaS7gSEUg7nmk4HxDm63VZBw30pWUFxj\neftCxX9fDNeHUpxMvnSjT11KYIFrEEztwIzobnYNSy6JdrnSVkFjxjmFWGYU3/Gf\nBHohMp/XuFPmvUQ48AyBf0GgZynH9DUA49S45aaXHwTFILYV31KW9+38UudzXl8p\nApjFwy0l3AKMfYdNyuUblZdFC+TmooSq7AwCIZQ8bCQf+g9Ke7+3WKZBFKVJtyiH\nDo9YZU8XGUuhitkGIgjURNLxx8IQnQlvhW5U0/S3mhBzul3lKQxhJ1VqFfrX/1AT\nAv3MPRQI5El9uDlZwwnsJVm18Ilv4nMVPXuZk06nMQKBgQD9tWHllPMyGkE8676b\nma84kPG2y+lYs/96lG7EbUL7Xmw/840lutBWmphRwqXoq95B1/a3ZCMCA0jWDCrE\n4ZycfkrTGB7ue6lb63qzdV1hLUAw7H86cUze6cnaQ+Hf/5mpxIkgyylOFqGZHqmZ\nNiBy9Ym/fh5Ey9usES/tsMxucQKBgQDmIf4xt9qhvD5fh1R9LzGMJtVTq8geKuh3\nC3NKb9Yn/U/xll5Gx4Ms+IIimlocLycFo/S6Mw2BXZnOdNfzExdGqM2EMge6pELs\nvkg9czL4K96VlEK9HGpMEM6tqXhBIPH5Fi4L+efJ4LrpCtP9w3frkkatT54dTT0t\nvqMhQQHKaQKBgBm2ck+EQwmG46m68rxuXPXMqtKt495bj77qoDdEI4+6SBpLIrj6\nL/c2/8z5fzsPgB0IODbp7SpdDtqyrPr7KpYproeqYCgnXEi2mt7pPCeHIIRU06gm\np3XIF+8JBjFfhEFSa9to+6ywWnxcQTAH7k34WJeRvpuWVZMgwszCKFXhAoGBAMR+\nH8EpvwY7aXI9ZXlhk0ecXKcNVFfVwRjr8OuMo+kPE3QuNJ7weOMr6ElNS0UnSYU6\nYZmeP5jGZ63s+/mywjv1o0yNPyYwXGgxbBLzyoA1TN6gcX9wxJ3f9+g1e9T4IULR\nmk1lenBXbp/OPAU/IaRFCA2wnktciLEHRdf93l6JAoGAWMC0Nhy3diJHJMBLtqjO\nv8yQcBOq9lwk9TGtYgaYgB3gKDbpFVzNqw9o9b0yBijQNHuByR4EI9PnaSC+gaUP\nniq97pQTNfRxbbX8E+iEQZjhUTkDC4KyR9PycpG5dUKUENoZZwdMoDn/6+BNFuFs\n4ql3diDSp2w615D0ls9fvlM=\n-----END PRIVATE KEY-----\n'

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
