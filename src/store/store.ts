import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {useDispatch as reduxUseDispatch} from 'react-redux'

import loginReducer from './login/reducers';
import {DispatchType} from './types'

const store = createStore(
    combineReducers({
        loginUser: loginReducer
    }),
    compose(applyMiddleware(thunk))
  )
  
export default store

export function useDispatch(): DispatchType {
  return reduxUseDispatch()
}  