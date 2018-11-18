import React from 'react';
import Message from './Message';
import {connect} from 'react-redux';
import {sendRequest} from '../index.js'
import '../Styles/profile.css'

const AuthorProfileView = ({authorSelected, authorLogged, sendRequest}) =>
    <React.Fragment>
        <div className="profile">
            <div className="profile-data">
                <h2 className="profile-title">Perfil de <span>{authorSelected.author.fullname}</span></h2>
                <img src={authorSelected.author.picture} alt={authorSelected.author.fullname}/>
                <p>{authorSelected.author.email}</p>
            </div>
            <div className="profile-messages">
                <div className="message-area">
                <h2 className="profile-title">Área de mensajes</h2>
                {
                    authorSelected.author.id === authorLogged.author.id &&
                    <Message />
                }
                </div>
                {
                    authorSelected.author.requestState || authorSelected.author.id === authorLogged.author.id ?
                    <div>
                        <h2 className="profile-messages-title">Listado de mensajes</h2>
                        <div>
                            {
                            authorSelected.messages ?
                            authorSelected.messages.map(message =>(
                                <p className="message-displayed" key={authorSelected.messages.indexOf(message)}>{message}</p>
                                )):
                            <p>Este author aún no ha escrito ningún mensaje</p>
                            }
                        </div>
                    </div>:
                    <div>
                        {
                        authorSelected.author.requestState === false ?
                        <p>Subscripción pendiente de aprobar</p> :
                        <React.Fragment>
                            <p>Si quiere leer los mensajes de este autor envíele una solicitud de subscripción</p>
                            <button className="profile-btn" onClick={() => sendRequest(authorSelected.author)}>Enviar socilitud</button>
                        </React.Fragment>
                        }
                    </div>
                }
            </div>
        </div>
    </React.Fragment>

const AuthorProfile = connect( state => ({
    authorSelected: state.authorSelected,
    authorLogged: state.authorLogged
  }), dispatch => ({
    sendRequest: (author) => dispatch(sendRequest(author))
  }))(AuthorProfileView)
export default AuthorProfile;
