const isEqual = (x, y) =>
  JSON.stringify(Object.entries(x).sort((a, b) => a - b)) ===
  JSON.stringify(Object.entries(y).sort((a, b) => a - b))

// Example of usage
// const obj1 = { a: 'aa', b: 'bb' }
// const obj2 = { a: 'aa', b: 'bb' }

// isEqual(obj1, obj2)
