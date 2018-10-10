import React, { Component } from 'react';
import Header from './Components/Header';
/* import './App.css'; */

class SocialText extends Component {
  state = {
    islogged: false,
    authors:[],
    currentUser:{}
  }

  checkLogin = (username, password) => {
    this.state.authors.forEach( author => {
        if (author.username === username && author.password === password){
            console.log('Estás dentro')
            this.setState({
              islogged: true,
              currentUser:author
            })
            let usertoDB = JSON.stringify(author)
            localStorage.setItem('currentUser', usertoDB)
        }
    })
  }

  logOut = () => {
    this.setState({
      islogged: false,
      currentUser: null
    })
    localStorage.setItem('currentUser', '')
  }
  componentDidMount() {
    let userLogged = localStorage.getItem('currentUser')
    console.log(userLogged)
      if (userLogged){
        let currentUserfromDB = JSON.parse(userLogged)
          this.setState({
            currentUser: currentUserfromDB,
            islogged: true})
      }
  fetch('https://randomuser.me/api/?results=10&seed=abc')
    .then(response => response.json())
    .then(({results}) => {
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
            authors.push(newAuthor)
          })
        this.setState({
          authors: authors
        })
    })
  }
  render() {
    return (
      <React.Fragment>
        <Header checklogin={this.checkLogin} islogged={this.state.islogged} logOut={this.logOut} currentUser={this.state.currentUser}/>

        {
          this.state.islogged &&
          <Lista />   }
      </React.Fragment>
    );
  }
}

export default SocialText;

const fullname = name => `${name.first} ${name.last}`

const Autores = () =>

<h2>HOLAAA</h2>