import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { DarkModeContextProvider } from "./Admin/context/darkModeContext.js";

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
