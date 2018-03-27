import {
    LOGIN,
    LOGOUT,
    SET_USERNAME,
    GET_USERNAME
} from '../actions/userActions'

import $storage from '../services/storage'
import Auth from '../services/auth'
// action types
//初始数据
const initialState = {
  username: $storage.user.getUserName()||'',
  token:$storage.user.getToken()||'',
  avatar: $storage.user.getAvatar()||''
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      Auth.login({
        username: action.username,
        avatar:action.avatar,
        token:action.token
      })  
      return {
        ...state,
        username: action.username,
        token: action.token,
        avatar:action.avatar
      }
    case LOGOUT:
      Auth.logout();
      return {
        ...state,
        username: '',
        token: '',
        avatar:''
      }
    case SET_USERNAME:
       return {
        ...state,
        username: action.username
      }
    case GET_USERNAME:
      return  action.username
    default:
      return state
  }
}


export default user