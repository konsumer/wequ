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
    id: [1, 2, 3]
  },

  nor: {
    title: ['Decentralized secondary initiative', 'Configurable asymmetric alliance'],
    stupid: true
  }
}

describe('README', () => {
  it('should be able to work with example in README', () => {
    const q = wequ(queryReadme)

    const results = mock.filter(q)

    // TODO: currently returning no results

    // category should be 2
    expect(results.filter(r => r.category !== 2).length).toBe(0)

    // published should be true
    expect(results.filter(r => r.published !== true).length).toBe(0)

    // preview should be !false
    expect(results.filter(r => r.preview !== false).length).toBe(0)

    // id should be 1 or 2 or 3
    expect(results.filter(r => [1, 2, 3].indexOf(r.id) === -1).length).toBe(0)

    // title should not be in the array or stupid=!true
    expect(results.filter(r => ['Decentralized secondary initiative', 'Configurable asymmetric alliance'].indexOf(r.title) === -1 || r.stupid !== true).length).toBe(0)
  })

  it('should be able to describe the query in the README', () => {
    expect(wdescribe(queryReadme)).toBe('(category = 2) AND (id = 1|2|3) AND (preview != false) AND (preview != undefined)')
  })
})
