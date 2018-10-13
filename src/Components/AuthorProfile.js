import React from 'react';
import Message from './Message'

const AuthorProfile = ({author, sendRequest, saveMessage, messages}) =>
<div>
    <h3>Hola</h3>
    <h2>{author.fullname}</h2>
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
                    messages.map(message =>(
                      <p>{message}</p>
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

export default AuthorProfile;