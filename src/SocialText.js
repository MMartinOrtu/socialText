import React, { Component } from 'react';
import Header from './Components/Header';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Authors from './Components/Authors';
import Author from './Components/Author';
import AuthorProfile from './Components/AuthorProfile';
/* import './App.css'; */

class SocialText extends Component {
  state = {
    islogged: false,
    authors:[],
    currentUser:{},
    selectedAuthor:{},
    currentUserRelations:null,
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
            this.getData(author)
            let currentUserRelations = localStorage.getItem(`relationsOf:${author.id}`)
            this.setState({
              currentUser:author,
              currentUserRelations: JSON.parse(currentUserRelations)
          })
        }
    })
  }

  logOut = () => {
    this.getData()
    localStorage.setItem('currentUser', '')
    this.setState({
      islogged: false,
      currentUser: null,
      selectAuthor: null,
      currentUserRelations: null
    })
  }

   getData = async (currentUser) =>{
    let noUserLogged= true;
      if (currentUser){
        noUserLogged= false;
      }

    const response = await fetch('https://randomuser.me/api/?results=10&seed=abc')
    const results = response.json()
    .then( ({results}) => {
      const authors = [];
      results.forEach(author =>{
        let newAuthor = {};
        var {email, picture, name, login} = author;
        newAuthor.email = email
        newAuthor.picture = picture.medium
        newAuthor.fullname = fullname(name)
        newAuthor.username = login.username
        newAuthor.password = login.password
        newAuthor.id = login.uuid
        if (noUserLogged){
          authors.push(newAuthor)
        }else{
          if (newAuthor.id !== currentUser.id){
            authors.push(newAuthor)
          }
        }
      })
      this.setState({
        authors: authors
      })
    }).then( () =>{
         if(!noUserLogged){
            this.setState({
              islogged: true
            })
        }
      })
  }

  handleFollowerRequest = (id) => {
    let currentUserId = this.state.currentUser.id
    let userRelations=[]

    if (!this.state.currentUserRelations){
      console.log(this.state.currentUserRelations)
      userRelations.push({user: currentUserId, accepted: false})
      localStorage.setItem(`relationsOf:${id}`, JSON.stringify(userRelations))
      this.setState({
        currentUserRelations: userRelations
      })
    }else{
      let userRelations = this.state.currentUserRelations
      console.log('else', userRelations)
      userRelations.push({user: currentUserId, accepted: false})
      localStorage.setItem(`relationsOf:${id}`, JSON.stringify(userRelations))
      this.setState({
        currentUserRelations: userRelations
      })
    }

  }

 componentDidMount() {
    let userLogged = localStorage.getItem('currentUser')

      if (userLogged){
          let currentUserfromDB = JSON.parse(userLogged)
          this.getData(currentUserfromDB)
          this.setState({
            currentUser: currentUserfromDB,
            islogged: true})
      } else {
        console.log('entraaaa')
        this.getData()
      }
  }

  render() {
    return (
    <BrowserRouter>
      <React.Fragment>
        <Header checklogin={this.checkLogin} islogged={this.state.islogged} logOut={this.logOut} currentUser={this.state.currentUser}/>
          <Switch>
              <Route  exact path="/" render={() => (
                <Authors authors={this.state.authors} islogged={this.state.islogged} selectedAuthor={this.selectAuthor} />
              )}/>
              <Route  exact path="/profile/:idauthor" render={(props) =>(
                  <AuthorProfile author={this.state.selectedAuthor} handleFollowerRequest={this.handleFollowerRequest}/>
              )}/>
          </Switch>

      </React.Fragment>
    </BrowserRouter>
    )
  }
}

export default SocialText;

const fullname = name => `${name.first} ${name.last}`
