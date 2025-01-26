/*import logo from './logo.svg';
import './App.css';
import Home from './composants/Home.js';
function App() {
  return (
    <div className="App">
     <Home></Home>
    </div>
  );
}

export default App;*/
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './composants/Home';
import Game from './composants/Game';
import Board4 from './composants/Board4';
import Board2 from './composants/Board2';
import Board3 from './composants/Board3';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/board2" element={<Board2 />} />
        <Route path="/board3" element={<Board3 />} />
        <Route path="/board4" element={<Board4 />} />
        
      </Routes>
    </Router>
  );
}
export default App;
