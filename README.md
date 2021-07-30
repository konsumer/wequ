# wequ

<img src="https://github.com/konsumer/wequ/raw/main/logo.jpg" alt="now we cool bro (picture of dog with sunglasses)" align="right" />

[![npm version](https://badge.fury.io/js/wequ.svg)](https://badge.fury.io/js/wequ)

A logical-operator-style array-searching utility.

Short for "We Query". Pronounced like "we koo".


## features

- It's stupid-fast - it turns a nice query object into a function that performs series of logical comparisons (the fastest way to match a query)
- It's stupid-simple - I mean I think it's easier to follow than regular filter functions, especially if they are complicated
- pre-compute queries-functions for slight speedup (especially if you run it in multiple places)
- It has a `describe` function that outputs the string of an ES6 function, so you can see how it works, easily

## library

The basic usage of wequ goes like this:

```js
const q = wequ({
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
})

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

Any fields other than `and|or|nor|nand` in the top-level are merged into `and`. This allows for quick `and` queries for a few fields.

## cli

It can also work as a CLI tool:

```
cat file.json | wequ '{ title: "COOL" }'
```

The syntax is javascript, in a string. stdin data should be JSON.

### installation

Install the CLI tool a few ways:

- Grab a ready-built CLI tool form [the releases](https://github.com/konsumer/wequ/releases). No node or other dev-tools needed.
- Install globally with `npm i -g wequ` and it will be in your path
- Use npx for 0-install: `npx wequ`