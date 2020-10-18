import axios from 'axios'
import { config } from '../config/axiosConfig'
import { config as awsConfig } from '../config/lambdaConfig'
import { Auth } from 'aws-amplify';

const URL = 'wodays'
const getConfigForAws = async () => {
  const user = await Auth.currentAuthenticatedUser();
  const token = user.signInUserSession.idToken.jwtToken;
  let config = {        
    headers: {
      Authorization: token
    },
    ...awsConfig
  }
  return config
}

export const retrieve = async () => {
  // console.log('calling GET /wodays')
  let configWithAuth = await getConfigForAws()
  return axios
    // .get(URL, awsConfig)
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
  let configWithAuth = await getConfigForAws()
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

export const addWoDay = woday => {
  console.log(`calling POST /wodays with ${woday}`)
  return axios
    .post(URL, woday, config)
    .then(response => {
      const data = parseResponse(response)
      return data
    })
    .catch(error => {
      console.log(`wodays api - addWoDay error: ${error}`)
      return {}
    })
}

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
