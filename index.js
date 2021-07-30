// this is the actual search-engine
export const wequ = ({ and = {}, or = {}, nor = {}, nand = {} }) => {
  const ka = Object.keys(and || {})
  const ko = Object.keys(or || {})
  const kno = Object.keys(nor || {})
  const kna = Object.keys(nand || {})

  // AND: All items must match, query-items cannot be arrays
  const fAnd = (item) => {
    if (ka.length) {
      return ka.every((k) => item[k] === and[k])
    } else {
      return true
    }
  }

  // NAND: All items must not match, query-items can be arrays
  const fNand = (item) => {
    if (kna.length) {
      return kna.every((k) =>
        Array.isArray(nand[k])
          ? nand[k].every((a) => item[k] !== a)
          : item[k] !== nand[k]
      )
    } else {
      return true
    }
  }

  // OR: Any item matching triggers a match, query-items can be arrays
  const fOr = (item) => {
    if (ko.length) {
      return ko.some((k) =>
        Array.isArray(or[k])
          ? or[k].some((a) => item[k] === a)
          : item[k] === or[k]
      )
    } else {
      return true
    }
  }

  // NOR: any item not matching triggers a match, query-items can be arrays
  const fNor = (item) => {
    if (kno.length) {
      return kno.some((k) =>
        Array.isArray(or[k])
          ? nor[k].some((a) => item[k] !== a)
          : item[k] !== nor[k]
      )
    } else {
      return true
    }
  }

  return (item) => fAnd(item) && fNand(item) && fOr(item) && fNor(item)
}

// this is optional, and just returns a nice textual description of a query
export const describe = ({ and = {}, or = {}, nor = {}, nand = {} }) => {
  const ka = Object.keys(and || {})
  const ko = Object.keys(or || {})
  const kno = Object.keys(nor || {})
  const kna = Object.keys(nand || {})

  let out = []

  if (ka.length) {
    out.push(
      Object.keys(and)
        .map((k) => `${k} = ${and[k]}`)
        .join(' AND ')
    )
  }

  if (ko.length) {
    out.push(
      Object.keys(or)
        .map((k) => `${k} = ${Array.isArray(or[k]) ? or[k].join('|') : or[k]}`)
        .join(' OR ')
    )
  }

  if (kna.length) {
    out.push(
      Object.keys(nand)
        .map(
          (k) =>
            `${k} != ${Array.isArray(nand[k]) ? nand[k].join('|') : nand[k]}`
        )
        .join(' AND ')
    )
  }

  if (kno.length) {
    out.push(
      Object.keys(nand)
        .map(
          (k) => `${k} != ${Array.isArray(nor[k]) ? nor[k].join('|') : nor[k]}`
        )
        .join(' OR ')
    )
  }

  return out.map((line) => `(${line})`).join(' AND ')
}
