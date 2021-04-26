import { 
    SUCCESS_REGISTRATION,
    ERROR_REGISTRATION,
    GET_USER,
    SUCCESS_LOGIN,
    ERROR_LOGIN,
    LOGOUT,
    } from '../../types/index';

export default (state, action) => {
    switch(action.type){
        case SUCCESS_LOGIN:
        case SUCCESS_REGISTRATION:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                auth: true,
                msg: null,
                loading: false
            };
        case ERROR_LOGIN:
        case ERROR_REGISTRATION:
            localStorage.removeItem('token');
             return {
                ...state,
                token: null,
                auth: false,
                user: null,
                msg: action.payload,
                loading: false
             };
        case GET_USER:
            return {
                ...state,
                auth: true,
                user: action.payload,
                loading: false
            };
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                msg: null,
                user: null,
                auth: false,
                loading: false
            };
        default:
            return state;
    }
}