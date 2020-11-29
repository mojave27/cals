import axios from 'axios'
import { config } from '../config/axiosConfig'
import { getAxiosConfigWithAuth } from '../components/Auth/Auth'

const URL = 'workouts'

export const retrieveWorkoutTemplates = () => {
  return axios
    .get('workout-templates', config)
    .then(function(response) {
      const data = parseResponse(response)
      console.log('data...............')
      console.log(data)
      return data
    })
    .catch(function(error) {
      // handle error
      console.log(`[ui - retrieve workout-templates] api error: ${error}`)
      return []
    })
}

export const retrieve = async () => {
  let configWithAuth = await getAxiosConfigWithAuth()
  return axios
    .get(URL, configWithAuth)
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

export const retrieveWorkoutById = async (id) => {
  let configWithAuth = await getAxiosConfigWithAuth()
  let url = `${URL}/${id}`
  return axios
    .get(url, configWithAuth)
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

export const addWorkout = async (workout) => {
  console.log(`calling POST /workouts with ${workout}`)
  let config = await getAxiosConfigWithAuth()
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
