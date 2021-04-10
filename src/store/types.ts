import {Action} from 'redux'
import {ThunkDispatch, ThunkAction} from 'redux-thunk'

import {UserType} from './types/user'

type StoreType = {
    user: UserType
}

export type DispatchType = ThunkDispatch<StoreType, any, Action>
export type SelectorType = (store: StoreType) => any
