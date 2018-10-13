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
                    messages.map(message =>(
                      <p>{message}</p>
                    ))
                    }
                </ul>
            </div>:
            !author.requestNotAnswerd  &&
        <button onClick={() => sendRequest(author)}>Follow</button>
    }

</div>


export default AuthorProfile;