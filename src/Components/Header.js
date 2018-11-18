import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import logo from '../Images/socialtext.png';
import '../Styles/header.css';

const Header = (props) =>
    <React.Fragment>
        <header className="header">
            <Link to={"/"}><img src={logo} className="header-logo" alt="Social Text logo" /></Link>
            <h1>TU RED SOCIAL DE MENSAJES</h1>
            <Login />
        </header>
    </React.Fragment>

 export default Header;
