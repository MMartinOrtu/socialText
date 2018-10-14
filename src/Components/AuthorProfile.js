import React from 'react';
import Message from './Message';
import Navigation from './Navigation';
import '../Styles/profile.css'

const AuthorProfile = ({author, currentUser, sendRequest, saveMessage, messages, selectedAuthor}) =>
    <React.Fragment>
        <Navigation currentUser={currentUser} selectedAuthor={selectedAuthor}/>
        <div className="profile">
            <div className="profile-data">
                <h2 className="profile-title">Perfil de <span>{author.fullname}</span></h2>
                <img src={author.picture} alt={author.fullname}/>
                <p>{author.email}</p>
            </div>
            <div className="profile-messages">
                <div className="message-area">
                <h2 className="profile-title">Área de mensajes</h2>
                {
                    author.currentUser &&
                    <Message saveMessage={saveMessage} />
                }
                </div>
                {
                    author.showMessages || author.currentUser ?
                    <div>
                        <h2 className="profile-messages-title">List of messages</h2>
                        <div>
                            {
                            messages ?
                                messages.map(message =>(
                                <p className="message-displayed" key={messages.indexOf(message)}>{message}</p>
                                )):
                            <p>there is no messages</p>
                            }
                        </div>
                    </div>:
                    <div>
                        {
                        author.requestNotAnswered  ?
                        <p>Subscripción pendiente de aprobar</p> :
                        <React.Fragment>
                            <p>Si quiere leer los mensajes de este autor envíele una solicitud de subscripción</p>
                            <button className="profile-btn" onClick={() => sendRequest(author)}>Enviar socilitud</button>
                        </React.Fragment>
                        }
                    </div>
                }
            </div>
        </div>
    </React.Fragment>
export default AuthorProfile;