import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {selectAuthor} from '../Actions/index.js'
import '../Styles/navigation.css';

const NavigationView = ({authorLogged, selectAuthor}) =>
    <div className="nav">
         <Link className="nav-link" to={`/profile/${authorLogged.author.id}`} onClick={() =>selectAuthor(authorLogged.author.id)}>Perfil</Link>
         <Link className="nav-link" to={`/requests/${authorLogged.author.id}`} >Solicitudes</Link>
    </div>


const Navigation = connect( state => ({
     authorLogged: state.authorLogged
  }), dispatch => ({
    selectAuthor: (id) => dispatch(selectAuthor(id))
  }))(NavigationView)

export default Navigation;