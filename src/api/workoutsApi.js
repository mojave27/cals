import axios from 'axios'
import { config } from '../config/axiosConfig'

const URL = 'workouts'

export const retrieve = () => {
  // console.log('calling GET /workouts')
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

export const retrieveWorkoutById = id => {
  // console.log(`calling GET /workouts/${id}`)
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

export const addWorkout = workout => {
  console.log(`calling POST /workouts with ${workout}`)
  // let data = {...workout}
  return axios
    .post(URL, workout, config)
    .then(response => {
      const data = parseResponse(response)
      return data
    })
    .catch(error => {
      console.log(`workouts api - addWorkout error: ${error}`)
      return {}
    })
}

export const updateWorkout = workout => {
  let url = `${URL}/${workout.id}`
  console.log(`calling PUT ${url}`)
  return axios
    .put(url, workout, config)
    .then(response => {
      const data = parseResponse(response)
      return data
    })
    .catch(error => {
      console.log(`workouts api - addWorkout error: ${error}`)
      return {}
    })
}

export const deleteWorkout = id => {
  const url = `${URL}/${id}`
  return axios
    .delete(url, config)
    .then(response => {
      return parseResponse(response)
    })
    .catch(error => {
      console.log(`workouts api - deleteWorkout error: ${error}`)
      return {}
    })
}

const parseResponse = response => {
  return response.data
}
