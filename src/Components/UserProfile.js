import React from 'react';

const UserProfile = ({currenrUser}) =>
  <div>
    <h3>{currentUser.fullname}</h3>
    <img src={author.picture}/>
    <button>Handle petitions</button>
     <Route to={`/user/${currentUser.id}`}  component={Requests}/>
  </div>

export default UserProfile;