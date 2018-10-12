import React from 'react';

const AuthorProfile = ({author, sendRequest, showMessages}) =>
<div>

    <h3>Hola</h3>
    <h2>{author.fullname}</h2>
    <img src={author.picture} alt={author.fullname}/>
    {
        author.showMessages || author.currentUser ?
            <div>
             <h2>List of messages</h2>
            </div>:
        <button id="request-btn" onClick={() => sendRequest(author)}>Seguir</button>
    }
</div>


export default AuthorProfile;