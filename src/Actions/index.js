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
import {getAuthorRequestsFromLS, getAuthorMessagesFromLS,
setAuthorRequestsToLS, setAuthorMessagesToLS} from '../localStorage';
import {store} from '../index'

//THUNKS y ACTIONS CREATORS
export const getAuthorsDatafromAPI =  () => async dispatch => {
    try {
      dispatch({type: FETCH_AUTHORS_BEGIN})
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
        })
        dispatch({type: FETCH_AUTHORS_SUCCESS, payload: authors})
    }catch(err){
        dispatch({type: FETCH_AUTHORS_FAILURE, payload:'Error al cargar la lista de usuarios'})
        console.log(err.message)
    }
  }

export const checkLogin =  (username, password) => dispatch =>{
    dispatch({type: LOGIN_STARTED})
    const authorCopy = [...store.getState().authors]
    let authorLogged = false;
    authorCopy.forEach( author => {
        if (author.username === username && author.password === password){
            authorLogged = true;
            const requests = getAuthorRequestsFromLS(author.id)
            dispatch ({ type: LOGIN_SUCCESS, payload: {author, requests}})
        }
    })
    if (!authorLogged){
        dispatch({type: LOGIN_ERROR})
    }
}

 export const logOut = () =>({type: LOGGED_OUT, payload:{author: null, loginStarted: null, loginError: null, requests:null}})

 export const selectAuthor = (authorSelectedId) => dispatch =>{
    const authorCopy = [...store.getState().authors];
    authorCopy.forEach(  (author) => {
      if(author.id === authorSelectedId){
        let selectedAuthorRequests = getAuthorRequestsFromLS(author.id);
        let selectedAuthorMessages = getAuthorMessagesFromLS(author.id);
        const requests = selectedAuthorRequests ? selectedAuthorRequests : null;
        const messages = selectedAuthorMessages  ? selectedAuthorMessages : null;
        author.requestState = getAllRequestsState(author);
        dispatch({type: AUTHOR_SELECTED, payload: {author, requests, messages}}) 
      }
    })
  }

export const sendRequest = (author) => {
    let authorRequests = store.getState().authorSelected.requests;
    const authorLogged = store.getState().authorLogged.author;
    if (!authorRequests){
        authorRequests = [{user: authorLogged, accepted: false}]
        setAuthorRequestsToLS(author.id, authorRequests)
    }else{
      authorRequests.push({user: authorLogged, accepted: false})
      setAuthorRequestsToLS(author.id, authorRequests)
    }
    author.requestState = getAllRequestsState(author);
    return {type: REQUEST_SEND, payload: {author: author, requests: authorRequests}}
}

export const toggleRequest = (id) =>{
    const authorLogged = store.getState().authorLogged;
    const authorLoggedRequests = authorLogged.requests;
    authorLoggedRequests.forEach(request => {
       if (request.user.id ===id){
        !request.accepted ? request.accepted = true : request.accepted = false
       }
    })
    setAuthorRequestsToLS(authorLogged.author.id, authorLoggedRequests)
    return { type: UPDATE_REQUESTS, payload: authorLoggedRequests}
}

export const saveMessage = (message) =>{
    const authorLogged = store.getState().authorLogged.author;
    let authorMessages = store.getState().authorSelected.messages;
    if(!authorMessages){
      authorMessages = [message]
      setAuthorMessagesToLS(authorLogged.id, authorMessages)
    }else{
      authorMessages.push(message);
      setAuthorMessagesToLS(authorLogged.id, authorMessages)
    } 
    return { type: SAVE_MESSAGE, payload: authorMessages }
}


//OTHER FUNCTIONS
const fullname = name => `${name.first} ${name.last}`;

const getAllRequestsState = (author) =>{
    const authorLogged = store.getState().authorLogged.author
    let requests = getAuthorRequestsFromLS(author.id);
    let requestAccepted = null;
      if (requests){
      requests.forEach( request =>{
        if (authorLogged.id === request.user.id ){
          request.accepted ? requestAccepted = true : requestAccepted = false
        }
      })
    }
    return requestAccepted;
}