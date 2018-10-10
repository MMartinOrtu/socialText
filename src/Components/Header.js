import React from 'react';
import Login from './Login';
import logo from '../socialtext.png';
import '../Header.css'


const Header = (props) =>
    <div className="header-wrapper">
        <header className="header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Social Text</h1>
            <Login checklogin={props.checklogin} islogged={props.islogged} currentUser={props.currentUser} />
        </header>
    </div>

 export default Header;
