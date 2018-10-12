import React from 'react';
import Author from './Author';

const Requests = ({currentUserRequests, toggleRequest, selectedAuthor}) =>
  <div>
        
  
      <h3>List of requests</h3>
      {   !currentUserRequests ?
        <p>No tiene requests</p>:
        currentUserRequests.map( ({user, accepted})=>
          !accepted ? 
          <div>
           <Author key={user.id} author={user} selectedAuthor={selectedAuthor}/>
              <div>
                <button  key={user.id} onClick={() => toggleRequest(user.id)}>Aceptar subscripción</button>
              </div>
          </div>:
          <div>
             <p>{user.fullname} puede ver tus mesnsajes a partir de ahora</p>
             <p>Si quieres deshanilitarlo de  nuevo haz click aquí</p>
             <button  key={user.id} onClick={() => toggleRequest(user.id)}>Cancelar subscripción</button> 
          </div>
        )
      }
  </div>

export default Requests;