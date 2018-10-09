import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SocialText from './SocialText';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<SocialText />, document.getElementById('root'));
registerServiceWorker();
