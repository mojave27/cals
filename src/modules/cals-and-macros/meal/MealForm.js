import React, { Component } from 'react'
import { Button } from '@material-ui/core'
// import MealTable from 'modules/cals-and-macros/table/MealTable/MealTable'
import MealCard from 'modules/cals-and-macros/meal/MealCard'
import ReusableFoodSearch from 'modules/cals-and-macros/food/search/ReusableFoodSearch'
import saveMeal from 'api/cals-and-macros/saveMeal'
import { findIndexOfId } from 'list-utils'
import { cloneDeep } from 'lodash'

import TextInput from 'components/inputs/TextInput'
import { Box, Divider, Grid } from '@material-ui/core'
// import { makeStyles } from '@material-ui/core/styles'

class Meal extends Component {
  state = {
    activeFood: {},
    loading: false,
    meal: {
      foodList: [],
      name: ''
    },
    tweakValue: 0,
    message: '',
    searchValue: '',
    selectedFoodItems: [],
    showSearch: false
  }

  tweakRowUp = id => {
    this.setState(prevState => {
      let updatedMeal = prevState.meal
      const index = findIndexOfId(id, updatedMeal.foodList)
      let multiplier =
        (Number(updatedMeal.foodList[index].quantity) + 1) /
        Number(updatedMeal.foodList[index].quantity)

      let foodItem = cloneDeep(updatedMeal.foodList[index])
      foodItem.quantity = Number(foodItem.quantity) + 1

      let updatedFoodItem = this.updateNutrients(foodItem, multiplier)
      updatedMeal.foodList[index] = updatedFoodItem
      return { meal: updatedMeal }
    })
  }

  tweakRowDown = id => {
    this.setState(prevState => {
      let updatedMeal = prevState.meal
      const index = findIndexOfId(id, updatedMeal.foodList)
      let multiplier =
        (Number(updatedMeal.foodList[index].quantity) - 1) /
        Number(updatedMeal.foodList[index].quantity)

      let foodItem = cloneDeep(updatedMeal.foodList[index])

      foodItem.quantity = Number(foodItem.quantity) - 1

      let updatedFoodItem = this.updateNutrients(foodItem, multiplier)
      updatedMeal.foodList[index] = updatedFoodItem
      return { meal: updatedMeal }
    })
  }

  handleRowSelect = (rowId, event) => {
    event.preventDefault()
    this.setState(prevState => {
      let selectedFoodItems = prevState.selectedFoodItems
      selectedFoodItems.push(prevState.foodList[rowId])
      return { selectedFoodItems }
    })
  }

  /* ******************************************************** */

  addToMeal = foodItem => {
    this.setState(prevState => {
      let meal = prevState.meal
      meal.foodList.push(foodItem)
      return { meal }
    })
  }

  saveTheMeal = () => {
    saveMeal(this.state.meal)
      .then(response => {
        console.log(response)
        this.setState({ meal: response.data })
      })
      .catch(error => {
        console.log(error)
      })
  }

  updateMealName = name => {
    let meal = this.state.meal
    meal.name = name
    this.setState({ meal })
  }

  toggleSearch = () => {
    this.setState(prevState => {
      return { showSearch: !prevState.showSearch }
    })
  }

  toggleMealModal = () => {
    this.setState(prevState => {
      return { showMealModal: !prevState.showMealModal }
    })
  }

  handleInputChange = event => {
    let name = event.target.value
    this.setState(prevState => {
      let meal = prevState.meal
      meal.name = name
      return { meal }
    })
  }

  convertNutrient = (nutrient, multiplier) => {
    return Math.round(nutrient * multiplier * 100) / 100
  }

  handleQuantityChange = (event, data) => {
    let quantity = data
    let id = event.target.id
    let foodItemIndex = this.state.meal.foodList.findIndex(
      food => Number(food.id) === Number(id)
    )
    let foodItem = cloneDeep(this.state.meal.foodList[foodItemIndex])

    let multiplier = quantity / foodItem.quantity
    foodItem.quantity = quantity

    let updatedFoodItem = this.updateNutrients(foodItem, multiplier)

    this.setState(prevState => {
      let meal = prevState.meal
      meal.foodList[foodItemIndex] = updatedFoodItem
      return { meal }
    })
  }

  updateNutrients = (foodItem, multiplier) => {
    return {
      ...foodItem,
      calories: Math.ceil(foodItem.calories * multiplier * 100) / 100,
      proteinGrams: Math.ceil(foodItem.proteinGrams * multiplier * 100) / 100,
      carbGrams: Math.ceil(foodItem.carbGrams * multiplier * 100) / 100,
      fiberGrams: Math.ceil(foodItem.fiberGrams * multiplier * 100) / 100,
      // netCarbs: Math.ceil(foodItem.netCarbs * multiplier * 100) / 100,
      fatGrams: Math.ceil(foodItem.fatGrams * multiplier * 100) / 100
    }
  }

  deleteRow = event => {
    let id = event.target.id
    let index = findIndexOfId(id, this.state.meal.foodList)
    this.setState(prevState => {
      let meal = prevState.meal
      meal.foodList.splice(index, 1)
      return { meal }
    })
  }

  render() {
    return (
      <div style={{ border: '1px solid #eee', padding: '10px' }}>
        <Box style={{ padding: '10px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextInput
                id='mealName'
                name='meal name'
                data={this.state.meal.name}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} >
              {this.state.meal.foodList.length > 0 ? (
                <MealCard
                  item={this.state.meal}
                  rowClick={this.handleRowSelect}
                  rowSelect={this.selectFoodItem}
                  rowDelete={this.deleteRow}
                  onQuantityChange={this.handleQuantityChange}
                  tweakUp={this.tweakRowUp}
                  tweakDown={this.tweakRowDown}
                />
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <Button
                size={'small'}
                variant={'outlined'}
                onClick={this.saveTheMeal}
              >
                Save Meal
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Divider />

        <ReusableFoodSearch
          onClose={this.toggleSearch}
          rowSelect={this.addToMeal}
          setActiveFood={this.setActiveFood}
          activeFood={this.state.activeFood}
          activeFoodDetails={this.state.activeFoodDetails}
        />
      </div>
    )
  }
}

export default Meal
