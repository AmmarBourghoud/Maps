import * as actions from './actions' 
import {DataStateType} from './types'

const defaultState = {
    data: [],
    singleData: [],
    loading: true
}

const dataReducer = ( state: DataStateType = defaultState, action: any ) => {
  switch (action.type) {

    case actions.RECEIVE_DATA:
      console.log("DATA RECEIVED", action)
      return {
        ...state,
        data: action.data,
        loading: false
      }
    
    case actions.RECEIVE_SINGLE_DATA:
      console.log("SINGLE DATA RECEIVED", action)
      return {
        ...state,
        singleData: action.data,
        loading: false
      }  

    default:
      return {
        ...state,
      } 
  }
 }; 

export default dataReducer;