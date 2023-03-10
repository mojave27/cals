import axios from 'axios'
import { getAxiosConfigWithAuth } from '../components/Auth/Auth'

const URL = 'wodays'

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

export const retrieveWoDayById = async (id) => {
  let url = `${URL}/${id}`
  let configWithAuth = await getAxiosConfigWithAuth()
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

export const addWoDay = async (woday) => {
  let configWithAuth = await getAxiosConfigWithAuth()
  return axios
    .post(URL, woday, configWithAuth)
    .then(response => {
      const data = parseResponse(response)
      return data
    })
    .catch(error => {
      console.log(`wodays api - addWoDay error: ${error}`)
      return {}
    })
}

export const updateWoDay = async (woday) => {
  let savedWoDay = await addWoDay(woday)
  return savedWoDay
}

export const deleteWoDay = async id => {
  let configWithAuth = await getAxiosConfigWithAuth()
  const url = `${URL}/${id}`
  return axios
    .delete(url, configWithAuth)
    .then(response => {
      return parseResponse(response)
    })
    .catch(error => {
      console.log(`workouts api - deleteWoDay error: ${error}`)
      return {}
    })
}

const parseResponse = response => {
  return response.data
}
