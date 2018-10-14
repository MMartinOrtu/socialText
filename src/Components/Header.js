import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import logo from '../socialtext-white.png';
import '../Styles/header.css';

const Header = (props) =>
    <React.Fragment>
        <header className="header">
            <Link to={"/"}><img src={logo} className="header-logo" alt="Social Text logo" /></Link>
            <h1>Conectando personas</h1>
            <Login checklogin={props.checklogin} islogged={props.islogged} loginError={props.loginError} logOut={props.logOut} currentUser={props.currentUser} />
        </header>
    </React.Fragment>

 export default Header;
