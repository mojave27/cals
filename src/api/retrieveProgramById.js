import axios from "axios";
import { config } from '../config/axiosConfig'

const retrieve = programId => {
  // const url = `program-workouts?id=${programId}`
  const url = `programs/${programId}`

  return axios
    .get(url, config)
    .then(function(response) {
      const data = parseResponse(response)
      return data
    })
    .catch(function(error) {
      // handle error
      console.log(`[ui - retrieve program] api error: ${error}`);
      return [];
    });
};

const parseResponse = (response) => {
    // console.log(`response ${JSON.stringify(response)}`)
    // const responseData = response.data
    console.log(response.data)
    // let data = { 
    //   totalHits: responseData.totalHits,
    //   currentPage: responseData.currentPage,
    //   totalPages: responseData.totalPages,
    //   foods: responseData.foods
    // }
    return response.data;
}

export default retrieve;