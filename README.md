# Aito.ai Delta encoder/decoder CLI

This description is for using the node app in the command line (Console/Terminal)

## Prerequisites

install Node.js - https://nodejs.org/en/download/

You need to know how to use a command line interface

## Getting Started

Clone or download the app from

https://github.com/Mik-A/aito-delta

### Installing

run `npm install` in the directory of the app

run `npx serve`

To start the a server. The server should start at port 5000

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
node decode file myEncodedFile.txt output myReadableFile.txt local y
```

## Author

- **Mika Välimäki** - [GitHub profile](https://github.com/Mik-A)
- **Phone** - [+358 50 4088 201](+358504088201)
- **Mika Välimäki** - [LinkedIn](https://www.linkedin.com/in/mika-v%C3%A4lim%C3%A4ki/)

# INFO ABOUT THE APP DEV STATE

For production there shoud be better naming convention. No mixing of compressing and encoding. Use only on concept!

Flags could use common naming conventions with shorthand and long version.

ie. --file / -f

Automatic detection of server port would be convenient.

...and a various other small improvements :)
