import axios from 'axios'
import { config } from '../config/axiosConfig'
import { getAxiosConfigWithAuth } from '../components/Auth/Auth'

const URL = 'workouts'

export const retrieveWorkoutTemplates = () => {
  return axios
    .get('workout-templates', config)
    .then(function(response) {
      const data = parseResponse(response)
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
      // const data = parseResponse(response)
      return response.data
    })
    .catch(function(error) {
      // handle error
      console.log(`[workoutsApi - retrieve] error: ${error}`)
      return []
    })
}

export const retrieveWorkoutById = async (id) => {
  let configWithAuth = await getAxiosConfigWithAuth()
  let url = `${URL}/${id}`
  return axios
    .get(url, configWithAuth)
    .then(response => {
      console.log(response)
      const data = response.data
      return data
    })
    .catch(function(error) {
      // handle error
      console.log(`[ui - retrieve workouts] api error: ${error}`)
      return []
    })
}

export const addWorkout = async (workout) => {
  let config = await getAxiosConfigWithAuth()
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

export const updateWorkout = async (workout) => {
  let response = await addWorkout(workout)
  return response
  // let url = `${URL}/${workout.id}`
  // console.log(`calling PUT ${url}`)
  // return axios
  //   .put(url, workout, config)
  //   .then(response => {
  //     const data = parseResponse(response)
  //     return data
  //   })
  //   .catch(error => {
  //     console.log(`workouts api - addWorkout error: ${error}`)
  //     return {}
  //   })
}

export const deleteWorkout = async id => {
  let config = await getAxiosConfigWithAuth()
  const url = `${URL}/${id}`
  return axios
    .delete(url, config)
    .then(response => {
      if (response.status !== 200){
        throw new Error('response status not 200')
      }
    })
    .catch(error => {
      console.log(`workouts api - deleteWorkout error: ${error}`)
      return {}
    })
}

const parseResponse = response => {
  // for lambdas which return a json body response
  return JSON.parse(response.data.body)
}
