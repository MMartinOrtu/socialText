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
    messages:{}
  }

  selectAuthor = (id) =>{
    this.state.authors.forEach( author => {
      if(author.id === id){
        this.setState({
          selectedAuthor: author
        })
      }
    })
  }

  checkLogin = (username, password) => {
    this.state.authors.forEach( author => {
        if (author.username === username && author.password === password){
            let usertoDB = JSON.stringify(author)
            localStorage.setItem('currentUser', usertoDB)
            author.currentUser = true;
            let currentUserRequests = localStorage.getItem(`relationsOf:${author.id}`)
            this.setState({
              islogged: true,
              currentUser:author,
              currentUserRequests: JSON.parse(currentUserRequests)
          })
        }
    })
  }

  logOut = () => {    
    localStorage.setItem('currentUser', '')
    this.setState({
      islogged: false,
      currentUser: null,
      selectAuthor: null,
      currentUserRequests: null
    })
  }
  getData = async (currentUser) =>{
    let userLogged = false;
    if (currentUser){
      console.log('ya habia un user')
      userLogged= true;
    }
    const response = await fetch('https://randomuser.me/api/?results=10&seed=abc')
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
      this.setState({
        authors: authors
      })
    })
  }

  sendRequest = (author) => {
    let authorRequests = JSON.parse(localStorage.getItem(`relationsOf:${author.id}`))
    if (!authorRequests){
       localStorage.setItem(`relationsOf:${author.id}`, JSON.stringify([{user: this.state.currentUser, accepted: false}]))
    }else{
      authorRequests.push({user: this.state.currentUser, accepted: false})
      localStorage.setItem(`relationsOf:${author.id}`, JSON.stringify(authorRequests))
    }
  }

  toggleRequest = (id) =>{
    console.log('entra')
    let requestsCopy = this.state.currentUserRequests
    requestsCopy.map(request => {
       if (request.user.id ===id){
        !request.accepted ? request.accepted = true :request.accepted = false
       }
    })
    this.setState({
      currentUserRequests: requestsCopy
    })
  }

 componentDidMount() {
  console.log('didmount')
        let userLogged = localStorage.getItem('currentUser')
        if (userLogged){
          let currentUserFromLS=JSON.parse(userLogged)
          let currentUserRequests = localStorage.getItem(`relationsOf:${currentUserFromLS.id}`)
          this.getData(currentUserFromLS)
          this.setState({
              currentUser: currentUserFromLS,
              currentUserRequests: JSON.parse(currentUserRequests),
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
                  <AuthorProfile author={this.state.selectedAuthor} sendRequest={this.sendRequest} />
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
