export let dynamicSort = (property, ignoreCase) => {
  ignoreCase = typeof ignoreCase === 'undefined' ? false : ignoreCase
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

export let findIndexOfId = (id, list) => {
  let index = list.findIndex(element => Number(element.id) === Number(id))
  return index
}

export let retrieveItemById = (id, list) => {
  let index = findIndexOfId(id, list)
  if (index > -1) {
    return list[index]
  } else {
    throw new Error(`No item found matching id: ${id}`)
  }
}

/* takes an updated item, id, and list.                  *
 * overwrites the item in the list with the matching id. *
 * returns the updated list.                             */
export let updateItemById = (update, id, list) => {
  let index = findIndexOfId(id, list)
  if (index > -1) {
    list[index] = update
    return list
  } else {
    throw new Error(`No item found matching id: ${id}`)
  }
}
