import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/navigation.css';

const Navigation = ({currentUser, selectedAuthor}) =>
    <div className="nav">
         <Link className="nav-link" to={`/profile/${currentUser.id}`} onClick={() =>selectedAuthor(currentUser.id)}>Perfil</Link>
         <Link className="nav-link" to={`/requests/${currentUser.id}`} >Solicitudes</Link>
    </div>

export default Navigation;