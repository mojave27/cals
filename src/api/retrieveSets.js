import axios from "axios";
import { config } from '../config/axiosConfig'

const retrieve = () => {
  const url = 'sets'

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
    // console.log(response.data)
    return response.data;
}

export default retrieve;