import axios from "axios";
import { config } from '../config/lambdaConfig'
import { getAxiosConfigWithAuth } from '../components/Auth/Auth'
import { retrieveItemById } from 'list-utils'

const URL = 'programs'
const NAME = 'programsApi'

export const retrievePrograms = async (searchTerm) => {
  let config = await getAxiosConfigWithAuth()
  return axios
    .get(URL, config)
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

export const retrieveProgramById = async (id) => {
  const programs = await retrievePrograms()
  let program = retrieveItemById(id, programs)
  console.log(program)
  return program
  // const url = `programs/${programId}`
  // return axios
  //   .get(url, config)
  //   .then(function (response) {
  //     const data = parseResponse(response)
  //     return data
  //   })
  //   .catch(function (error) {
  //     _handleError(error)
  //     return [];
  //   });
};

export const addProgram = async (program) => {
  let config = await getAxiosConfigWithAuth()
  const URL = 'programs'
  return axios
  .post(URL, program, config)
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
}

const parseResponse = (response) => {
  return response.data;
}
