import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { useSelector as reduxUseSelector, useDispatch as reduxUseDispatch} from 'react-redux'

import dataReducer from './data/reducers';
import {DispatchType,SelectorType} from './types'

const store = createStore(
    combineReducers({
        data: dataReducer
    }),
    compose(applyMiddleware(thunk))
  )
  
export default store

export function useSelector(selector: SelectorType) {
  return reduxUseSelector(selector)
}

export function useDispatch(): DispatchType {
  return reduxUseDispatch()
}  