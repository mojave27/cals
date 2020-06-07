import axios from 'axios'
import { config } from '../config/axiosConfig'

const URL = 'wodays'

export const retrieve = () => {
  // console.log('calling GET /wodays')
  return axios
    .get(URL, config)
    .then(function(response) {
      const data = parseResponse(response)
      return data
    })
    .catch(function(error) {
      // handle error
      console.log(`[ui - retrieve workouts] api error: ${error}`)
      return []
    })
}

export const retrieveWoDayById = id => {
  console.log(`calling GET /wodays/${id}`)
  let url = `${URL}/${id}`
  return axios
    .get(url, config)
    .then(response => {
      const data = parseResponse(response)
      return data
    })
    .catch(function(error) {
      // handle error
      console.log(`[ui - retrieve workouts] api error: ${error}`)
      return []
    })
}

// export const addWorkout = workout => {
//   console.log(`calling POST /workouts with ${workout}`)
//   // let data = {...workout}
//   return axios
//     .post(URL, workout, config)
//     .then(response => {
//       const data = parseResponse(response)
//       return data
//     })
//     .catch(error => {
//       console.log(`workouts api - addWorkout error: ${error}`)
//       return {}
//     })
// }

export const updateWoDay = woday => {
  let url = `${URL}/${woday.id}`
  console.log(`calling PUT ${url}`)
  return axios
    .put(url, woday, config)
    .then(response => {
      const data = parseResponse(response)
      return data
    })
    .catch(error => {
      console.log(`woday api - addWoDay error: ${error}`)
      return {}
    })
}

// export const deleteWorkout = id => {
//   const url = `${URL}/${id}`
//   return axios
//     .delete(url, config)
//     .then(response => {
//       return parseResponse(response)
//     })
//     .catch(error => {
//       console.log(`workouts api - deleteWorkout error: ${error}`)
//       return {}
//     })
// }

const parseResponse = response => {
  return response.data
}
