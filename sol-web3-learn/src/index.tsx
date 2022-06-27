import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Wallet from "./pages/Wallet";
import Home from "./pages/Home";
import TestPage from "./pages/Test";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<App></App>}>
                  <Route index element={<Home></Home>}></Route>
                  <Route path='test' element={<TestPage></TestPage>}></Route>
                  <Route path='wallet' element={<Wallet></Wallet>}>
                  </Route>
              </Route>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
