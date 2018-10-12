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
    userSubscriptions:null,
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
    this.setSubscriptions()
  }

  setSubscriptions = () =>{
    let  authorsWithSubscriptions = [...this.state.authors]
    if(this.state.userSubscriptions){
      this.state.userSubscriptions.forEach( subcription =>{
         authorsWithSubscriptions.forEach( author =>{
           if(author.id === subcription.id){
             author.showMessages = true
           }
           return;
         })
      })
      this.setState({
        authors:authorsWithSubscriptions
      })

    }
  }

  checkLogin = (username, password) => {
    this.state.authors.forEach( author => {
        if (author.username === username && author.password === password){
            let usertoDB = JSON.stringify(author)
            localStorage.setItem('currentUser', usertoDB)
            author.currentUser = true;
            let currentUserRequests = localStorage.getItem(`requestsOf:${author.id}`)
            let userSubscriptions = localStorage.getItem(`susbcriptionsOf:${author.id}`)
            this.setState({
              islogged: true,
              currentUser:author,
              currentUserRequests: JSON.parse(currentUserRequests),
              userSubscriptions: JSON.parse(userSubscriptions)
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
    this.getData();
  }
  getData = async (currentUser) =>{
    let userLogged = false;
    if (currentUser){
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
    let authorRequests = JSON.parse(localStorage.getItem(`requestsOf:${author.id}`))
    if (!authorRequests){
       localStorage.setItem(`requestsOf:${author.id}`, JSON.stringify([{user: this.state.currentUser, accepted: false}]))
    }else{
      authorRequests.push({user: this.state.currentUser, accepted: false})
      localStorage.setItem(`requestsOf:${author.id}`, JSON.stringify(authorRequests))
    }
  }
  handleSubscriptions = (user, accepted) => {
    let userSubscription = JSON.parse(localStorage.getItem(`susbcriptionsOf:${user.id}`))
    console.log(userSubscription)
    if (!userSubscription){
       localStorage.setItem(`susbcriptionsOf:${user.id}`, JSON.stringify([this.state.currentUser]))
    }else{
      if(accepted){
        userSubscription.push(this.state.currentUser)
        console.log('dentro', userSubscription)
        localStorage.setItem(`susbcriptionsOf:${user.id}`, JSON.stringify(userSubscription))
      }else{
        let newUserSubscription = userSubscription.filter(user => user.id !== this.state.currentUser.id)
        localStorage.setItem(`susbcriptionsOf:${user.id}`, JSON.stringify(newUserSubscription))
      }
    }
  }

  toggleRequest = (id) =>{
    let currentUser = this.state.currentUser
    let updateUserRequests = this.state.currentUserRequests
    updateUserRequests.map(request => {
       if (request.user.id ===id){
         if(!request.accepted){
           request.accepted = true
           this.handleSubscriptions(request.user, request.accepted)
         }else{
           request.accepted = false
           this.handleSubscriptions(request.user, request.accepted)
         }
       }
    })
    this.setState({
      currentUserRequests: updateUserRequests
    })
    localStorage.setItem(`requestsOf:${currentUser.id}`, JSON.stringify(updateUserRequests))
  }
/*   componentDidUpdate(){

      this.setSubscriptions()
    
  } */
 componentDidMount() {
        let userLogged = localStorage.getItem('currentUser')
        if (userLogged){
          let currentUserFromLS=JSON.parse(userLogged)
          let currentUserRequests = localStorage.getItem(`requestsOf:${currentUserFromLS.id}`)
          let userSubscriptions = localStorage.getItem(`susbcriptionsOf:${currentUserFromLS.id}`)
          this.getData(currentUserFromLS)
          this.setState({
              currentUser: currentUserFromLS,
              currentUserRequests: JSON.parse(currentUserRequests),
              userSubscriptions: JSON.parse(userSubscriptions),
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
                  <AuthorProfile author={this.state.selectedAuthor} showMessages={this.state.showMessages} sendRequest={this.sendRequest} />
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
