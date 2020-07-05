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

export let sortByStringProperty = (arrayOfObjects, stringProperty, ignoreCase) => {
  ignoreCase = typeof ignoreCase === 'undefined' ? false : ignoreCase

  if (ignoreCase){
    return arrayOfObjects.sort((a, b) => a[stringProperty].localeCompare(b[stringProperty]))
  } else {
    let prop = stringProperty
    return arrayOfObjects.sort((a, b) => (a[prop] > b[prop]) - (a[prop] < b[prop]) )
  }
}

export let findIndexOfId = (id, list) => {
  // console.log(`[ArrayUtils] id: ${id}`)
  // console.log(`[ArrayUtils] list: ${JSON.stringify(list)}`)
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

export const removeItem = (id, list) => {
  let index = findIndexOfId(id, list)
  list.splice(index, 1)
  return list
}


export const getUniqueIds = list => {
  // what if list isn't a list?  
  // what if length is 0?
  let ids = Array.from(list, item => item.id)
  let cleanedIds = removeInvalidValuesFromList(ids)
  cleanedIds.sort()

  // ensure unique by converting to Set and back to array :)
  let uniqueIds = Array.from(new Set(cleanedIds))
  return uniqueIds
}

export const removeInvalidValuesFromList = list => {
  let cleanedList = []
  list.forEach(item => {
    if (typeof item !== 'undefined' || !isNaN(item)) cleanedList.push(item)
  })
  return cleanedList
}

export const generateNewId = list => {
  let newId = 0
  let currentIds = getUniqueIds(list)
  if (currentIds.length <= 0){
    return newId
  }

  newId = Math.max(...currentIds) + 1

  return newId
}

export const compareByName = (a, b) => {
  if (a.name < b.name) return -1
  if (a.name === b.name) return 0
  if (a.name > b.name) return 1
}
