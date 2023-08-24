import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import './Assets/Css/Server.css'
import reportWebVitals from './reportWebVitals';
import Header from './Common/Header';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
