import axios from 'axios';

// export const config = {
// baseURL: 'http://localhost:3003'
// }

export const axiosFood = axios.create({
  baseURL: "http://localhost:3030/",
  timeout: 10000
  // headers: {'X-Custom-Header': 'foobar'}
});
