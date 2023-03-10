import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './Homepage/App.js';
import List from './misc/List.js'
import LNPage from './NovelPage-link/LNPage.js';
import Account from './misc/Account';
import ReadEpub from './readEpub/ReadEpub.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<App />} />
      <Route exact path="/lightnovel/:id" element={<LNPage />} />
      <Route exact path='/list' element={<List />} />
      <Route exact path='/login' element={<Account />} />
      <Route exact path="/read/:id/:files" element={<ReadEpub />} />
    </Routes>
  </BrowserRouter>
  //</React.StrictMode>
);
