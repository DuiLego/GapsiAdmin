import { combineReducers } from 'redux';

import alert from './alert';
import loader from './loader';

import home from './home';
import providers from './providers';

export default combineReducers({
    alert, loader, home, providers
});