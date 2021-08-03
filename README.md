# wequ

<img src="https://github.com/konsumer/wequ/raw/main/logo.jpg" alt="now we cool bro (picture of dog with sunglasses)" align="right" />

[![npm version](https://badge.fury.io/js/wequ.svg)](https://badge.fury.io/js/wequ)

A logical-operator-style array-searching utility.

Short for "We Query". Pronounced like "we koo".


## features

- It's stupid-fast - it turns a nice query object into a function that performs series of logical comparisons (the fastest way to match a query)
- It's stupid-simple - I mean I think it's easier to follow than regular filter functions, especially if they are complicated
- it's tiny - `641B` gzipped, for web-build, and under `600B` for the 2 different node-side versions (commonjs and mjs.) That is nutso. I got dog-pictures bigger than that (the one on this page is almost 100X bigger.)
- pre-compute queries-functions for slight speedup (especially if you run it in multiple places)
- It has a `describe` function that outputs the string of an ES6 function, so you can see how it works, more easily
- use it in an easy-to-install CLI util (no nodejs needed) that is streaming (any length is cool in a unix-pipe!)
- use it direclty in the browser, if you want
- use it in nodejs


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
    id: [0, 1, 2, 3]
  },

  nor: {
    title: ['Bad', 'No'],
    stupid: true
  }
}

// this will describe the query as an ES6 function, so you can troubleshoot or just read it in another form
console.log(describe(query))

// pre-compute the query-function for use in other things
const q = wequ(query)

// honestly, this is pretty similar to describe(), but with a more laid-back ES5 chillwave type of vibe:
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

Any fields other than `and|or|nor|nand` in the top-level are merged into `and`. This allows for quick `and` queries for a few fields, which is my most common use-case.

It might take a second to get used to it, but each keyword is about the relationship with the fields have to each other, like "if it's this or that or that" or "if this field is this and this other field is this". `nand` and `nor` are the same but "not matches" so `nor` is "this is not this or this other thing is not this" `nand` is "this is not this and this other thing is not this".

Using `describe` you will discover the function the query above generates is like this:

```js
r => (
     ( r["category"] === 2 && r["published"] === true )
  && ( r["id"] === 0 || r["id"] === 1 || r["id"] === 2 || r["id"] === 3 )
  && ( r["title"] !== "Bad" || r["title"] !== "No" || r["stupid"] !== true )
  && ( r["preview"] !== false )
)
```

This is maybe a bit harder to read & maintain.

## cli

I love [jq](https://stedolan.github.io/jq/), but the syntax can be a little complicated to get what you need, especially with escaping and stuff. I made the wequ CLI to address this, so I don't need to lookup syntax, I can just do what I do all over:

```sh
cat file.json | wequ '{ title: "COOL" }'
```

or

```sh
wequ '{ title: "COOL" }' < file.json
```

The syntax is regular javascript, in a string. `stdin` data should be a JSON array of objects, so you might still need [jq](https://stedolan.github.io/jq/) to turn it into that.


If you do want to get super-jiggy with it, but just like js syntax better than jq:

```sh
wequ '{ [ (new Date()).getMonth() + 1 ]: "COOL" }' < file.json
```

to find an object with the current month-number as a key, set to `"COOL"`.

or the other way:

```sh
wequ '{ month: (new Date()).getMonth() + 1 }' < file.json
```

to find records with `month` set to the current month-number.


You can `require` any installed npm-module (in node_modules in current directory) and do whatever nutso thing you want, in there.

> Remember it's building a query-object, so dynamic field-names need to be in square-brackets


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

Install it in your project:

```sh
npm i wequ
```

It works with older commonjs style:

```js
const { wequ, describe } = require('wequ')
```

or ES6 module (`type: module` or some sort of builder):

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
npm version patch && git push --mirror
```
