import axios from "axios";
import { config } from '../config/axiosConfig'

const URL = 'workouts'

export const retrieve = () => {
  console.log('calling /workouts')
  return axios
    .get(URL, config)
    .then(function(response) {
      // console.log(JSON.stringify(response))
      const data = parseResponse(response)
      return data
    })
    .catch(function(error) {
      // handle error
      console.log(`[ui - retrieve workouts] api error: ${error}`);
      return [];
    });
};

export const addWorkout = workout => {
  // let data = {...workout}
  return axios
  .post(URL, workout, config)
  .then( response => {
    const data = parseResponse(response)
    return data
  })
  .catch( error => {
    console.log(`workouts api - addWorkout error: ${error}`)
    return {}
  })
}

export const updateWorkout = workout => {
  let url = `${URL}/${workout.id}`
  return axios
  .put(url, workout, config)
  .then( response => {
    const data = parseResponse(response)
    return data
  })
  .catch( error => {
    console.log(`workouts api - addWorkout error: ${error}`)
    return {}
  })
}


const parseResponse = (response) => {
    // console.log(`response ${JSON.stringify(response)}`)
    // const responseData = response.data
    // console.log(response.data)
    // let data = { 
    //   totalHits: responseData.totalHits,
    //   currentPage: responseData.currentPage,
    //   totalPages: responseData.totalPages,
    //   foods: responseData.foods
    // }
    return response.data;
}

// export default retrieve;