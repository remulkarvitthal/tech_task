import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './client/Search';
import Client from './client/Client';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Client />
  );
}

export default App;
