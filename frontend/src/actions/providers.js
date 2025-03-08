import axios from 'axios';

import { PROVIDERS } from './types';

import { setAlert } from './alert';
import { changeLoader } from './loader';

export const findProviders = (filters) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(filters);

    try{
        await dispatch(changeLoader(true));
        const res = await axios.post(`${process.env.REACT_APP_API_ROUTE}/providers/list`, body, config);
        await dispatch(changeLoader(false));

        await dispatch({
            type: PROVIDERS.FIND,
            payload: res.data
        });
    } catch (error){ 
        await dispatch(changeLoader(false));

        if(error?.response?.data?.msg) {
            await dispatch(setAlert(error?.response?.data?.msg, 'danger'));
        }
    }
}

export const getProvider = (id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = {
        id
    };

    try{
        await dispatch(changeLoader(true));
        const res = await axios.post(`${process.env.REACT_APP_API_ROUTE}/providers/details`, body, config);
        await dispatch(changeLoader(false));

        await dispatch({
            type: PROVIDERS.DETAILS,
            payload: res.data.provider
        });
    } catch (error){ 
        await dispatch(changeLoader(false));

        if(error?.response?.data?.msg) {
            await dispatch(setAlert(error?.response?.data?.msg, 'danger'));
        }
    }
}

export const addProvider = (provider) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(provider);

    try{
        await dispatch(changeLoader(true));
        const res = await axios.post(`${process.env.REACT_APP_API_ROUTE}/providers/add`, body, config);
        await dispatch(changeLoader(false));

        await dispatch({
            type: PROVIDERS.ADD,
            payload: res.data.provider
        });

        await dispatch(setAlert(res.data.msg, 'success'));
    } catch (error){ 
        await dispatch(changeLoader(false));

        if(error?.response?.data?.msg) {
            await dispatch(setAlert(error?.response?.data?.msg, 'danger'));
        }
    }
}

export const editProvider = (provider) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(provider);

    try{
        await dispatch(changeLoader(true));
        const res = await axios.post(`${process.env.REACT_APP_API_ROUTE}/providers/edit`, body, config);
        await dispatch(changeLoader(false));

        await dispatch({
            type: PROVIDERS.EDIT,
            payload: res.data.provider
        });

        await dispatch(setAlert(res.data.msg, 'success'));
    } catch (error){ 
        await dispatch(changeLoader(false));

        if(error?.response?.data?.msg) {
            await dispatch(setAlert(error?.response?.data?.msg, 'danger'));
        }
    }
}

export const deleteProvider = (id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = {
        id
    };

    try{
        await dispatch(changeLoader(true));
        const res = await axios.post(`${process.env.REACT_APP_API_ROUTE}/providers/delete`, body, config);
        await dispatch(changeLoader(false));

        await dispatch({
            type: PROVIDERS.DELETE,
            payload: id
        });

        await dispatch(setAlert(res.data.msg, 'success'));
    } catch (error){ 
        await dispatch(changeLoader(false));

        if(error?.response?.data?.msg) {
            await dispatch(setAlert(error?.response?.data?.msg, 'danger'));
        }
    }
}