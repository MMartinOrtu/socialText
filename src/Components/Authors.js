import React from 'react';
import Author from './Author';
import '../Styles/authors.css';

const Authors = ({authors, islogged, selectedAuthor, currentUser }) =>
  <div className="authors">
    {
    authors.map(author =>(
      author.currentUser ? null:
      <Author key={author.id} author={author} selectedAuthor={selectedAuthor} />
    ))
    }
  </div>

export default Authors;