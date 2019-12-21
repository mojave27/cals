import axios from 'axios'
import { config } from '../config/axiosConfig'

export let retrieve = () => {
  const url = 'exercises'

  return axios
    .get(url, config)
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

export let deleteExerciseById = id => {
  const url = `exercises/${id}`
  return axios
    .delete(url, config)
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

// export default retrieve;
