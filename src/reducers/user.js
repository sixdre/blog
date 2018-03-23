
// action types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SET_USERNAME = 'SET_USERNAME';
const GET_USERNAME = 'GET_USERNAME';
const SET_AVATAR='SET_AVATAR';

//初始数据也
const initialState = {
  username: '',
  token:'',
  avatar: ''
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('token', action.token); 
      return {
        ...state,
        username: action.username,
        token: action.token,
        avatar:action.avatar
      }
    case LOGOUT:
      localStorage.removeItem('token'); 
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