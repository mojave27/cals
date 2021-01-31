import axios from "axios";
import { getAxiosConfigWithAuth } from '../components/Auth/Auth'
import { retrieveItemByStringId } from '../components/modules/common/utilties/ArrayUtils'

const URL = 'programs'
const NAME = 'programsApi'

export const retrievePrograms = async (searchTerm) => {
  let config = await getAxiosConfigWithAuth()
  return axios
    .get(URL, config)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      // handle error
      console.log(`[programsApi - retrievePrograms] error: ${error}`);
      return [];
    });
};

export const retrieveProgramById = async (id) => {
  const programs = await retrievePrograms()
  let program = retrieveItemByStringId(id, programs)
  return program
}

export const addProgram = async (program) => {
  console.log(program)
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

export const updateProgram = async (program) => {
  return await addProgram(program)
  // const url = `programs/${program.id}`
  // return axios
  //   .put(url, program, config)
  //   .then(response => {
  //     const data = parseResponse(response)
  //     return data
  //   })
  //   .catch(error => {
  //     _handleError(error)
  //     return {}
  //   })
}

const _handleError = error => {
  console.log(`[${NAME}]: ${error}`)
}

const parseResponse = (response) => {
  return JSON.parse(response.data.body)
}
