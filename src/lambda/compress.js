const axios = require('axios')
const fs = require('fs')

const bColors = {
  // move to own file
  Reset: '\x1b[0m',
  OKBLUE: '\x1b[34m',
  OKGREEN: '\x1b[32m',
  FAIL: '\x1b[35m'
}

const { FAIL, OKGREEN, OKBLUE, Reset } = bColors

const tuples = [] // we need to make ojects from array pair. this way is easiest :)
const args = process.argv.slice(2)

for (let i = 0; i < args.length; i += 2) {
  tuples.push(args.slice(i, i + 2))
}

const argsObj = Object.fromEntries(tuples)
const { file, output, local } = argsObj

const localHost = local == 'y' ? 'http://localhost:5000/' : ''

const outputDefault = 'compressedFile.txt'

function findIndex(a, b) {
  // helper function to find first differing character (index of the char)
  let i = 0
  if (a === b) return -1
  while (a[i] === b[i]) i++
  return i
}

let textToCompress = ''
let result = ''
const handler = (text) => {
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
  fs.writeFile(output ? output : outputDefault, result, function(err) {
    if (err) throw err
    console.log(
      `${OKBLUE}Encoded file is saved as ${output || outputDefault}\n${Reset}`
    )
  })
}
const getFile = async (file) => {
  if (!file) {
    console.log(`${FAIL}Please pass arguments!\n
    ${OKBLUE}ARGUMENTS: file <remote file> output <nameOfCompressedFile.txt> \n
    ${OKGREEN}example: node compress file https://raw.githubusercontent.com/dwyl/english-words/master/words.txt \n
    ouput file name is optional. Default ouput file name: ${outputDefault}
    ${Reset}`)
    return null
  }
  try {
    const data = await axios.get(`${localHost}${file}`)
    textToCompress = data.data
    //   fs.writeFile('largeText.txt', textToCompress, function(err){ // if we want to save the original as a file on computer
    //     if (err) throw err;
    //     console.log(`original is saved as ${original}\n`)
    //    });
    handler(textToCompress)
  } catch (error) {
    console.error(FAIL + error.message, '\nPlese check your arguments')
  }
}

getFile(file)
