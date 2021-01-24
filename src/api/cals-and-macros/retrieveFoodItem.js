import { axiosFood } from '../../config/apiConfig'

const retrieveFoodItem = id => {
  const url = `foodItems/${id}`
  return axiosFood
    .get(url)
    .then(function(response) {
      return parseResponse(response, id);
    })
    .catch(function(error) {
      console.log(`[ui - retrieveFoodItem] api error: ${error}`)
      return []
    })
}

// move this to an external module ?
const parseResponse = (response, fdcId) => {
  // targetNutrients ids are based on the ids used in the gov api
  const targetNutrients = [
    { id: 1008, name: 'calories' },
    { id: 1003, name: 'protein' },
    { id: 1004, name: 'fat' },
    { id: 1005, name: 'carbohydrates' },
    { id: 1079, name: 'fiber' }
  ]
  const foodItem = response.data
  let transformedFoodItem = {
    fdcId,
    description: foodItem.description,
    nutrients: {}
  }
  foodItem.foodNutrients.forEach(nutrient => {
    targetNutrients.forEach(target => {
      if (nutrient.nutrient.id === target.id) {
        nutrient.nutrient.name = target.name
        // transformedFoodItem.nutrients.push(nutrient.nutrient)
        transformedFoodItem.nutrients[target.name] = nutrient.nutrient
        transformedFoodItem.nutrients[target.name].amount = nutrient.amount
      }
    })
  })
  console.log(JSON.stringify(transformedFoodItem))
  return transformedFoodItem
}

export default retrieveFoodItem
