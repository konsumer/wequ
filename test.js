/* global describe, it, expect */

import { wequ, describe as wdescribe } from './index.js'
import mock from './mock.json'

const queryReadme = {
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

// this is what the function looks like
const description = `r => (
       ( r["category"] === 2 && r["published"] === true )
  &&   ( r["id"] === 0 || r["id"] === 1 || r["id"] === 2 || r["id"] === 3 )
  &&   ( r["title"] !== "Bad" || r["title"] !== "No" || r["stupid"] !== true )
  &&   ( r["preview"] !== false )
)`

describe('README', () => {
  it('should be able to work with example in README', () => {
    const q = wequ(queryReadme)

    const results = mock.filter(q)

    // I created 1 record that will match
    expect(results.length).toBe(1)

    // a lot of dopuble-negatives below, but basically I filter the results looking for the opposite of each clause, then check the length, which should be 0

    // category should be 2
    expect(results.filter(r => r.category !== 2).length).toBe(0)

    // published should be true
    expect(results.filter(r => r.published !== true).length).toBe(0)

    // preview should be !false
    expect(results.filter(r => r.preview !== !false).length).toBe(0)

    // id should be 1 or 2 or 3
    expect(results.filter(r => [1, 2, 3].indexOf(r.id) !== -1).length).toBe(0)

    // title should not be in the array or stupid=!true
    expect(results.filter(r => ['Bad', 'No'].indexOf(r.title) !== -1 || r.stupid !== !true).length).toBe(0)
  })

  it('should be able to describe the query in the README', () => {
    expect(wdescribe(queryReadme)).toBe(description)
  })
})
