import {
    LOGIN,
    LOGOUT,
    SET_USERNAME
} from '../actions/userActions'

import $storage from '../../services/storage'
import Auth from '../../services/auth'
// action types
//初始数据
const initialState = {
    username: $storage.user.getUserName() || '',
    userId: $storage.user.getUserId() || '',
    token: $storage.user.getToken() || '',
    avatar: $storage.user.getAvatar() || ''
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            Auth.login({
                username: action.username,
                avatar: action.avatar,
                token: action.token,
                userId: action.userId
            })
            return {
                ...state,
                username: action.username,
                token: action.token,
                avatar: action.avatar,
                userId: action.userId
            }
        case LOGOUT:
            Auth.logout();
            return {
                ...state,
                username: '',
                token: '',
                avatar: '',
                userId: ''
            }
        case SET_USERNAME:
            return {
                ...state,
                username: action.username
            }
        default:
            return state
    }
}


export default user