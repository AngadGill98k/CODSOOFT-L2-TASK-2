import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Craete from './components/create/craete';
import Home from './components/home/home';
import Quiz from './components/quiz/quiz';
import Summmary from './components/summary/summmary';
import Take from './components/take/take.';

import reportWebVitals from './reportWebVitals';
import {RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './components/login/login';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/create',
    element: <Craete />,
  },
  {
    path: '/Take',
    element: <Take />,
  },
  {
    path: '/quiz',
    element: <Quiz />,
  },
  {
    path: '/summary',
    element: <Summmary />,
  },
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
