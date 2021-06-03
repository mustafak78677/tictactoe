import React, { useState } from "react";
import Board from './components/Board';
import { calculateWinner } from "./helpers";
import './styles/root.scss';

const App = () => {

    const [history, setHistory] = useState([ {board: Array(9).fill(null), isXNext: true} ]);
    
    const [currentMove, setCurrentMove] = useState(0);

    const current = history[currentMove];
    console.log(history)

    const winner = calculateWinner(current.board);

    const message = winner ? `Winner is ${winner}` : `Next player is ${current.isXNext ? 'X' : '0'}`;

    const handleSqaureClick = (position) => {
        if(current.board[position] || winner) {
            return;
        }
        setHistory( (prev) => {
          const last = prev[prev.length - 1];
            const newBoard = last.board.map((square,pos) => {
                if(pos == position) {
                    return last.isXNext ? "X" : "0";
                }

                return square;
            });
            return prev.concat({board: newBoard, isXNext: !last.isXNext});
        } );
        setCurrentMove(prev => prev + 1);
    }

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <h2>{ message }</h2>
      <Board board={current.board} handleSqaureClick={handleSqaureClick} />
    </div>
  );
};

export default App;
