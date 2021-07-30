#!/usr/bin/env node

const { wequ, describe } = require('./dist/wequ.cjs')

const { stdin, stdout, argv, exit } = process

if (argv.length < 3) {
  console.error(`Usage: cat FILE.json | wequ '{ your: "query" }'`)
  exit(1)
}

const query = (new Function('', 'return ' + argv.slice(2).join(' ')))()

console.log(describe((new Function('', 'return ' + argv.slice(2).join(' ')))()))

let inputChunks = Buffer.from([])

stdin.resume()
stdin.setEncoding('utf8')

stdin.on('data', chunk => {
  inputChunks = Buffer.concat([inputChunks, Buffer.from(chunk)])
})

stdin.on('end', chunk => {
  const q = wequ(query)
  const d = JSON.parse(inputChunks.toString('utf8'))
  console.log(JSON.stringify(d.filter(q), null, 2))
})
