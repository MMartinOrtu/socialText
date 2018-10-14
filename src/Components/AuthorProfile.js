import React from 'react';
import Message from './Message';
import '../Styles/profile.css'
import Navigation from './Navigation';

const AuthorProfile = ({author, sendRequest, saveMessage, messages}) =>
    <React.Fragment>
        <Navigation currentUser={author} selectedAuthor={author}/>
        <div className="profile">
             <h2>Hola {author.fullname}</h2>
            <img src={author.picture} alt={author.fullname}/>
            <div>
                {
                    author.currentUser &&
                    <Message saveMessage={saveMessage} />
                }
            </div>
            {
                author.showMessages || author.currentUser ?
                    <div>
                        <h2>List of messages</h2>
                        <ul>
                            {
                            messages ?
                            messages.forEach(message =>(
                            <p key={messages.indexOf(message)}>{message}</p>
                            )) :
                            <p>there is no messages</p>
                            }
                        </ul>
                    </div>:
                    <div>
                        {
                        author.requestNotAnswered  ?
                        <p>Subscripción pendiente de aprobar</p> :
                        <button onClick={() => sendRequest(author)}>Follow</button>
                        }
                    </div>
            }
        </div>
    </React.Fragment>
export default AuthorProfile;