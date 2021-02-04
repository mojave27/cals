import { axiosFood } from '../../config/apiConfig';

const saveMeal = mealData => {
  const options = { headers: { 'content-type': 'application/json' } };
  const url = 'meals'

  return axiosFood
    .post(url, mealData, options)
    .then(response => {
      return response
    })
    .catch(error => {
      // handle error
      console.log(`[ui - retrieveFoodList] api error: ${error}`);
      return [];
    });
};

export default saveMeal;