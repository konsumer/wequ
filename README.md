# wequ

A logical-operator-style array-searching utility.

Short for "want everything query". Pronounced like "we koo".

<img src="./logo.jpg" alt="now we cool bro (picture of dog with sunglasses)" align="right" />

# WIP

It's not ready for use, yet. I am still working on it.


## features

- It's stupid-fast
- It's stupid-simple
- pre-compute queries-functions for slight speedup


## usage

The basic usage of wequ goes like this:

```js
// category should be 2 and published should be true
// in addition to and clause, it should also preview should be false
// instead of and/nand/nor clause, id could be 1 or 2 or 3
// instead of and/nand/or clause, title could not be those titles or stupid could be false to trigger a match
// pre-compute your query-function as q for a tiny speedup, when used in multiple places
const q = wequ({
  and: {
    category: 2,
    published: true
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



