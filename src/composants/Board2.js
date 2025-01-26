import React, { useState } from "react";
import '../style/B2.css'
const generateSolution = () => {
  let solution = [
    [1, 2, 3, 4],
    [3, 4, 1, 2],
    [4, 1, 2, 3],
    [2, 3, 4, 1],
  ];
  return solution;
};
const generatePuzzle = (solution) => {
  let puzzle = solution.map((row) => row.slice());
  let numberOfClues = 8; // Nombre de cases visibles
  while (numberOfClues < 16) {
    let row = Math.floor(Math.random() * 4);
    let col = Math.floor(Math.random() * 4);
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      numberOfClues++;
    }
  }
  return puzzle;
};
function Board2() {
  const [board, setBoard] = useState([]);
  const [solution, setSolution] = useState([]);
  const [isCellCorrect, setIsCellCorrect] = useState([]);

  // Initialiser le tableau avec la solution et le puzzle
  const initializeBoard = () => {
    const newSolution = generateSolution();
    const newPuzzle = generatePuzzle(newSolution);

    setSolution(newSolution);
    setBoard(newPuzzle);
    setIsCellCorrect(
      newPuzzle.map((row, rowIndex) =>
        row.map((cell) => (cell === 0 ? false : true))
      )
    );
  };
  const handleChange = (rowIndex, colIndex, value) => {
    if (/^[1-4]?$/.test(value)) {
      const newBoard = board.map((row, rIndx) =>
        row.map((cell, cIndx) =>
          rIndx === rowIndex && cIndx === colIndex
            ? value
              ? parseInt(value, 10)
              : 0
            : cell
        )
      );

      const isCorrect = parseInt(value, 10) === solution[rowIndex][colIndex];
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
    setBoard(solution);
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
      updatedBoard[row][col] = solution[row][col];
      setBoard(updatedBoard);
    }
  };
  
  return (
    <div className="board2-container">
  <div className="board2-sudoku-board">
    {board.map((row, rowIndex) => (
      <div className="board2-sudoku-row" key={rowIndex}>
        {row.map((cell, colIndex) => {
          const isInputIncorrect = isCellCorrect[rowIndex][colIndex] === false && cell !== 0;
          return (
            <input
              type="text"
              key={colIndex}
              value={cell !== 0 ? cell : ""}
              onChange={(e) => isCellCorrect[rowIndex][colIndex] === false ? handleChange(rowIndex, colIndex, e.target.value) : null}
              readOnly={isCellCorrect[rowIndex][colIndex]}
              className={`board2-sudoku-cell ${cell !== 0 ? "board2-prewitem" : ""} ${isInputIncorrect ? "board2-incorrect" : ""}`}
            />
          );
        })}
      </div>
    ))}
  </div>
  <div className="board2-button-group">
  <button onClick={initializeBoard} className="board2-btn board2-btn-new">
    New
  </button>
  <button onClick={clearBoard} className="board2-btn board2-btn-clear">
    Clear
  </button>
  <button onClick={solveBoard} className="board2-btn board2-btn-solve">
    Solve
  </button>
  <button onClick={giveHint} className="board2-btn board2-btn-hint">
    Hint
  </button>
</div>
</div>
  );
}
export default Board2;





