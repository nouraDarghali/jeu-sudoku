/*
import React from 'react'; 
import Game from './Game';
import Board1 from './Board1';
function Home() { 
return ( 
<div className="game"> 
<Game /> 
<Board1></Board1>
</div> 
); 
} 
export default Home;*/
import React from 'react';
import { Form, Link } from 'react-router-dom';
import XO from '../assets/XO.png';
import S1 from '../assets/S1.png';
import S2 from '../assets/S2.jpg';
import S3 from '../assets/S3.jpg';
import '../style/style.css'
function Home() {
  return (
    <div className="home-page">
  <h1 className="home-title">Welcome to the Game App</h1>
  <div className="game-links">
    <Link to="/game" className="game-btn">
      <img src={XO} alt="Game" className="game-image" />
    </Link>
    <Link to="/board2" className="game-btn">
      <img src={S1} alt="Game" className="game-image" />
    </Link>
    <Link to="/board3" className="game-btn">
      <img src={S2} alt="Game" className="game-image" />
    </Link>
    <Link to="/board4" className="game-btn">
      <img src={S3} alt="Game" className="game-image" />
    </Link>
  </div>
</div>

  );
}

export default Home;


