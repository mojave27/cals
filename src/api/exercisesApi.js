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
    // console.log(response)
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
  // console.log(`response ${JSON.stringify(response)}`)
  // const responseData = response.data
  // console.log(response.data)
  // let data = {
  //   totalHits: responseData.totalHits,
  //   currentPage: responseData.currentPage,
  //   totalPages: responseData.totalPages,
  //   foods: responseData.foods
  // }
  return response.data
}

// export default retrieve;
