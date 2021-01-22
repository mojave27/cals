import axios from 'axios'
import { getAxiosConfigWithAuth } from '../components/Auth/Auth'

export let retrieveExercises = async () => {
  const url = 'exercises'
  let configWithAuth = await getAxiosConfigWithAuth()
  return axios
    // .get(url, config)
    .get(url, configWithAuth)
    .then(function(response) {
      const data = parseResponse(response)
      return data
    })
    .catch(function(error) {
      // handle error
      console.log(`[ui - retrieve exercises] api error: ${error}`)
      return []
    })
}

export let addExercise = async (exercise) => {
  const url = 'exercises'
  let configWithAuth = await getAxiosConfigWithAuth()

  return axios
    .post(url, exercise, configWithAuth)
    .then(function(response) {
      const data = parseResponse(response)
      return data
    })
    .catch(function(error) {
      // handle error
      console.log(`[ui - retrieve exercises] api error: ${error}`)
      return []
    })
}

export let deleteExercisesById = ids => {
  let responses = []
  ids.forEach( async id => {
    let response = await deleteExerciseById(id)
    responses.push(response)
  })
  return responses
}

export let deleteExerciseById = async (id) => {
  let config = await getAxiosConfigWithAuth()
  const url = `exercises`
  let data = { id: id }
  return axios
    .delete(url, data, config)
    .then(function(response) {
      const data = parseResponse(response)
      return data
    })
    .catch(function(error) {
      // handle error
      console.log(`[ui - retrieve exercises] api error: ${error}`)
      return []
    })
}

const parseResponse = response => {
  return response.data
}
