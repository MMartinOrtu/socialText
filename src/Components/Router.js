import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SocialText from '../SocialText'
import AuthorProfile from './AuthorProfile';

const Router = () =>(
        <BrowserRouter>
                <Switch>
                    <Route  exact path="/" component={SocialText}/>
                    <Route  exact path="/profile/:idauthor" component={AuthorProfile}/>               
                </Switch>
        </BrowserRouter>

)



export default Router;