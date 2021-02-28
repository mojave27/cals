import { axiosFood } from '../config/apiConfig'

const deleteFoodItem = id => {
  const url = `foodItems/${id}`
  return axiosFood
    .delete(url)
    .then(function(response) {
      return response
    })
    .catch(function(error) {
      console.log(`[ui - retrieveFoodItem] api error: ${error}`)
      return []
    })
}

export default deleteFoodItem
