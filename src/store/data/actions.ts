import {BASE_PATH, REQUEST_GET_DATA, REQUEST_GET_SINGLE_DATA} from '../../api/paths/paths'
import axios from 'axios'

// const for data
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const RECEIVE_SINGLE_DATA = 'RECEIVE_SINGLE_DATA'

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

export function getSingleData(dispatch: any, id: any) {
  return (dispatch: any) => axios
  .get(BASE_PATH + REQUEST_GET_SINGLE_DATA(id))
    .then(response => {
      dispatch(receiveSingleData(response.data.records))
    })
    .catch(err => {
      console.log(err)
    })
}

export function receiveSingleData(json: any) {
  return {
    type: RECEIVE_SINGLE_DATA,
    data: json,
    loading: false,
  }
}
