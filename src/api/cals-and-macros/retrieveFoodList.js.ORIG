// import axios from "axios";
import { axiosFood } from '../config/apiConfig';

const retrieveFoodList = searchTerm => {
  const url = `foodItems?foodName=${searchTerm}`;
  return axiosFood
    .get(url)
    .then(function(response) {
      // handle success
      return parseResponse(response);
    })
    .catch(function(error) {
      // handle error
      console.log(`[retrieveFoodList] api error: ${error}`);
      return [];
    });
};

const parseResponse = (response) => {
    let initialList = response.data.response.list.item;
    let parsedList = initialList.map(item => {
        return {
            group: item.group,
            name: item.name,
            ndbno: item.ndbno
        }
    })
    return parsedList;
}

export default retrieveFoodList;