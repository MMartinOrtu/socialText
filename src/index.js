import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import SocialText from './SocialText';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import configureStore from './configureStore';

export const store = configureStore();

window.store = store;

ReactDOM.render(<Provider store={store}><SocialText /></Provider>, document.getElementById('root'));
registerServiceWorker();
