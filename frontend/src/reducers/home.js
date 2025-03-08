import { HOME } from '../actions/types';

import setAuthToken from '../utils/setAuthToken';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: null
}

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case HOME.LOGIN:
            localStorage.setItem('token', payload.token); 
            setAuthToken(localStorage.token);

            return {
                ...state, 
                ...payload,
                isAuthenticated: true
            };

        case HOME.LOGIN_ERROR:
            localStorage.removeItem('token');
            
            return {
                ...state,
                token: null,
                isAuthenticated: false
            };

        case HOME.SESSION_ERROR: 
        case HOME.LOGOUT: 
            localStorage.removeItem('token');
            
            return {
                ...state,
                token: null,
                user: payload, 
                isAuthenticated: false
            };

        case HOME.SESSION:
            return {
                ...state,
                isAuthenticated: true,
                user: payload
            };

        default:
            return state;
    }
}