import React, {useReducer} from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axiosClient from '../../config/axios';
import tokenAuth from '../../config/token';
import { 
    SUCCESS_REGISTRATION,
    ERROR_REGISTRATION,
    GET_USER,
    SUCCESS_LOGIN,
    ERROR_LOGIN,
    LOGOUT,
    } from '../../types/index';

const AuthState = props => {
    
    const initialState = {
        token: localStorage.getItem('token'),
        auth: null,
        user: null,
        msg: null,
        loading: true
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Registrar un usuario
    const registerUser = async (data) => {
        try {
            const response = await axiosClient.post('/api/users', data); 
            dispatch({
                type: SUCCESS_REGISTRATION,
                payload: response.data
            });
            // Obtener el usuario 
            authUser();

        } catch (error) {
            //console.log(error.response.data.msg);
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            };
            dispatch({
                type: ERROR_REGISTRATION,
                payload: alert
            });
        }
    };

    // Logueo del usuario
    const loginUser = async (data) => {
        try {
            const response = await axiosClient.post('/api/auth', data);
            //console.log(response);
            dispatch({
                type: SUCCESS_LOGIN,
                payload: response.data
            });
            //Obtener el usuario 
            authUser();

        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            };
            dispatch({
                type: ERROR_LOGIN,
                payload: alert
            });
        }
    };

    const logoutUser = () => {
        dispatch({
            type: LOGOUT,
        });
    };

    // Retornar usuario autenticado
    const authUser = async () => {
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        };
        try {
            const response = await axiosClient.get('/api/auth');
            const user = response.data.user
            dispatch({
                type: GET_USER,
                payload: user
            });
            
        } catch (error) {
            //console.log(error.response.data.msg);
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            };
            dispatch({
                type: ERROR_LOGIN,
                payload: alert
            })
        }
    };
    
    
    return ( 
        <AuthContext.Provider
            value={{
                token: state.token,
                auth: state.auth,
                user: state.user,
                msg: state.msg,
                loading: state.loading,
                registerUser,
                loginUser,
                logoutUser,
                authUser
            }}
        >
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthState;