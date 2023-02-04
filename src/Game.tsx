import React, { FC, useState } from "react";
import { Board } from "./Board";

export type SquareSign = 'X' | 'O' | null
export type BoardStatus = SquareSign[]
export type History = {boardStatus: BoardStatus}[]

export const Game: FC = () => {
  const [history, setHistory] = useState<History>([{boardStatus: Array(9).fill(null)}])
  const [xIsNext, setXIsNext] = useState<boolean>(true)
  const currentBoardStatus = history[history.length - 1].boardStatus
  const winner = calculateWinner(currentBoardStatus);
  let status: string
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  const handleClick = (i: number) => {
    const currentBoardStatus = history[history.length - 1].boardStatus.slice()
    if (calculateWinner(currentBoardStatus) || currentBoardStatus[i]) {
      return;
    }
    currentBoardStatus[i] = xIsNext ? 'X' : 'O'
    setHistory(history.concat([{boardStatus: currentBoardStatus}]))
    setXIsNext(!xIsNext)
  }
  
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentBoardStatus} onClick={(i: number) => {handleClick(i)}}/>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

export const calculateWinner = (squares: SquareSign[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}