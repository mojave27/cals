export let dynamicSort = (property, ignoreCase) => {
  ignoreCase = (typeof ignoreCase === 'undefined') ? false : ignoreCase
  var sortOrder = 1
  if (property[0] === '-') {
    sortOrder = -1
    property = property.substr(1)
  }
  return function(a, b) {
    let aProp = ignoreCase ? a[property].toLowerCase() : a[property]
    let bProp = ignoreCase ? b[property].toLowerCase() : b[property]
    var result = aProp < bProp ? -1 : aProp > bProp ? 1 : 0
    return result * sortOrder
  }
}