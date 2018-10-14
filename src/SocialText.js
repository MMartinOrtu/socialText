import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Components/Header';
import Authors from './Components/Authors';
import AuthorProfile from './Components/AuthorProfile';
import Requests from './Components/Requests';
import Navigation from './Components/Navigation';
import fondo from './Images/fondo.jpg';

class SocialText extends Component {
  state = {
    islogged: false,
    loginError: null,
    authors:[],
    currentUser:{},
    selectedAuthor:{},
    currentUserRequests: null,
    messages: null,
    error:null
  }

  // This method select an author when the current user click on the "See profile" button,
  // save the selected author in the state, in localStorage and get its messages and its subscriptions requests from LocalStorage
  selectAuthor = (authorSelectedId) =>{
    this.state.authors.forEach( author => {
      if(author.id === authorSelectedId){
        this.setState({ selectedAuthor: author })
        localStorage.setItem('selectedAuthor', JSON.stringify(author))
        this.getMessages(author)
        this.getAllRequests(author);
      }
    })
  }

  // This method get the select author's messages from LocalStorage and save them in the state
  getMessages = (author) => {
    let authorMessages = localStorage.getItem(`messagesOf${author.id}`)
      if(authorMessages){
        this.setState({ messages: JSON.parse(authorMessages) })
      }
  }

  // This method save the messages written of the current user and save them in the state and LocalStorage
  saveMessage = (message) =>{
    if(!this.state.messages){
      let userMessage = []
      userMessage.push(message)
      this.setState({ messages: userMessage })
      localStorage.setItem(`messagesOf${this.state.currentUser.id}`, JSON.stringify(userMessage))
    }else{
      let userMessagesCopy = [...this.state.messages]
      userMessagesCopy.push(message)
      this.setState({ messages: userMessagesCopy })
      localStorage.setItem(`messagesOf${this.state.currentUser.id}`, JSON.stringify(userMessagesCopy))
    }
  }

  // This method get the selected author subscription request from LocalStorage
  // if the current user has made a request to the selected author,
  // set a new properties to that author in order to display different things on screen depending on the subscription state
  getAllRequests = (author) =>{
      let requests = JSON.parse(localStorage.getItem(`requestsOf:${author.id}`))
        if (requests){
        requests.forEach( request =>{
          // If there is a request to this author, set "showMessage" to true if the request have been accepted
          // If the request has not been answered yet, set "requestNotAnswered" to true.
          if (this.state.currentUser.id === request.user.id ){
            request.accepted ? author.showMessages = true : author.requestNotAnswered = true
          }
        })
      }
    this.setState({ selectedAuthor: author })
  }

  // This method send the current user subscription request to an author to LocalStorage and update that author state
  sendRequest = (author) => {
    let authorRequests = JSON.parse(localStorage.getItem(`requestsOf:${author.id}`))
    if (!authorRequests){
       localStorage.setItem(`requestsOf:${author.id}`, JSON.stringify([{user: this.state.currentUser, accepted: false}]))
    }else{
      authorRequests.push({user: this.state.currentUser, accepted: false})
      localStorage.setItem(`requestsOf:${author.id}`, JSON.stringify(authorRequests))
    }
    this.getAllRequests(author);
  }

  //This method trigers when a usar accept or deny a subscription request
  toggleRequest = (id) =>{
    let currentUser = this.state.currentUser
    let updatecurrentUserRequests = [...this.state.currentUserRequests]
    updatecurrentUserRequests.forEach(request => {
       if (request.user.id ===id){
        !request.accepted ? request.accepted = true : request.accepted = false
       }
    })
    this.setState({ currentUserRequests: updatecurrentUserRequests })
    localStorage.setItem(`requestsOf:${currentUser.id}`, JSON.stringify(updatecurrentUserRequests))
  }

  // This method triggers when the user log out
  logOut = () => {
    localStorage.setItem('currentUser', '')
    this.setState({
      islogged: false,
      loginError:'',
      currentUser: null,
      selectAuthor: null,
      messages: null,
      currentUserRequests: null
    })
    // Call getData method to delete all the changes in the authors list during the last session
    this.getData();
  }

  // This method check  the login and set the initial values of the state to the user logged (currentUser)
  checkLogin = (username, password) => {
    this.state.authors.forEach( author => {
      if (author.username === username && author.password === password){
          localStorage.setItem('currentUser', JSON.stringify(author))
          author.currentUser = true;
          let currentUserRequests = localStorage.getItem(`requestsOf:${author.id}`)
            this.setState({
              islogged: true,
              currentUser:author,
              currentUserRequests: JSON.parse(currentUserRequests)
            })
      }
    })
    if(!this.state.islogged){
      this.setState({
        loginError: true
      })
    }
  }

  // This method get the user's list from an API
  getData = async (currentUser) =>{
    let userLogged = false;
    if (currentUser){
      userLogged= true;
    }
    try {
        const response = await fetch('https://randomuser.me/api/?results=100&seed=abc')
        response.json()
        .then( ({results}) => {
          const authors = [];
          results.forEach(author =>{
            let newAuthor = {};
            var {email, picture, name, login} = author;

            if (userLogged && currentUser.id === login.uuid){
                newAuthor.currentUser = true
            }
            newAuthor.email = email
            newAuthor.picture = picture.medium
            newAuthor.fullname = fullname(name)
            newAuthor.username = login.username
            newAuthor.password = login.password
            newAuthor.id = login.uuid
            authors.push(newAuthor)
          })
          this.setState({ authors: authors })
        })
      }catch(err){
        this.setState({
          error: 'Error al cargar la lista de usuarios'
        })
        console.log(err.message, 'error al cargar la lista de usuarios')
      }
  }

  // This method set the initial setiings and state
  componentDidMount() {
        let userLogged = localStorage.getItem('currentUser')
        if (userLogged){
          let currentUserFromLS=JSON.parse(userLogged)
          let currentUserRequests = JSON.parse(localStorage.getItem(`requestsOf:${currentUserFromLS.id}`))
          let selectedAuthor = JSON.parse(localStorage.getItem('selectedAuthor'))
          if(selectedAuthor){
            this.getMessages(selectedAuthor)
          }
          this.getData(currentUserFromLS)
          this.setState({
              currentUser: currentUserFromLS,
              currentUserRequests: currentUserRequests,
              selectedAuthor: selectedAuthor,
              islogged: true})
        } else {
          this.getData()
        }
  }

  render() {
    return (
    <BrowserRouter>
      <React.Fragment>
        <Header checklogin={this.checkLogin} islogged={this.state.islogged} loginError={this.state.loginError} logOut={this.logOut} currentUser={this.state.currentUser}/>
          {
              this.state.error &&
              <span className="conection-error">{ this.state.error }</span>
          }
          {
            this.state.islogged ?
            <Switch>
              <Route  exact path="/" render={() => (
                <div>
                  <Navigation currentUser={this.state.currentUser} selectedAuthor={this.selectAuthor}/>
                  <Authors authors={this.state.authors} selectedAuthor={this.selectAuthor} currentUser={this.state.currentUser} />
                </div>
              )}/>

              <Route  exact path="/profile/:idauthor" render={() =>(
                  <AuthorProfile author={this.state.selectedAuthor} sendRequest={this.sendRequest} saveMessage={this.saveMessage} messages={this.state.messages} currentUser={this.state.currentUser} selectedAuthor={this.selectAuthor}/>
              )}/>

              <Route  exact path="/requests/:idauthor" render={() =>(
                  <Requests currentUserRequests={this.state.currentUserRequests} currentUser={this.state.currentUser} toggleRequest={this.toggleRequest} selectedAuthor={this.selectAuthor}/>
              )}/>
            </Switch> :
            <img src={fondo} alt={'Imagen de portada'}/>

          }
      </React.Fragment>
    </BrowserRouter>
    )
  }
}

export default SocialText;

const fullname = name => `${name.first} ${name.last}`
