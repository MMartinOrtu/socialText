import React from 'react';
import { Link } from 'react-router-dom';

const Author = ({author, selectedAuthor}) =>
  <div>
    <h3>{author.fullname}</h3>
    <img src={author.picture}/>
     <Link to={`/profile/${author.id}`} ><button onClick={() =>selectedAuthor(author.id)}>See profile</button></Link>
  </div>

export default Author;