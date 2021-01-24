import { axiosFood } from '../config/apiConfig';

const retrieveMeals = searchTerm => {
  const url = 'meals'

  return axiosFood
    .get(url)
    .then(function(response) {
      return response.data
    })
    .catch(function(error) {
      console.log(`[retrieveMeals] api error: ${error}`);
      return [];
    });

}

export default retrieveMeals;