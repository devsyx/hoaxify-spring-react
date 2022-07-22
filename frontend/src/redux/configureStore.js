import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';
import { setAuthHeader } from '../api/apiCall';

const secureLS = new SecureLS();

const getStateFromStorage = () => {
    const hoaxAuth = secureLS.get('hoax-auth');
    let stateInLocalStorage = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    }
    if (hoaxAuth) {
        return hoaxAuth;
    }
    return stateInLocalStorage;
}
const updateStateInStorage = newState => {
    secureLS.set('hoax-auth', newState);
}
const configureStore = () => {
    const initialState = getStateFromStorage();
    setAuthHeader(initialState);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(authReducer, initialState, composeEnhancers(applyMiddleware(thunk)));
    store.subscribe(() => {
        updateStateInStorage(store.getState());
        setAuthHeader(store.getState())
    });
    return store;
}


export default configureStore;