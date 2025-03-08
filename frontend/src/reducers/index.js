import { combineReducers } from 'redux';

import alert from './alert';
import loader from './loader';

import home from './home';
import providers from './providers';

//Patron de diseño:

//Aqui estamos usando "Singleton Pattern" para la union de mi estado y mi consulta unica a partir del mismo.

export default combineReducers({
    alert, loader, home, providers
});