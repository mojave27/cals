import axios from 'axios'
import { config } from '../config/axiosConfig'

export const addSet = set => {
  const url = 'sets'
  let data = { ...set }

  return axios
    .post(url, data, config)
    .then(function(response) {
      const data = parseResponse(response)
      return data
    })
    .catch(function(error) {
      // handle error
      console.log(`[api error] : ${error}`)
      return []
    })
}

export const retrieve = () => {
  const url = 'sets'
  return axios
    .get(url, config)
    .then(function(response) {
      const data = parseResponse(response)
      return data
    })
    .catch(function(error) {
      // handle error
      console.log(`[api error]: ${error}`)
      return []
    })
}

export const retrieveSetById = id => {
  const url = `sets/${id}`
  return axios.get(url, config).then(response => {
    let data = parseResponse(response)
    return data
  })
}

export const updateSet = set => {
  const url = `sets/${set.id}`

  let data = { ...set }

  return axios
    .put(url, data, config)
    .then(function(response) {
      return parseResponse(response)
    })
    .catch(function(error) {
      console.log(`[api error] : ${error}`)
      return []
    })
}

export const deleteSet = id => {
  const url = `sets/${id}`
  return axios
    .delete(url, config)
    .then(response => {
      return parseResponse(response)
    })
    .catch(error => {
      console.log(`sets api - deleteSet error: ${error}`)
      return {}
    })
}

const parseResponse = response => {
  return response.data
}
