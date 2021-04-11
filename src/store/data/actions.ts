import {BASE_PATH, REQUEST_GET_DATA} from '../../api/paths/paths'
import axios from 'axios'

// const for data
export const FETCH_DATA = 'FETCH_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';

export function getData(dispatch: any) {
    return (dispatch: any) => axios
    .get(BASE_PATH + REQUEST_GET_DATA)
    .then(response => {
      dispatch(receiveData(response.data.records))
    })
    .catch(err => {
      console.log(err);
     })
  }

export function receiveData(json: any) {
    return {
      type: RECEIVE_DATA,
      data: json,
      loading: false,
    }
}
