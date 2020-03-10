# Aito.ai Delta encoder/decoder UI

download the repo and run
`npm i` then `ntl dev`

Just try it. If you run in to problems please try the CLI app with description below. You are also very wellcome to contact me!

There is also a live version at:
https://mik-a-delta-encoder.netlify.com/

# Aito.ai Delta encoder/decoder CLI

This description is for using the node app in the command line (Console/Terminal)

## Prerequisites

install Node.js - https://nodejs.org/en/download/

You need to know how to use a command line interface

## Getting Started

Clone or download the app from

https://github.com/Mik-A/delta-encoder

### Installing

run `npm install` in the directory of the app

to start the a server run `npx serve`. The server should start at port 5000

-- Navigate to /cli/ to run node functions --

#### There are two commands with obligatory and optional flags

```console
node compress file <filename or remote host>
```

Using local files need flag local with property y.

```console
local y
```

Optional flag - output FILENAME

#### Example

```console
node compress file https://raw.githubusercontent.com/dwyl/english-words/master/words.txt output myEncodedFile.txt
```

### Decoding / Decompressing

```console
node decompress file myEncodedFile.txt output myReadableFile.txt local y
```

## Author

- **Mika Välimäki** - [GitHub profile](https://github.com/Mik-A)
- **Phone** - [+358 50 4088 201](+358504088201)
- **Mika Välimäki** - [LinkedIn](https://www.linkedin.com/in/mika-v%C3%A4lim%C3%A4ki/)

# INFO ABOUT THE APP DEV STATE

Flags could use common naming conventions with shorthand and long version.

ie. --file / -f

Automatic detection of server port would be convenient.

...and a various other small improvements :)
