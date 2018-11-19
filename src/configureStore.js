import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import rootReducer from './Reducers/index';
import { loadState, saveState} from './localStorage';

const configureStore = () => {
    const persistedState = loadState();
    const store = createStore(
        rootReducer, persistedState, applyMiddleware(thunk)
    );

    store.subscribe(throttle(() => {
        saveState(store.getState());
    }, 1000));
    
    return store;
};

export default configureStore;