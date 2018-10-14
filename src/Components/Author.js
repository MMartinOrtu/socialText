import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/author.css';

const Author = ({author, selectedAuthor}) =>
  <div className="author">
   <Link className="author-link" to={`/profile/${author.id}`} onClick={() =>selectedAuthor(author.id)}>
    <img className="author-img"src={author.picture} alt={author.fullname} title={author.fullname}/>
    </Link>
    {/* <Link className="author-link" to={`/profile/${author.id}`} onClick={() =>selectedAuthor(author.id)}><h2>{author.fullname}</h2></Link>
    <Link className="author-link" to={`/profile/${author.id}`} ><button onClick={() =>selectedAuthor(author.id)}>See profile</button></Link> */}
  </div>

export default Author;