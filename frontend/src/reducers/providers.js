import { PROVIDERS } from '../actions/types';

const initialState = {
    list: [],
    pages: 1, 
    currentPage: 1,
    filter_window: false
};

export default (state = initialState, action) => {

    const { type, payload } = action;

    switch ( type ) {
        case PROVIDERS.FIND:
            return {
                ...state,
                list: payload.providers,
                pages: payload.pages,
                currentPage: payload.currentPage
            };

        case PROVIDERS.ADD:
            let providers_add = state.list;

            providers_add = [
                ...providers_add, payload
            ];

            providers_add = providers_add.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });

            return {
                ...state, 
                list: providers_add
            };

        case PROVIDERS.EDIT:
            let providers_edit = state.list;

            providers_edit = providers_edit.map(provider => provider.id === payload.id ? payload : provider);

            providers_edit = providers_edit.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });

            return {
                ...state, 
                list: providers_edit
            };

        case PROVIDERS.DELETE:
            return {
                ...state,
                list: state.list.filter( provider => provider.id !== payload )
            };
        
        default:
            return state;
    }
}