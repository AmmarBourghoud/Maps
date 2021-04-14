import {Action} from 'redux'
import {ThunkDispatch, ThunkAction} from 'redux-thunk'

import {DataStateType} from './data/types'

type StoreType = {
    data: DataStateType
    singleData: DataStateType
}

export type ThunkResultType<R> = ThunkAction<R, StoreType, any, Action>
export type DispatchType = ThunkDispatch<StoreType, any, Action>
