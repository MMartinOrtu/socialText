import React from 'react';
import {connect} from 'react-redux';
import {toggleRequest} from '../index.js'
import '../Styles/request.css';

const RequestsView = ({authorLogged, toggleRequest}) =>
  <div className="requests">
      <h3 className="request-title">Listado de solicitudes</h3>
      {  !authorLogged.requests?
        <p>No tiene ninguna solicitud de subscripción</p>:
        authorLogged.requests.map( ({user, accepted})=>
          !accepted ?
          <div className="request-wrapper" key={`request-wrapper${user.id}`}>
           <img className="author-img" src={user.picture} alt={user.fullname} title={user.fullname}/>
           <p><span>{user.fullname}</span> le ha enviado una solicitud de subscripción</p>
            <button className="request-btn" onClick={() => toggleRequest(user.id)}>Aceptar subscripción</button>
          </div>:
          <div className="request-wrapper" key={`request-wrapper${user.id}`}>
               <img className="author-img" src={user.picture} alt={user.fullname} title={user.fullname}/>
             <p><span>{user.fullname}</span> puede ver sus mensajes a partir de ahora, si quiere deshabilitarlo de  nuevo haz click aquí</p>
             <button  className="request-btn" key={user.id} onClick={() => toggleRequest(user.id)}>Cancelar subscripción</button>
          </div>
        )
      }
  </div>

const Requests = connect( state => ({
  authorLogged: state.authorLogged
}), dispatch => ({
  toggleRequest: (message) => dispatch(toggleRequest(message))
}))(RequestsView)

export default Requests;