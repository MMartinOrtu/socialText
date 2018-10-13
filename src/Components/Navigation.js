import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({currentUser, selectedAuthor}) =>
    <div>
         <Link to={`/profile/${currentUser.id}`} onClick={() =>selectedAuthor(currentUser.id)}>Ver perfil</Link>
         <Link to={`/requests/${currentUser.id}`} >Ver requests</Link>
    </div>

export default Navigation;