import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Wallet } from './components/wallet';
import {AppBar} from "@mui/material";

function App() {
  return (
    <div className="App">
        <AppBar position="static">
            <Wallet></Wallet>
        </AppBar>
      <header className="App-header">

        {/* <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
