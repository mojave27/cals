import axios from "axios";
import { config } from '../config/axiosConfig'

const NAME = 'trackerApi.js'

export const retrieveProgramTracker = id => {
  const url = `tracker/${id}`
  // console.log(`[retrieveProgramTracker] GET ${url}`)
  return axios
    .get(url, config)
    .then(function (response) {
      const data = parseResponse(response)
      return data
    })
    .catch(function (error) {
      _handleError(error)
      return [];
    });
};

// export const addProgram = program => {
//   const url = 'programs'
//   return axios
//   .post(url, program, config)
//   .then(response => parseResponse(response))
//   .catch( error => {
//     _handleError(error)
//     return {}
//   })
// }

// export const updateProgram = program => {
//   const url = `programs/${program.id}`
//   return axios
//     .put(url, program, config)
//     .then(response => {
//       const data = parseResponse(response)
//       return data
//     })
//     .catch(error => {
//       _handleError(error)
//       return {}
//     })
// }

const _handleError = error => {
  console.log(`[${NAME}]: ${error}`)
}

const parseResponse = (response) => {
  return response.data;
}
