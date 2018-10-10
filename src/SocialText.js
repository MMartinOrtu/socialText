import React, { Component } from 'react';
import Header from './Components/Header';
/* import './App.css'; */

class SocialText extends Component {
  state = {
    islogged: false,
    authors:[],
    currentUser:''
  }

  checkLogin = (username, password) => {

    this.state.authors.forEach( author => {
        if (author.username === username && author.password === password){
        console.log('Estás dentro')
        this.setState({
          islogged: true,
          currentUser:author})
          localStorage.setItem('currentUser', author.id)
      }
    })
  }

  checkUser = (id) =>{
      this.state.authors.forEach( author => {
        if (author.id === id){
          this.setState({
            islogged: true,
            currentUser:author})
        }
      })
    
  }

  componentDidMount() {
     var userLogged = localStorage.getItem('currentUser')
     console.log(userLogged)
     if (userLogged){
       this.checkUser(userLogged)
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
                        console.log(newAuthor)
                        authors.push(newAuthor)
                    })
              this.setState({
                authors: authors
              })
            }
        ).then (()=>{          
          var userLogged = localStorage.getItem('currentUser')
          console.log(userLogged)
          if (userLogged){
            this.checkUser(userLogged)
         }
        }

        )

    
  }
  render() {
    return (
      <React.Fragment>
        <Header checklogin={this.checkLogin} islogged={this.state.islogged} currentUser={this.state.currentUser}/>

        {
          this.state.islogged &&
          <Lista />   }
      </React.Fragment>
    );
  }
}

export default SocialText;

const fullname = name => `${name.first} ${name.last}`

const Lista = () =>
<h2>HOLAAA</h2>