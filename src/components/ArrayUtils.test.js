import * as ArrayUtils from './ArrayUtils'
// dynamicSort
// getUniqueIds
// removeInvalidValuesFromList
// removeItem
// removeItemById
// removeItemFromArrayByIndex
// retrieveItemById
// retrieveItemByStringId
// sortByStringProperty
// updateItemById
// updateItemByNumericId
// updateItemByStringId

describe('ArrayUtils functions', () => {
  let numeric_id, string_id, object_id, numeric_id_list, string_id_list

  beforeEach(() => {
    numeric_id = 1
    string_id = "1"
    object_id = {id: 'abc'}
    numeric_id_list = [ {id: 1}, {id: 2}, {id: 3} ]
    string_id_list = [ {id: '1'}, {id: 'abc'}, {id: '3'} ]
  })

  test('compareByName', () => {
    const item1 = { name: 'apple' }
    const item2 = { name: 'orange' }
    const item3 = { name: 'apple' }
    expect(ArrayUtils.compareByName(item1, item2)).toEqual(-1)
    expect(ArrayUtils.compareByName(item2, item1)).toEqual(1)
    expect(ArrayUtils.compareByName(item1, item3)).toEqual(0)
  })

  describe('variable type checks', () => {
    test('isNumeric', () => {
      expect(ArrayUtils.isNumeric(numeric_id)).toBe(true)
      expect(ArrayUtils.isNumeric(string_id)).toBe(false)
      expect(ArrayUtils.isNumeric(object_id)).toBe(false)
    })

    test('isString', () => {
      expect(ArrayUtils.isString(numeric_id)).toBe(false)
      expect(ArrayUtils.isString(string_id)).toBe(true)
      expect(ArrayUtils.isString(object_id)).toBe(false)
    })
  })

  describe('finding index', () => {

    describe('findIndexOfId', () => {
      test('string_id and string_id_list args', () => {
        expect(ArrayUtils.findIndexOfId(string_id, string_id_list)).toEqual(0)
        string_id = "abc"
        expect(ArrayUtils.findIndexOfId(string_id, string_id_list)).toEqual(1)
      })
      test('numeric id and string list', () => {
        expect(ArrayUtils.findIndexOfId(numeric_id, string_id_list)).toEqual(0)
        numeric_id = 3
        expect(ArrayUtils.findIndexOfId(numeric_id, string_id_list)).toEqual(2)
      })
      test('object_id and string_id_list throws error', () => {
        expect(() => { ArrayUtils.findIndexOfId(object_id, numeric_id_list) }).toThrow()
      })
    })

    describe('findIndexOfStringId', () => {
      test('string_id and string_id_list args', () => {
        expect(() => { ArrayUtils.findIndexOfStringId(string_id, string_id_list) }).not.toThrow()
        expect( ArrayUtils.findIndexOfStringId(string_id, string_id_list) ).toEqual(0)
      })
      test('numeric_id and string_id_list args', () => {
        expect(() => { ArrayUtils.findIndexOfStringId(numeric_id, string_id_list) }).toThrow()
      })
      test('object_id and string_id_list args', () => {
        expect(() => { ArrayUtils.findIndexOfStringId(object_id, string_id_list) }).toThrow()
      })
    })

    describe('findIndexOfNumericId', () => {
      test('numeric_id and numeric_id_list args', () => {
        expect(() => { ArrayUtils.findIndexOfNumericId(numeric_id, numeric_id_list) }).not.toThrow()
        expect( ArrayUtils.findIndexOfNumericId(numeric_id, numeric_id_list) ).toEqual(0)
      })
      test('string_id and numeric_id_list args', () => {
        expect(() => { ArrayUtils.findIndexOfNumericId(string_id, numeric_id_list) }).toThrow()
      })
      test('object_id and numeric_id_list args', () => {
        expect(() => { ArrayUtils.findIndexOfNumericId(object_id, numeric_id_list) }).toThrow()
      })
    })

  })

  describe('validations', () => {
    test('validateIsList', () => {
      expect(() => { ArrayUtils.validateIsList(numeric_id_list) }).not.toThrow()
      expect(() => { ArrayUtils.validateIsList(string_id) }).toThrow()
    })

    test('validateIsNumber', () => {
      expect(() => { ArrayUtils.validateIsNumber(numeric_id) }).not.toThrow()
      expect(() => { ArrayUtils.validateIsNumber(string_id)  }).toThrow()
      expect(() => { ArrayUtils.validateIsNumber(object_id)  }).toThrow()
    })

    test('validateIsString', () => {
      expect(() => { ArrayUtils.validateIsString(numeric_id) }).toThrow()
      expect(() => { ArrayUtils.validateIsString(string_id) }).not.toThrow()
      expect(() => { ArrayUtils.validateIsString(object_id) }).toThrow()
    })
  })

  describe('id functions', () => {
    test('generateNewId', () => {
      expect(ArrayUtils.generateNewId(numeric_id_list)).toEqual(4)
      expect( () => { ArrayUtils.generateNewId(string_id_list) }).toThrow()
      expect(ArrayUtils.generateNewId([])).toEqual(0)
    })
    test('generateNewNumericId', () => {
      // expect(ArrayUtils.generateNewId(numeric_id_list)).toEqual(4)
      // expect( () => { ArrayUtils.generateNewId(string_id_list) }).toThrow()
      expect(ArrayUtils.generateNewNumericId([])).toEqual(0)
    })
    test('getUniqueIds', () => {
      expect(() => {ArrayUtils.getUniqueIds('i_am_a_string')}).toThrow()
      expect(ArrayUtils.getUniqueIds([])).toEqual([])
      expect(ArrayUtils.getUniqueIds(numeric_id_list)).toEqual([1,2,3])
      numeric_id_list.push({id: undefined})
      numeric_id_list.push({id: 5})
      expect(ArrayUtils.getUniqueIds(numeric_id_list)).toEqual([1,2,3,5])
      // this next result should be sorted
      expect(ArrayUtils.getUniqueIds(string_id_list)).toEqual(["1","3","abc"])
    })
  })

  describe('removeItemFromArrayByIndex', () => {
    test('using valid args removes item from list', () => {
      expect(numeric_id_list.length).toEqual(3)
      expect(numeric_id_list[1]).toEqual({ id: 2 })
      expect(() => {
        ArrayUtils.removeItemFromArrayByIndex(1, numeric_id_list)
      }).not.toThrow()
      expect(numeric_id_list.length).toEqual(2)
      expect(numeric_id_list[1]).toEqual({ id: 3 })
    })
    test('using invalid args throws, and does NOT remove', () => {
      expect(numeric_id_list.length).toEqual(3)
      expect(() => {
        ArrayUtils.removeItemFromArrayByIndex("1", numeric_id_list)
      }).toThrow()
      expect(numeric_id_list.length).toEqual(3)
    })
  })


})