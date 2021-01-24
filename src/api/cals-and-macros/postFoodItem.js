// import axios from "axios";
import { axiosFood } from '../../config/apiConfig';

const postFoodItem = foodItem => {
  const url = 'foodItems'
  const data = {...foodItem}

  console.log(JSON.stringify(foodItem))

  return axiosFood
    .post(url, data)
    .then(function(response) {
      console.log(response.data)
      // const data = parseResponse(response)
      return response.data
    })
    .catch(function(error) {
      console.log(`[ui - retrieveFoodList] api error: ${error}`);
      return [];
    })

}


export { postFoodItem }