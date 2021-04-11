import {DataType} from '../types/data'

export type DataReceived = {
  type: 'DATA_RECEIVED'
  payload: DataType[]
  loading: boolean
}

export type DataStateType = {
    list: DataType[]
    loading: boolean
}  