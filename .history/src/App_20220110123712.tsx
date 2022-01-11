import React from 'react';
import logo from './logo.svg';
import './App.css';
import ApexChart from './components/chartBar';

function App() {
  return (
    <>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload. this!
        </p>
        
        
      </header>
    </div>
    <div>
      <h1> teste </h1>
      <ApexChart></ApexChart>
    </div>
    </>
    

  );
}

export default App;
