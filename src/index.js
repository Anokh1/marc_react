import React from 'react';
import { createRoot } from 'react-dom/client';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import App from './App';
import { BrowserRouter } from 'react-router-dom';

import './index.css'; 

const root = createRoot(document.getElementById("root")); 


root.render(
  <BrowserRouter>
  <App />
  </BrowserRouter>
);
