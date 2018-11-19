import {combineReducers} from 'redux';
import {
    FETCH_AUTHORS_BEGIN,
    FETCH_AUTHORS_SUCCESS,
    FETCH_AUTHORS_FAILURE,
    LOGIN_STARTED,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGGED_OUT,
    UPDATE_REQUESTS,
    AUTHOR_SELECTED,
    REQUEST_SEND,
    SAVE_MESSAGE
} from '../Actions/actionTypes'


const getAuthorsDatafromAPIReducer = (state = null, action) =>{
    switch (action.type) {
        case FETCH_AUTHORS_BEGIN:
            return {loading:'true'};
        case FETCH_AUTHORS_SUCCESS:
            return action.payload;
        case FETCH_AUTHORS_FAILURE:
            return  {loadingError: action.payload};
        default:
            return state
    }
}

const authorLoggedReducer = (state = {author: null, loginStarted: null, loginError: null, requests:null}, action) => {
    switch (action.type) {
        case LOGIN_STARTED:
            return {...state, loginStarted: true};
        case LOGIN_SUCCESS:
            return {...state, loginStarted: null, author: action.payload.author, requests: action.payload.requests};
        case LOGIN_ERROR:
            return {...state, loginStarted: null, loginError: true};
        case LOGGED_OUT:
             return action.payload;
        case UPDATE_REQUESTS:
            return {...state, requests: action.payload}
        default:
            return state
    }
}

const authorSelectedReducer = (state= {author: null, messages: null, requests: null}, action) => {
    switch (action.type) {
        case AUTHOR_SELECTED:
            return {...state, author: action.payload.author, requests: action.payload.requests, messages: action.payload.messages};
        case REQUEST_SEND:
            return {...state, author: action.payload.author, requests: action.payload.requests};
        case SAVE_MESSAGE:
            return {...state, messages: action.payload};
        default:
            return state
    }
}

const rootReducer = combineReducers({
    authors: getAuthorsDatafromAPIReducer,
    authorLogged: authorLoggedReducer,
    authorSelected: authorSelectedReducer,

});

export default rootReducer;