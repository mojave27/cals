import axios from "axios";
import { config } from '../config/axiosConfig'

export const retrieveDataConsistencyReport = () => {
  const url = 'admin/consistency-check'
  return axios
    .get(url, config)
    .then(function(response) {
      const data = parseResponse(response)
      return data
    })
    .catch(function(error) {
      // handle error
      console.log(`[api error]: ${error}`);
      return [];
    });
};


const parseResponse = (response) => {
    return response.data;
}
