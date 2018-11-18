import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import SocialText from './SocialText';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

//CONSTANTES
const FETCH_USERS_BEGIN   = 'FETCH_USERS_BEGIN';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

/* const initialState = {
    authors: []
} */
const fullname = name => `${name.first} ${name.last}`

export const getAuthorsDatafromAPI =  () => async dispatch => {
    try {
      dispatch({type: FETCH_USERS_BEGIN })
      const response = await fetch('https://randomuser.me/api/?results=100&seed=abc')
      const rawAuthors = await response.json();
      const authors = [];
      rawAuthors.results.forEach(author =>{
        let newAuthor = {};
        var {email, picture, name, login} = author;
        newAuthor.email = email
        newAuthor.picture = picture.medium
        newAuthor.fullname = fullname(name)
        newAuthor.username = login.username
        newAuthor.password = login.password
        newAuthor.id = login.uuid
        authors.push(newAuthor)
      }

      )
      dispatch({type: FETCH_USERS_SUCCESS, payload: authors})
    }catch(err){
      dispatch({type: FETCH_USERS_FAILURE, payload:'Error al cargar la lista de usuarios'})
      console.log(err.message, 'error al cargar la lista de usuarios')
    }
  }


// ACTIONS CREATORS
  export const checkLogin =  (username, password) => dispatch =>{
    const authorCopy = [...store.getState().authors]
    let authorLogged = false;
    authorCopy.forEach( author => {
          if (author.username === username && author.password === password){
            authorLogged = true;
            const requests = JSON.parse(localStorage.getItem(`requestsOf:${author.id}`))
            dispatch ({ type: 'AUTHOR_LOGGED', payload: {author, requests}})
          }
    })
    if (!authorLogged){
        dispatch({type:'LOGIN_ERROR'})
    }
 }

 export const logOut = () =>({type:'AUTHOR_LOGGED_OUT', payload:{author: null, loginError: null, requests: null}})

 export const selectAuthor = (authorSelectedId) => dispatch =>{
    const authorCopy = [...store.getState().authors]
    authorCopy.forEach(  (author) => {
      if(author.id === authorSelectedId){
        let selectedAuthorRequests = JSON.parse(localStorage.getItem(`requestsOf:${author.id}`));
        let selectedAuthorMessages = JSON.parse(localStorage.getItem(`messagesOf${author.id}`));
        const requests = selectedAuthorRequests ? selectedAuthorRequests : null;
        const messages = selectedAuthorMessages  ? selectedAuthorMessages : null;
        author.requestState = getAllRequests(author);
        dispatch({type:'AUTHOR_SELECTED', payload: {author, requests, messages}} ) 
      }
    })
   
  }
  const getAllRequests = (author) =>{
    const authorLogged = store.getState().authorLogged.author
    let requests = JSON.parse(localStorage.getItem(`requestsOf:${author.id}`))
    let requestAccepted = null;
      if (requests){
      requests.forEach( request =>{
        // If there is a request to this author, set "showMessage" to true if the request have been accepted
        // If the request has not been answered yet, set "requestNotAnswered" to true.
        if (authorLogged.id === request.user.id ){
          request.accepted ? requestAccepted = true : requestAccepted = false
        }
      })
    }
    return requestAccepted;
}

  export const sendRequest = (author) => {
    const authorRequests = JSON.parse(localStorage.getItem(`requestsOf:${author.id}`))
    const authorLogged = store.getState().authorLogged.author
    if (!authorRequests){
       localStorage.setItem(`requestsOf:${author.id}`, JSON.stringify([{user: authorLogged, accepted: false}]))
    }else{
      authorRequests.push({user: authorLogged, accepted: false})
      localStorage.setItem(`requestsOf:${author.id}`, JSON.stringify(authorRequests))
    }
    author.requestState = getAllRequests(author);
    return {type: 'REQUEST_SEND', payload:  {author: author, request: [{user: authorLogged, accepted: false}] }}
    //this.getAllRequests(author);
  }

  export const toggleRequest = (id) =>{
    const authorLogged = store.getState().authorLogged
    const authorLoggedRequests = authorLogged.requests
    authorLoggedRequests.forEach(request => {
       if (request.user.id ===id){
        !request.accepted ? request.accepted = true : request.accepted = false
       }
    })
    localStorage.setItem(`requestsOf:${authorLogged.author.id}`, JSON.stringify(authorLoggedRequests))
    return { type:'UPDATE_REQUESTS', payload: authorLoggedRequests}
  }

  export const saveMessage = (message) =>{
    const authorLogged = store.getState().authorLogged.author;
    let authorMessages = localStorage.getItem(`messagesOf${authorLogged.id}`);
    if(!authorMessages){
      let authorMessageList = []
      authorMessageList.push(message)
      localStorage.setItem(`messagesOf${authorLogged.id}`, JSON.stringify(authorMessageList))
      return { type:'SAVE_MESSAGE', payload: authorMessageList }
    }else{
      let authorMessagesListCopy = JSON.parse(authorMessages);
      authorMessagesListCopy.push(message);
      localStorage.setItem(`messagesOf${authorLogged.id}`, JSON.stringify(authorMessagesListCopy))
      return { type:'SAVE_MESSAGE', payload: authorMessagesListCopy }
    }
  }


//REDUCERS
const getAuthorsDatafromAPIReducer = (state = null, action) =>{
    switch (action.type) {
        case 'FETCH_USERS_BEGIN':
            return null;
        case 'FETCH_USERS_SUCCESS':
            return action.payload;
        case 'FETCH_USERS_FAILURE':
            return  {loadingError: action.payload};
        default:
         return state
    }
}

const authorLoggedReducer = (state = {author: null, loginError: null, requests:null}, action) => {
    switch (action.type) {
        case 'AUTHOR_LOGGED':
            return {...state, author: action.payload.author, requests: action.payload.requests};
        case 'LOGIN_ERROR':
            return {...state, loginError: true};
        case 'AUTHOR_LOGGED_OUT':
        return action.payload;
        case 'UPDATE_REQUESTS':
        return {...state, requests: action.payload}
        default:
         return state
    }
}

const authorSelectedReducer = (state= {author: null, messages: null, requests: null}, action) => {
    switch (action.type) {
        case 'AUTHOR_SELECTED':
            return {...state, author: action.payload.author, requests: action.payload.requests, messages: action.payload.messages};
        case 'REQUEST_SEND':
            return {...state, requests: action.payload};
        case 'SAVE_MESSAGE':
            return {...state, messages: action.payload};
        default:
         return state
    }
}

const loadState = () =>{
    try {
        const serialisedState = localStorage.getItem('socialtext-state');
        if (serialisedState === null){
            return undefined;
        }
        return JSON.parse(serialisedState);
    } catch (error) {
        return undefined;
    }
}

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('socialtext-state', serializedState)
    } catch (error) {

    }
}

const persistedState = loadState();

const rootReducer = combineReducers({
    authors: getAuthorsDatafromAPIReducer,
    authorLogged: authorLoggedReducer,
    authorSelected: authorSelectedReducer,

});

//STORE
const store = createStore(
    rootReducer, persistedState, applyMiddleware(thunk)
);

store.subscribe(() => {
       saveState(store.getState());
})
window.store = store;


ReactDOM.render(<Provider store={store}><SocialText /></Provider>, document.getElementById('root'));
registerServiceWorker();
