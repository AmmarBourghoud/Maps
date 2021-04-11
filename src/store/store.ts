import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { useDispatch as reduxUseDispatch} from 'react-redux'

import dataReducer from './data/reducers';
import {DispatchType} from './types'
import * as dataActions from './data/actions' 

let store = createStore(dataReducer,compose(applyMiddleware(thunk)));

store.dispatch(dataActions.getData(store.dispatch));

export default store

export function useDispatch(): DispatchType {
  return reduxUseDispatch()
}  