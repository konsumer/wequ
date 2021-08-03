#!/usr/bin/env node

const { wequ } = require('./dist/wequ.cjs')
const StreamArray = require('stream-json/streamers/StreamArray')

const { stdin, stdout, argv, exit } = process

if (argv.length < 3) {
  console.error('Usage: cat FILE.json | wequ \'{ your: "query" }\'')
  exit(1)
}

const indentString = str => str.split('\n').map(l => `  ${l}`).join('\n')

// I mean to eval, it's ok sometimes.
// eslint-disable-next-line no-new-func
const query = wequ((new Function('', 'return ' + argv.slice(2).join(' ')))())

let first = true

const out = value => {
  const str = indentString(JSON.stringify(value, null, 2), 2)
  if (first) {
    stdout.write('[\n  ' + str.trim())
    first = false
  } else {
    stdout.write(',' + str.trim())
  }
}

stdin
  .pipe(StreamArray.withParser())
  .on('data', data => query(data.value) && out(data.value))
  .on('end', () => console.log(first ? '[]' : '\n]'))
