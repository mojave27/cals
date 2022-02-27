import { axiosFood } from '../../config/apiConfig';

const deleteMeal = id => {
  const options = { headers: { 'content-type': 'application/json' } }
  const url = `meals/${id}`

  return axiosFood
    .delete(url, options)
    .then(response => {
      return response
    })
    .catch(error => {
      // handle error
      console.log(`[ui - deleteMeal] api error: ${error}`)
      return []
    })

}

export default deleteMeal;