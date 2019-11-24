import axios from "axios";
import { config } from '../config/axiosConfig'

const addSet = set => {
  const url = 'sets'

  let data = {...set}

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
    });
};

const parseResponse = (response) => {
    console.log(response.data)
    return response.data
}

export default addSet