// this is the actual search-engine
export const fnBody = ({ and = {}, or = {}, nor = {}, nand = {}, ...restAnd }) => {
  const queries = [{ ...and, ...restAnd }, or, nor, nand]
  const keys = queries.map(a => Object.keys(a || {}))
  const joins = ['&&', '||', '||', '&&']
  const totalLength = keys.reduce((a, c) => a + c.length, 0)

  // no query? just return a function that returns true
  if (!totalLength) {
    return 'true'
  }

  return keys.map((k, i) => {
    const join = joins[i]
    const op = i > 1 ? '!==' : '==='
    if (k.length) {
      const inside = k.map(key => {
        if (Array.isArray(queries[i][key])) {
          return queries[i][key].map(val => ` r[${JSON.stringify(key)}] ${op} ${JSON.stringify(val)} `).join(` ${join} `)
        } else {
          return `r[${JSON.stringify(key)}] ${op} ${JSON.stringify(queries[i][key])}`
        }
      })
      return `( ${inside.join(` ${join} `)} )`
    } else {
      return false
    }
  })
    .filter(f => f)
    .join(' && ')
}

// this returns a filter function for the query
export const wequ = (query = {}) => Function('r', 'return ' + fnBody(query))

// this returns an ES6 syntax function, as a string, so you can troubleshoot
export const describe = (query = {}) => `r => ${fnBody(query)}`
