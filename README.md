# wequ

<img src="https://github.com/konsumer/wequ/raw/main/logo.jpg" alt="now we cool bro (picture of dog with sunglasses)" align="right" />

[![npm version](https://badge.fury.io/js/wequ.svg)](https://badge.fury.io/js/wequ)

A logical-operator-style array-searching utility.

Short for "We Query". Pronounced like "we koo".


## features

- It's stupid-fast - it turns a nice query object into a function that performs series of logical comparisons (the fastest way to match a query)
- It's stupid-simple - I mean I think it's easier to follow than regular filter functions, especially if they are complicated
- it's tiny - `641B` gzipped, for web-build, and under 600B for the 2 different node-side versions (commonjs and mjs.) That is nutso. I got dog-pictures bigger than that (the one on this page is almost 100X bigger.)
- pre-compute queries-functions for slight speedup (especially if you run it in multiple places)
- It has a `describe` function that outputs the string of an ES6 function, so you can see how it works, more easily
- even people who hate javascript or just aren't javascript programmers can use it daily, via an easy CLI util.


## library

The basic usage of wequ goes like this:

```js

// this is a query
const query = {
  published: true,

  and: {
    category: 2
  },
  
  nand: {
    preview: false
  },

  or: {
    id: [1, 2, 3]
  },

  nor: {
    title: ["Decentralized secondary initiative", "Configurable asymmetric alliance"],
    stupid: true
  }
}

// this will describe the query as an ES6 function, so you can troubleshoot or just read it in another form
console.log(describe(query))

// pre-compute the query-function for use in other things
const q = wequ(query)

// honestly, this is pretty similar to describe(), but with a more laid-back ES5 chillwave vibe:
console.log(q.toString())

// get all the items that match the query
const subset = bigArrayOfObjects.filter(q)

// get the first item that matches the query
const single = bigArrayOfObjects.find(q)

// get an array of true/false for every record
const report = bigArrayOfObjects.map(q)

// get a true/false if every item matches your query
const report = bigArrayOfObjects.every(q)

// get a true/false if any of your items match your query
const report = bigArrayOfObjects.some(q)
```

Generally, I find it most useful to `a.filter(q)` for "get all matches" and `a.find(q)` for "get first match"

Any fields other than `and|or|nor|nand` in the top-level are merged into `and`. This allows for quick `and` queries for a few fields.


## cli

It can also work as a CLI tool:

```
cat file.json | wequ '{ title: "COOL" }'
```

The syntax is javascript, in a string. stdin data should be JSON.

### installation

Install the CLI tool a few ways:

- Grab a ready-built CLI tool from [the releases](https://github.com/konsumer/wequ/releases). No node or other dev-tools needed.
- Install globally with `npm i -g wequ` and it will be in your path
- Use npx for 0-install: `npx wequ`

## library

You can get the `wequ` and `describe` functions, from above, in a few ways, depending on how you are doing things.

### browser script tag

Kick it oldschool, for a quick demo:

```html
<script src="https://unpkg.com/wequ"></script>
```

This adds `window.wequ`, which has `wequ()` and `describe()` in it.

### browser modules

You can use es6 modules in modern browsers.

```html
<script type="module">
import { wequ, describe } from 'https://unpkg.com/wequ@latest/dist/wequ.module.js'
</script>
```

Or with [sick new import-maps](https://github.com/WICG/import-maps):

```html
<script type="importmap">
{
  "imports": {
    "wequ": "https://unpkg.com/wequ@latest/dist/wequ.module.js"
  }
}
</script>
<script type="module">
import { wequ, describe } from 'wequ'
</script>
```

These are pretty new features, but if you want them in your old-browser-supporting-projects try [a polyfill](https://github.com/guybedford/es-module-shims). It doesn't add too much overhead, and the syntax is the wave of the future. 

### node

Intall it in your project:

```sh
npm i wequ
```

It works with older commonjs style:

```js
const { wequ, describe } = require('wequ')
```

or ES6 module:

```js
import { wequ, describe } from 'wequ'
```

### deno

```js
import { wequ, describe } from 'https://unpkg.com/wequ@latest/dist/wequ.module.js'
```


## development

This is mostly just notes for myself.

To release, just tag with a version and push, and [CI](https://github.com/konsumer/wequ/blob/main/.github/workflows/publish.yml) will do the rest.

```sh
npm version path && git push --mirror
```
