import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.js';
import List from './List.js'
import LNPage from './LNPage.js';
import Account from './Account.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path= '/' element= {<App/>} />
        <Route exact path= "/lightnovel/*" element= {<LNPage/>} />
        <Route exact path='/list' element={<List/>} />
        <Route exact path='/login' element={<Account/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
