const dynamicSort = (property, ignoreCase) => {
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

const sortByStringProperty = (arrayOfObjects, stringProperty, ignoreCase) => {
  ignoreCase = typeof ignoreCase === 'undefined' ? false : ignoreCase
  validateIsString(stringProperty)

  if (ignoreCase) {
    return arrayOfObjects.sort((a, b) =>
      a[stringProperty].localeCompare(b[stringProperty])
    )
  } else {
    let prop = stringProperty
    return arrayOfObjects.sort(
      (a, b) => (a[prop] > b[prop]) - (a[prop] < b[prop])
    )
  }
}

/**
 *
 * @param {*} index - index of the item in the array
 * @param {*} list  - the list from which to remove
 * @returns new list with item removed
 */
const removeItemFromArrayByIndex = (index, list) => {
  validateIdAndListArgs(index, list)
  list.splice(index, 1)
  return list
}

/** id, list  */
const findIndexOfId = (id, list) => {
  validateIdAndListArgs(id, list)
  let index = list.findIndex(element => Number(element.id) === Number(id))
  return index
}

const findIndexOfStringId = (id, list) => {
  // validateIdAndListArgs(id, list)
  let index = list.findIndex(element => element.id === id)
  return index
}

const removeItemById = (id, list) => {
  validateIdAndListArgs(id, list)
  const index = findIndexOfId(id, list)
  const updatedList = removeItemFromArrayByIndex(index, list)
  return updatedList
}

const retrieveItemById = (id, list) => {
  validateIdAndListArgs(id, list)
  let index = findIndexOfId(id, list)
  if (index > -1) {
    return list[index]
  } else {
    throw new Error(`No item found matching id: ${id}`)
  }
}

const retrieveItemByStringId = (id, list) => {
  console.log(id)
  const stringId = id.toString()// validateIdAndListArgs(id, list)
  console.log(stringId)
  let index = findIndexOfStringId(stringId, list)
  console.log(index)
  if (index > -1) {
    return list[index]
  } else {
    throw new Error(`No item found matching id: ${stringId}`)
  }
}


/* takes an updated item, id, and list.                  *
 * overwrites the item in the list with the matching id. *
 * returns the updated list.                             */
const updateItemById = (update, id, list) => {
  validateIdAndListArgs(id, list)
  let index = findIndexOfId(id, list)
  if (index > -1) {
    list[index] = update
    return list
  } else {
    throw new Error(`No item found matching id: ${id}`)
  }
}

const removeItem = (id, list) => {
  validateIdAndListArgs(id, list)
  let index = findIndexOfId(id, list)
  list.splice(index, 1)
  return list
}

const getUniqueIds = list => {
  // what if list isn't a list?
  // what if length is 0?
  let ids = Array.from(list, item => item.id)
  let cleanedIds = removeInvalidValuesFromList(ids)
  cleanedIds.sort()

  // ensure unique by converting to Set and back to array :)
  let uniqueIds = Array.from(new Set(cleanedIds))
  return uniqueIds
}

const removeInvalidValuesFromList = list => {
  let cleanedList = []
  list.forEach(item => {
    if (typeof item !== 'undefined' || !isNaN(item)) cleanedList.push(item)
  })
  return cleanedList
}

const generateNewId = list => {
  console.log({ list })
  let newId = 0
  let currentIds = getUniqueIds(list)
  if (currentIds.length <= 0) {
    return newId
  }

  newId = Math.max(...currentIds) + 1

  return newId
}

const compareByName = (a, b) => {
  if (a.name < b.name) return -1
  if (a.name === b.name) return 0
  if (a.name > b.name) return 1
}

const validateIdAndListArgs = (id, list) => {
  validateIsNumber(id)
  validateIsList(list)
}

const validateIsList = list => {
  if(!Array.isArray(list)) {
    throw new Error(`list argument is not a list: ${typeof list}`)
  }
}

const validateIsNumber = num => {
  if(isNaN(num)){
    throw new Error(`argument is not a number: ${num}`)
  }
}

const validateIsString = arg => {
  if(!typeof arg === 'string'){
    throw new Error(`argument is not a string: ${arg}`)
  }
}

exports.compareByName = compareByName
exports.dynamicSort = dynamicSort
exports.findIndexOfId = findIndexOfId
exports.findIndexOfStringId = findIndexOfStringId
exports.generateNewId = generateNewId
exports.getUniqueIds = getUniqueIds
exports.removeInvalidValuesFromList = removeInvalidValuesFromList
exports.removeItem = removeItem
exports.removeItemById = removeItemById
exports.removeItemFromArrayByIndex = removeItemFromArrayByIndex
exports.retrieveItemById = retrieveItemById
exports.retrieveItemByStringId = retrieveItemByStringId
exports.sortByStringProperty = sortByStringProperty
exports.updateItemById = updateItemById
