import {UserType} from '../types/user'

export function login(user:UserType) {
  console.log('action',user);
  
    return {
      type: 'USER_LOGIN',
      user
    }
  }