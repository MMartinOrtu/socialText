import React from 'react';
import Author from './Author';
import Navigation from './Navigation';

const Requests = ({currentUserRequests, toggleRequest, selectedAuthor}) =>
  <div >
       <Navigation currentUser={selectedAuthor} selectedAuthor={selectedAuthor}/>
      <h3>List of requests</h3>
      {   !currentUserRequests ?
        <p>No tiene requests</p>:
        currentUserRequests.map( ({user, accepted})=>
          !accepted ?
          <div key={user.id}>
           <Author key={user.id} author={user} selectedAuthor={selectedAuthor}/>
              <div>
                <button onClick={() => toggleRequest(user.id)}>Aceptar subscripción</button>
              </div>
          </div>:
          <div key={user.id}>
             <p>{user.fullname} puede ver tus mensajes a partir de ahora</p>
             <p>Si quieres deshabilitarlo de  nuevo haz click aquí</p>
             <button  key={user.id} onClick={() => toggleRequest(user.id)}>Cancelar subscripción</button> 
          </div>
        )
      }
  </div>

export default Requests;