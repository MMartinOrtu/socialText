import React, { Component } from 'react';
import Header from './Components/Header';
/* import './App.css'; */


class SocialText extends Component {
  state = {
    islogged: false,
    authors:[],
    currentUser:{}
  }
/*   updateAuthors = () => {
    let autores = []
    if(this.state.currentUser){
          console.log('hollelelle')
          let currentUsuario = this.state.currentUser
          console.log('currentuese', currentUsuario )
          this.state.authors.forEach( author => {
            if (author.id !== currentUsuario.id){
              console.log('author.name', author.name )
              autores.push(author)
            }
          })
    } */

/*     this.setState({
      authors: autores
    })} */
  

  checkLogin = (username, password) => {
    /* let autores = [] */
    this.state.authors.forEach( author => {
        if (author.username === username && author.password === password){
              this.setState({
              islogged: true,
              currentUser:author
            })
            let usertoDB = JSON.stringify(author)
            localStorage.setItem('currentUser', usertoDB)
        }/* else{
          autores.push(author)
        } */
    })
    
/*     this.setState({
      authors: autores
    }) */
  }

  logOut = () => {
    let autores = [...this.state.authors]
    
    let user = this.state.currentUser
    autores.push(user)
    this.setState({
      islogged: false,
      currentUser: null
    })
    localStorage.setItem('currentUser', '')
  }
  componentDidMount() {
    let userLogged = localStorage.getItem('currentUser')
    console.log('user from localStore', userLogged)
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
          <Authors authors={this.state.authors} currentUser={this.state.currentUser}/>   }
      </React.Fragment>
    );
  }
}

export default SocialText;

const fullname = name => `${name.first} ${name.last}`

const Authors = ({authors, currentUser}) =>
  <ul>
    {authors.map(author => 
   <Author key={author.id} author={author} />)
    }
  </ul>

const Author = ({author}) =>
  <div>
    <h3>{author.fullname}</h3>
    <img src={author.picture}/>
    <button>Follow me</button>
  </div>
   
  
