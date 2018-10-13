import React, { Component } from 'react';
import Header from './Components/Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Authors from './Components/Authors';
import AuthorProfile from './Components/AuthorProfile';
import Requests from './Components/Requests';
import Navigation from './Components/Navigation';

import './App.css';

class SocialText extends Component {
  state = {
    islogged: false,
    authors:[],
    currentUser:{},
    selectedAuthor:{},
    currentUserRequests:null,
    messages:[]
  }

  selectAuthor = (id) =>{
    this.getAllRequests();
    console.log('entra en select')
    this.state.authors.forEach( author => {
      if(author.id === id){
        console.log('entra en el selected author')
        this.setState({ selectedAuthor: author })
        localStorage.setItem('selectedAuthor', JSON.stringify(author))
        this.getMessages(author)
      }
    })
  }

  getMessages = (author) => {
    let authorMessages = localStorage.getItem(`messagesOf${author.id}`)
        if(authorMessages){
            this.setState({ messages: JSON.parse(authorMessages) })
        }else{
            let noMessagesWarn = ['There is no messages!']
            this.setState({ messages: noMessagesWarn })
        }
    }
 
  getAllRequests = () =>{
    console.log('entra en getAllRequests')
    let  authorsCopy = [...this.state.authors]
    authorsCopy.forEach((author => {
      let requests = JSON.parse(localStorage.getItem(`requestsOf:${author.id}`))
      if (requests){
        console.log('entra')
        requests.forEach( request =>{
             console.log('id del reques', request.user.id)
              console.log('id del author', author.id)
          if (this.state.currentUser.id === request.user.id ){
            console.log('entra en el if getAllRequests')
             request.accepted ? author.showMessages = true : author.requestNotAnswerd = true
          }
        })
      }
    }))
    this.setState({ authors: authorsCopy })
  }

  logOut = () => {
    localStorage.setItem('currentUser', '')
    this.setState({
      islogged: false,
      currentUser: null,
      selectAuthor: null,
      currentUserRequests: null
    })
    this.getData();
  }

  getData = async (currentUser) =>{
    let userLogged = false;
    if (currentUser){
      userLogged= true;
    }
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
  }

  sendRequest = (author) => {
    let authorRequests = JSON.parse(localStorage.getItem(`requestsOf:${author.id}`))
    if (!authorRequests){
       localStorage.setItem(`requestsOf:${author.id}`, JSON.stringify([{user: this.state.currentUser, accepted: false}]))
    }else{
      authorRequests.push({user: this.state.currentUser, accepted: false})
      localStorage.setItem(`requestsOf:${author.id}`, JSON.stringify(authorRequests))
    }
    this.getAllRequests();
  }

  toggleRequest = (id) =>{
    let currentUser = this.state.currentUser
    let updateUserRequests = [...this.state.currentUserRequests]
    updateUserRequests.map(request => {
       if (request.user.id ===id){
         if(!request.accepted){
           request.accepted = true
         }else{
           request.accepted = false
         }
       }
    })
    this.setState({ currentUserRequests: updateUserRequests })
    localStorage.setItem(`requestsOf:${currentUser.id}`, JSON.stringify(updateUserRequests))
  }

  saveMessage = (message) =>{
    if(this.state.messages.length === 0){
      let userMessage = []
      userMessage.push(message)
      this.setState({ messages: userMessage })
      localStorage.setItem(`messagesOf${this.state.currentUser.id}`, JSON.stringify(userMessage))
    }else{
      let userMessagesCopy = [...this.state.messages]
      userMessagesCopy.push(message)
      this.setState({ message: userMessagesCopy })
      localStorage.setItem(`messagesOf${this.state.currentUser.id}`, JSON.stringify(userMessagesCopy))
    }
  }
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
  }
  componentDidMount() {
    console.log('render')
        let userLogged = localStorage.getItem('currentUser')
        if (userLogged){
          let currentUserFromLS=JSON.parse(userLogged)
          let currentUserRequests = JSON.parse(localStorage.getItem(`requestsOf:${currentUserFromLS.id}`))
          /* let userSubscriptions = JSON.parse(localStorage.getItem(`susbcriptionsOf:${currentUserFromLS.id}`)) */
          let selectedAuthor = JSON.parse(localStorage.getItem('selectedAuthor'))
          this.getMessages(selectedAuthor)
          this.getData(currentUserFromLS)
          this.setState({
              currentUser: currentUserFromLS,
              currentUserRequests: currentUserRequests,
              /* userSubscriptions: userSubscriptions, */
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
        <Header checklogin={this.checkLogin} islogged={this.state.islogged} logOut={this.logOut} currentUser={this.state.currentUser}/>
          {this.state.islogged &&
          <Switch>
              <Route  exact path="/" render={() => (
                <div>
                  <Navigation currentUser={this.state.currentUser} selectedAuthor={this.selectAuthor}/>
                  <Authors authors={this.state.authors} selectedAuthor={this.selectAuthor} currentUser={this.state.currentUser} />
                </div>
             )}/>
              <Route  exact path="/profile/:idauthor" render={() =>(
                  <AuthorProfile author={this.state.selectedAuthor} sendRequest={this.sendRequest} saveMessage={this.saveMessage} messages={this.state.messages}/>
              )}/>
              <Route  exact path="/requests/:idauthor" render={() =>(
                  <Requests currentUserRequests={this.state.currentUserRequests} currentUser={this.state.currentUser} toggleRequest={this.toggleRequest} selectedAuthor={this.selectAuthor}/>
              )}/>
          </Switch>
           }
      </React.Fragment>
    </BrowserRouter>
    )
  }
}

export default SocialText;

const fullname = name => `${name.first} ${name.last}`
