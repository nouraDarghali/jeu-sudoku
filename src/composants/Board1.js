import React, { useEffect, useState } from 'react';
import Square from './Square';
import calculateWinner from './utils/calculateWinner';
import '../style/B1.css';
function Board1() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(squares);
  const status = winner
    ? `🎉 Félicitations ! Le joueur ${winner} a gagné ! 🎉`
    : squares.every((square) => square !== null)
    ? 'Match nul ! Aucun gagnant.'
    : `Prochain joueur : ${isXNext ? 'X' : 'O'}`;
  const handleClick = (index) => {
    if (squares[index] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[index] = isXNext ? 'X' : 'O';
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  };
  const renderSquare = (index) => (
    <Square value={squares[index]} onClick={() => handleClick(index)} />
  );
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };
  return (
    <div className="board1-container">
      <div className="board1-status">{status}</div>
      <div className="board1-row">
        {renderSquare(0)} {renderSquare(1)} {renderSquare(2)}
      </div>
      <div className="board1-row">
        {renderSquare(3)} {renderSquare(4)} {renderSquare(5)}
      </div>
      <div className="board1-row">
        {renderSquare(6)} {renderSquare(7)} {renderSquare(8)}
      </div>
      <button className="board1-reset-button" onClick={resetGame}>
        Redémarrer la partie
      </button>
    </div>
  );
}
export default Board1;

