import React from 'react';
import Author from './Author';
import { Link } from 'react-router-dom';

const Authors = ({authors, islogged, selectedAuthor}) =>
    islogged &&
    <div>
         <ul>{
          Object.keys(authors).map(author =>(
            <Author key={author} author={authors[author]} selectedAuthor={selectedAuthor} />
          ))
        }
        </ul>
    </div>

export default Authors;