import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Components/Header';
import {connect} from 'react-redux';
import {getAuthorsDatafromAPI} from './index';
import Authors from './Components/Authors';
import AuthorProfile from './Components/AuthorProfile';
import Requests from './Components/Requests';
import Navigation from './Components/Navigation';
import fondo from './Images/fondo.jpg';

class SocialTextView extends Component {

  componentWillMount () {
    if (!this.props.authors || this.props.authors.loadingError ){
      this.props.getData();
    }
  }

  render() {
    const {loadingError}= this.props.authors || ''
    return (
    <BrowserRouter>
      <React.Fragment>
        <Header/>
          {
            loadingError &&
            <span className="error">{loadingError}</span>
          }
          {
            this.props.authorLogged.author ?
            <React.Fragment>
              <Navigation/>
              <Switch>
                <Route  exact path="/" component={Authors} />
                <Route  exact path="/profile/:idauthor"  component={AuthorProfile}/>
                <Route  exact path="/requests/:idauthor" component={Requests}/>
              </Switch>
            </React.Fragment> :
            <img src={fondo} alt={'Imagen de portada'}/>

          }
      </React.Fragment>
    </BrowserRouter>
    )
  }
}

const SocialText = connect( state => ({
  authors: state.authors,
  authorLogged: state.authorLogged
}), dispatch => ({
  getData: () => dispatch(getAuthorsDatafromAPI())
}))(SocialTextView)

export default SocialText;

