import React from 'react';
import {selectAuthor} from '../Actions/index.js'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import '../Styles/authors.css';

const AuthorsView = ({authors, authorLogged, selectAuthor }) =>
  <div className="authors">
    {
    authors.map(author =>(
      author.id === authorLogged.author.id ? null:
      <Link key={author.id} className="author-link" to={`/profile/${author.id}`} onClick={() => selectAuthor(author.id)}>
      <img className="author-img" src={author.picture} alt={author.fullname} title={author.fullname}/>
      </Link>
    ))
    }
  </div>

const Authors = connect( state => ({
  authors: state.authors,
  authorLogged: state.authorLogged
}), dispatch => ({
  selectAuthor: (id) => dispatch(selectAuthor(id))
}))(AuthorsView)

export default Authors;