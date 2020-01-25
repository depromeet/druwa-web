import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss';
import AppShell from './containers/AppShell';
import './polyfills';

const root = document.getElementById('root');

ReactDOM.render(<AppShell />, root);
