#!/usr/bin/env node

const { wequ } = require('./dist/wequ.cjs')

const { stdin, argv, exit } = process

// wrapper that will output JSON or colored depending on how it's being piped
const json = process.stdout.isTTY ? s => console.dir(s, { depth: null, colors: true, maxArrayLength: null, maxStringLength: null }) : s => console.log(JSON.stringify(s, null, 2))

if (argv.length < 3) {
  console.error('Usage: cat FILE.json | wequ \'{ your: "query" }\'')
  exit(1)
}

// I mean to eval, it's ok sometimes.
// eslint-disable-next-line no-new-func
const query = (new Function('', 'return ' + argv.slice(2).join(' ')))()

let inputChunks = Buffer.from([])

stdin.resume()
stdin.setEncoding('utf8')

stdin.on('data', chunk => {
  inputChunks = Buffer.concat([inputChunks, Buffer.from(chunk)])
})

stdin.on('end', chunk => {
  const q = wequ(query)
  const d = JSON.parse(inputChunks.toString('utf8'))
  json(d.filter(q))
})
