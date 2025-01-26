
import React, { useEffect, useState } from "react";
import '../style/B4.css'
function Board4() {
  const [board, setBoard] = useState([]);
  const [boardCheck, setBoardCheck] = useState([]);
  const [isCellCorrect, setIsCellCorrect] = useState([]);
  const fetchBoard = async () => {
    const response = await fetch("https://sudoku-api.vercel.app/api/dosuku");
    const data = await response.json();
    setBoard(data.newboard.grids[0].value);
    setBoardCheck(data.newboard.grids[0].solution);
    setIsCellCorrect(
      data.newboard.grids[0].value.map((row) => row.map((cell) => cell !== 0))
    );
  };
  useEffect(() => {
    fetchBoard();
  }, []);
  const handleChange = (rowIndex, colIndex, value) => {
    if (/^[1-9]?$/.test(value)) {
      const newBoard = board.map((row, rIndx) =>
        row.map((cell, cIndx) =>
          rIndx === rowIndex && cIndx === colIndex
            ? value
              ? parseInt(value, 10)
              : 0
            : cell
        )
      );
      const isCorrect = parseInt(value, 10) === boardCheck[rowIndex][colIndex];
      const newIsCellCorrect = isCellCorrect.map((row, rIndx) =>
        row.map((cell, cIndx) =>
          rIndx === rowIndex && cIndx === colIndex ? isCorrect : cell
        )
      );
      setBoard(newBoard);
      setIsCellCorrect(newIsCellCorrect);
    }
  };
  const clearBoard = () => {
    const clearedBoard = board.map((row, rowIndex) =>
      row.map((cell, colIndex) => (isCellCorrect[rowIndex][colIndex] ? cell : 0))
    );
    setBoard(clearedBoard);
  };
  const solveBoard = () => {
    setBoard(boardCheck);
  };
  const giveHint = () => {
    let availableHints = [];
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (!isCellCorrect[row][col] && board[row][col] === 0) {
          availableHints.push({ row, col });
        }
      }
    }
    if (availableHints.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableHints.length);
      const { row, col } = availableHints[randomIndex];
      const updatedBoard = [...board];
      updatedBoard[row][col] = boardCheck[row][col];
      setBoard(updatedBoard);
    }
  };
  return (
    <div className="board4-container">
  <div className="board4-sudoku-board">
    {board.map((row, rowIndex) => (
      <div className="board4-sudoku-row" key={rowIndex}>
        {row.map((cell, colIndex) => {
          const isInputIncorrect = isCellCorrect[rowIndex][colIndex] === false && cell !== 0;
          return (
            <input
              type="text"
              key={colIndex}
              value={cell !== 0 ? cell : ""}
              onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
              readOnly={isCellCorrect[rowIndex][colIndex]}
              className={`board4-sudoku-cell ${cell !== 0 ? "board4-prewitem" : ""} ${isInputIncorrect ? "board4-incorrect" : ""}`}
            />
          );
        })}
      </div>
    ))}
  </div>
  <div className="board4-button-group">
    <button onClick={fetchBoard} className="board4-btn board4-btn-new">
      New
    </button>
    <button onClick={clearBoard} className="board4-btn board4-btn-clear">
      Clear
    </button>
    <button onClick={solveBoard} className="board4-btn board4-btn-solve">
      Solve
    </button>
    <button onClick={giveHint} className="board4-btn board4-btn-hint">
      Hint
    </button>
  </div>
</div>
  );
}
export default Board4;

