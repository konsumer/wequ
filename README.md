# wequ

<img src="./logo.jpg" alt="now we cool bro (picture of dog with sunglasses)" align="right" />

A logical-operator-style array-searching utility.

Short for "want everything query". Pronounced like "we koo".

# WIP

It's not ready for use, yet. I am still working on it.


## features

- It's stupid-fast
- It's stupid-simple
- pre-compute queries-functions for slight speedup


## usage

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

These are served workds: `and`, `or`, `not`. Don't name your fields this.

