module.exports = rows => rows.map(row => {
  const parsed = {}
  for (const key in row) {
    const camelCase = key.replace(/([-_][a-z])/ig, $1 => $1.toUpperCase().replace('_', ''))
    parsed[camelCase] = row[key]
  }
  return parsed
})