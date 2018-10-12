import React from 'react';
import Author from './Author';

const Authors = ({authors, islogged, selectedAuthor, currentUser }) =>
    <div>
         <ul>
              {
              authors.map(author =>(
                author.currentUser ? null:
                <Author key={author.id} author={author} selectedAuthor={selectedAuthor} />
              ))
              }
        </ul>
    </div>

export default Authors;