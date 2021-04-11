import * as actions from './actions' 

const defaultState = {
    data: []
}

export default ( state:any = defaultState, action: any ) => {
  switch (action.type) {

    case actions.FETCH_DATA:
      console.log("FETCH_DATA ACTION LOADING", action)
      return {
        ...state,
        loading: true
      }
    
    case actions.RECEIVE_DATA:
      console.log("DATA RECEIVED", action)
      return {
        ...state,
        data: action.data,
        loading: false
      }

    default:
      return {
        ...state,
      } 
  }
 }; 
