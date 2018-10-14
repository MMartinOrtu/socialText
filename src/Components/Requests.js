import React from 'react';
import Author from './Author';
import Navigation from './Navigation';
import '../Styles/request.css';

const Requests = ({currentUserRequests, toggleRequest, selectedAuthor}) =>
  <div className="requests">
       <Navigation currentUser={selectedAuthor} selectedAuthor={selectedAuthor}/>
      <h3 className="request-title">List of requests</h3>
      {   !currentUserRequests ?
        <p>No tiene requests</p>:
        currentUserRequests.map( ({user, accepted})=>
          !accepted ?
          <div className="request-wrapper" key={`request-wrapper${user.id}`}>
           <Author key={user.id} author={user} selectedAuthor={selectedAuthor}/>
           <p><span>{user.fullname}</span> le ha enviado una solicitud de subscripción</p>
            <button className="request-btn" onClick={() => toggleRequest(user.id)}>Aceptar subscripción</button>
          </div>:
          <div className="request-wrapper" key={`request-wrapper${user.id}`}>
              <Author key={user.id} author={user} selectedAuthor={selectedAuthor}/>
             <p><span>{user.fullname}</span> puede ver sus mensajes a partir de ahora, si quiere deshabilitarlo de  nuevo haz click aquí</p>
             <button  className="request-btn" key={user.id} onClick={() => toggleRequest(user.id)}>Cancelar subscripción</button> 
          </div>
        )
      }
  </div>

export default Requests;