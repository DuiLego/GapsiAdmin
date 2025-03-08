import axios from 'axios';

import setAuthToken from '../utils/setAuthToken';

import { setAlert } from './alert';
import { changeLoader } from './loader';

import { HOME } from './types';

export const login = (user) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(user);

    try {
        await dispatch(changeLoader(true));
        const res = await axios.post(`${process.env.REACT_APP_API_ROUTE}/home/login`, body, config);
        await dispatch(changeLoader(false));

        await dispatch({
            type: HOME.LOGIN,
            payload: res.data
        });
    } catch (error) {
        await dispatch(changeLoader(false));

        if(error?.response?.data?.msg) {
            await dispatch(setAlert(error?.response?.data?.msg, 'danger'));
        }

        await dispatch({
            type: HOME.LOGIN_ERROR
        });
    }
}

export const signup = (user) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }

    try {
        await dispatch(changeLoader(true));
        const res = await axios.post(`${process.env.REACT_APP_API_ROUTE}/home/signup`, user, config);
        await dispatch(changeLoader(false));

        await dispatch({
            type: HOME.SESSION_ERROR,
            payload: res.data.user
        });

        await dispatch(setAlert(res.data.msg, 'success'));
    } catch (error) {
        await dispatch(changeLoader(false));

        if(error?.response?.data?.msg) {
            await dispatch(setAlert(error?.response?.data?.msg, 'danger'));
        }

        await dispatch({
            type: HOME.LOGIN_ERROR
        });
    }
}

export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try{
        await dispatch(changeLoader(true));
        const res = await axios.get(`${process.env.REACT_APP_API_ROUTE}/home/session`);
        await dispatch(changeLoader(false));

        await dispatch({
            type: HOME.SESSION,
            payload: res.data.user
        });
    } catch (error){
        await dispatch(changeLoader(false));     

        await dispatch({
            type: HOME.SESSION_ERROR, 
            payload: error?.response?.data?.user || null
        });
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: HOME.LOGOUT
    });
}