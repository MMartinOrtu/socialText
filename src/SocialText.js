import React, { Component } from 'react';
import Header from './Components/Header';
/* import './App.css'; */

class SocialText extends Component {
  state = {
    islogged: false,
    authors:{},
    user:{}
  }

  checkLogin = (user, passwd) => {
        if (user === this.state.user.username && passwd === this.state.user.password){
          console.log('Estás dentro')
          this.setState({islogged: true})
        }else{
          console.log('noreee')
        }
  }

  componentDidMount() {
    fetch('https://randomuser.me/api/?results=10&seed=abc')
      .then(response => response.json())
      .then(({results}) => results.forEach((user)=> console.log(user))/* this.setState({
        user: {
          username:user.login.username,
          password: user.login.password
        }
      }) */)
     
  }
  render() {
    return (
      <React.Fragment>
        <Header checklogin={this.checkLogin}/>
        
        {
          this.state.islogged &&
          <Lista />   }
      </React.Fragment>
    );
  }
}

export default SocialText;

const Lista = () =>
<h2>HOLAAA</h2>