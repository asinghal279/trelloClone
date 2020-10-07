import React from 'react';
import ReactDOM from 'react-dom';
import FuncComp from './boardWrapper';
import Header from './header';

ReactDOM.render(
  <React.StrictMode>
    <Header/>
    <FuncComp />
  </React.StrictMode>,
  document.getElementById('root')
);

