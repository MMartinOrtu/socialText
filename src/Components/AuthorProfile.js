import React from 'react';

const AuthorProfile = ({author, handleFollowerRequest}) =>
<div>

    <h2>Hola {author.fullname}</h2>

    <button onClick={() => handleFollowerRequest(author.id)}>Seguir</button>
</div>


export default AuthorProfile;