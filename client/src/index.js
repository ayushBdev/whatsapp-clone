import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import Store from "./components/#Redux/Store";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

ReactDOM.render(
    <BrowserRouter>
        <Provider store={Store}>
            <App />
        </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);