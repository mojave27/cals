import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import MealCard from 'modules/cals-and-macros/meal/MealCard'
import ReusableFoodSearch from 'modules/cals-and-macros/food/search/ReusableFoodSearch'
import saveMeal from 'api/cals-and-macros/saveMeal'
import { findIndexOfId } from 'list-utils'
import { cloneDeep } from 'lodash'

import TextInput from 'components/inputs/TextInput'
import { Box, Divider, Grid, TextField } from '@material-ui/core'
// import { makeStyles } from '@material-ui/core/styles'

const MealForm = (props) => {
  const [activeFood, setActiveFood] = useState()
  const [meal, setMeal] = useState({ foodList: [], name: '', date: '' })
  // const [tweakValue, setTweakValue] = useState(0)
  // const [message, setMessage] = useState('')
  const [selectedFoodItems, setSelectedFoodItems] = useState([])
  const [showSearch, setShowSearch] = useState(false)
  // const [showMealModal, setShowMealModal] = useState(false)
  // const [searchValue, setSearchValue] = useState('')
  const [user, setUser] = useState({ attributes: { email: '' }})

  useEffect(() => {
    if (props.user) {
      // console.log(`setting user with ${JSON.stringify(props.user)}`)
      let updMeal = meal
      meal.user = props.user.attributes
      setMeal(updMeal)
      setUser(props.user)
    }
  }, [meal, props.user])

  const tweakRowUp = (id) => {
    let updatedMeal = cloneDeep(meal)
    const index = findIndexOfId(id, updatedMeal.foodList)
    let foodItem = cloneDeep(updatedMeal.foodList[index])
    let multiplier =
      (Number(updatedMeal.foodList[index].quantity) + 1) /
      Number(updatedMeal.foodList[index].quantity)

    foodItem.quantity = Number(foodItem.quantity) + 1

    let updatedFoodItem = updateNutrients(foodItem, multiplier)
    updatedMeal.foodList[index] = updatedFoodItem
    setMeal(updatedMeal)
  }

  const tweakRowDown = (id) => {
    let updatedMeal = cloneDeep(meal)
    const index = findIndexOfId(id, updatedMeal.foodList)
    let multiplier =
      (Number(updatedMeal.foodList[index].quantity) - 1) /
      Number(updatedMeal.foodList[index].quantity)

    let foodItem = cloneDeep(updatedMeal.foodList[index])

    foodItem.quantity = Number(foodItem.quantity) - 1

    let updatedFoodItem = updateNutrients(foodItem, multiplier)
    updatedMeal.foodList[index] = updatedFoodItem
    setMeal(updatedMeal)
  }

  const handleRowSelect = (rowId, event) => {
    event.preventDefault()
    let updatedSelectedFoodItems = cloneDeep(selectedFoodItems)
    updatedSelectedFoodItems.push(meal.foodList[rowId])
    setSelectedFoodItems(updatedSelectedFoodItems)
  }

  /* ******************************************************** */

  const addToMeal = (foodItem) => {
    let updatedMeal = cloneDeep(meal)
    updatedMeal.foodList.push(foodItem)
    setMeal(updatedMeal)
  }

  const saveTheMeal = () => {
    saveMeal(meal)
      .then((response) => {
        console.log(response)
        setMeal(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // const updateMealName = (name) => {
  //   let newMeal = cloneDeep(meal)
  //   newMeal.name = name
  //   setMeal(newMeal)
  // }

  const toggleSearch = () => {
    setShowSearch(!showSearch)
  }

  // const toggleMealModal = () => {
  //   setShowMealModal(!showMealModal)
  // }

  const handleInputChange = (event) => {
    let name = event.target.value
    let newMeal = cloneDeep(meal)
    newMeal.name = name
    setMeal(newMeal)
  }

  const handleTextChange = (event) => {
    let id = event.target.id
    let value = event.target.value
    switch (id) {
      case 'date':
        setDate(value)
        break
      default:
        console.log('Sorry, no match for ' + id)
    }
  }

  const setDate = (date) => {
    let upDate = new Date(date)
    let newMeal = cloneDeep(meal)
    newMeal.date = upDate
    setMeal(newMeal)
  }

  const getStartDate = () => {
    // let date = woDayContext.woday.date
    let date = Date.now()
    let startDate = new Date(date.year, date.month, date.day)
    let month =
      startDate.getMonth() + 1 < 10
        ? `0${startDate.getMonth() + 1}`
        : startDate.getMonth() + 1
    let day =
      startDate.getDate() < 10 ? `0${startDate.getDate()}` : startDate.getDate()
    let dateString = `${startDate.getFullYear()}-${month}-${day}`
    return dateString
  }

  // const convertNutrient = (nutrient, multiplier) => {
  //   return Math.round(nutrient * multiplier * 100) / 100
  // }

  const handleQuantityChange = (event, quantity) => {
    let id = event.target.id
    const index = findIndexOfId(id, meal.foodList)
    let foodItem = cloneDeep(meal.foodList[index])
    let multiplier = Number(quantity) / Number(foodItem.quantity)
    foodItem.quantity = Number(quantity)

    let updatedFoodItem = updateNutrients(foodItem, multiplier)
    let newMeal = cloneDeep(meal)
    newMeal.foodList[index] = updatedFoodItem
    setMeal(newMeal)
  }

  const updateNutrients = (foodItem, multiplier) => {
    return {
      ...foodItem,
      calories: Math.ceil(foodItem.calories * multiplier * 100) / 100,
      proteinGrams: Math.ceil(foodItem.proteinGrams * multiplier * 100) / 100,
      carbGrams: Math.ceil(foodItem.carbGrams * multiplier * 100) / 100,
      fiberGrams: Math.ceil(foodItem.fiberGrams * multiplier * 100) / 100,
      // netCarbs: Math.ceil(foodItem.netCarbs * multiplier * 100) / 100,
      fatGrams: Math.ceil(foodItem.fatGrams * multiplier * 100) / 100,
    }
  }

  const deleteRow = (event) => {
    let id = event.target.id
    let index = findIndexOfId(id, meal.foodList)
    let newMeal = meal
    newMeal.foodList.splice(index, 1)
    setMeal(newMeal)
  }

  const getUserName = () => {
    return user.attributes.email
    // console.log(user?.attributes?.email)
  }

  return (
    <div style={{ border: '1px solid #eee', padding: '10px' }}>
      <Box style={{ padding: '10px' }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextInput
              id='mealName'
              name='meal name'
              data={meal.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id='date'
              label='Date'
              type='date'
              // defaultValue={getStartDate()}
              onChange={handleTextChange}
              // className={classes.textField}
              style={{ borderRadius: '5px' }}
              variant={'outlined'}
              size='small'
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <MealCard
              item={meal}
              rowClick={handleRowSelect}
              rowSelect={handleRowSelect}
              rowDelete={deleteRow}
              onQuantityChange={handleQuantityChange}
              tweakUp={tweakRowUp}
              tweakDown={tweakRowDown}
            />
          </Grid>
          <Grid item xs={12}>
            <Button size={'small'} variant={'outlined'} onClick={saveTheMeal}>
              Save Meal
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Divider />

      <ReusableFoodSearch
        onClose={toggleSearch}
        rowSelect={addToMeal}
        setActiveFood={setActiveFood}
        activeFood={activeFood}
        activeFoodDetails={{}}
      />
    </div>
  )
}

export default MealForm
