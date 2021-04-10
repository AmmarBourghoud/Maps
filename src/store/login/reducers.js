import { login } from './actions'

const defaultState = {
  user: {
    email: '',
    password: '',
    state: ''
  }
}

const loginUser = (state = defaultState, action) => {
  switch (action.type) {
    case login.USER_LOGIN:
    console.log('login', action.payload.user)
      return {
        ...state,
        user: action.payload.user,
      }
    default:
      return state;
  }
};

export default loginUser;