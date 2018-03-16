
// action types
const SET_USERNAME = 'SET_USERNAME';
const GET_USERNAME = 'GET_USERNAME';
const SET_AVATAR='SET_AVATAR';

//初始数据也
const initialState = {
  username: '',
  avatar: ''
}

const user = (state = initialState, action) => {
  switch (action.type) {
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