import {
    LOGIN,
    LOGOUT,
    SET_USERNAME,
    GET_USERNAME
} from '../actions/userActions'
// action types
//初始数据
const initialState = {
  username: localStorage.getItem('username')||'',
  token:localStorage.getItem('token')||'',
  avatar: localStorage.getItem('token')||''
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('token', action.token); 
      localStorage.setItem('username', action.username); 
      localStorage.setItem('avatar', action.avatar); 
      return {
        ...state,
        username: action.username,
        token: action.token,
        avatar:action.avatar
      }
    case LOGOUT:
      localStorage.removeItem('token'); 
      localStorage.removeItem('username'); 
      localStorage.removeItem('avatar'); 
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