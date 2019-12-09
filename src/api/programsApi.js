import axios from "axios";
import { config } from '../config/axiosConfig'

const NAME = 'programApi.js'

export const retrievePrograms = searchTerm => {
  const url = 'programs'

  return axios
    .get(url, config)
    .then(function (response) {
      const data = parseResponse(response)
      return data
    })
    .catch(function (error) {
      // handle error
      console.log(`[ui - retrieve programs] api error: ${error}`);
      return [];
    });
};

export const retrieveProgramById = programId => {
  const url = `programs/${programId}`
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

export const addProgram = program => {
  const url = 'programs'
  return axios
  .post(url, program, config)
  .then(response => parseResponse(response))
  .catch( error => {
    _handleError(error)
    return {}
  })
}

export const updateProgram = program => {
  const url = `programs/${program.id}`
  return axios
    .put(url, program, config)
    .then(response => {
      const data = parseResponse(response)
      return data
    })
    .catch(error => {
      _handleError(error)
      return {}
    })
}

const _handleError = error => {
  console.log(`[${NAME}]: ${error}`)
  // console.log(JSON.stringify(error))
}

const parseResponse = (response) => {
  // console.log({response})
  return response.data;
}