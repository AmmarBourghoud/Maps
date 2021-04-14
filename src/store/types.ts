import {Action} from 'redux'
import {ThunkDispatch, ThunkAction} from 'redux-thunk'

import {DataStateType} from './data/types'

/** 
  * Specifies the store's type * 
**/
type StoreType = {
    data: DataStateType
    singleData: DataStateType
}

export type DispatchType = ThunkDispatch<StoreType, any, Action>
