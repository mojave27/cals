// import axios from "axios";
import { axiosFood } from '../config/apiConfig';

const retrieveFoodList = searchTerm => {
  const url = 'foodItems'

  return axiosFood
    .get(url)
    .then(function(response) {
      return response.data
    })
    .catch(function(error) {
      console.log(`[ui - retrieveFoodList] api error: ${error}`);
      return [];
    });

}

export default retrieveFoodList;