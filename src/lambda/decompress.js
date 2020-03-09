const axios = require('axios')
const fs = require('fs')

// var http = require('http');//create a server object:
// http.createServer(function (req, res) {
//   res.write('Hello World!'); //write a response
//   res.end(); //end the response
// }).listen(3000, function(){
//  console.log("server start at port 3000"); //the server object listens on port 3000
// });

const consoleColors = { // move to own file
    OKBLUE: '\033[94m',
    OKGREEN: '\033[92m',
    FAIL: '\033[91m',
    Reset: "\x1b[0m"
}

const {
    FAIL,
    OKGREEN,
    OKBLUE,
    Reset
} = consoleColors

const tuples = []
const args = process.argv.slice(2); // first args are node and js file name. We don't want them

// we need to make ojects from array pair. this way is easiest :) ps. this is for arguments passed in the command line
for (let i = 0; i < args.length; i += 2) {
    tuples.push(args
        .slice(i, i + 2));
}

const argsObj = Object.fromEntries(tuples)
const {
    file,
    output
} = argsObj
const outputDefault = 'decodedFile.txt'

let textToDecode = ''
const handler = (text) => {

    const arr = text.split('\n') // make array with help of line break :D
    const result = []
    for (let i = 0; i < arr.length; i++) {
        const currElement = arr[i];
        let prevElement = arr[i - 1] ? arr[i - 1] : null

        const deltaNrSeparatorIndex = currElement.indexOf(' ', 0)
        const deltaValue = Number(currElement.substring(0, deltaNrSeparatorIndex))

        if (!prevElement) {
            result.push(currElement.substring(deltaNrSeparatorIndex + 1))
        }
        if (prevElement) {
            result.push(result[i-1].substring(0, deltaValue)+currElement.substring(deltaNrSeparatorIndex + 1))
        }
    }
    const decodedText = result.join('\n')
    fs.writeFile(output ? output : outputDefault, decodedText, function (err) {
        if (err) throw err;
        console.log(`${OKBLUE}Decoded file is saved as ${output || outputDefault}\n${Reset}`)
    });
}

const getFile = async (file) => {
    if (!file) {
        console.log(`${FAIL}Please pass arguments!\n
    ${OKBLUE}ARGUMENTS: file <remote file> output <nameOfCompressedFile.txt> \n
    example:${OKGREEN} node decode file encodedFile.txt \n
    ouput file name is optional. Default ouput file name: ${outputDefault}
    ${Reset}`);
        return null
    }
    try {
        const data = await axios.get(`http://localhost:5000/${file}`)
        textToDecode = data.data
        //   fs.writeFile('largeText.txt', textToCompress, function(err){ // if we want to save the original as a file on computer / server
        //     if (err) throw err;
        //     console.log(`original is saved as ${original}\n`)
        //    });
        handler(textToDecode) // we start the decompressing function
    } catch (error) {
        console.error(FAIL + error.message, '\nPlease check your arguments')
    }
}

getFile(file) // we have passed the file name as an argument (file) when we run the node app from console/terminal