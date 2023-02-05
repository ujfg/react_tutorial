import { FC, useState } from "react";
import { Board } from "./Board";

export type SquareSign = 'X' | 'O' | null
export type BoardStatus = SquareSign[]
export type History = {boardStatus: BoardStatus}[]

export const Game: FC = () => {
  const [history, setHistory] = useState<History>([{boardStatus: Array(9).fill(null)}])
  const [currentMove, setCurrentMove] = useState<number>(0)

  const xIsNext = currentMove % 2 === 0
  const currentBoardStatus = history[currentMove].boardStatus
  const winner = calculateWinner(currentBoardStatus);
  let status: string
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  const moves = history.map((_boardStatus, move) => {
    const desc = move !== 0 ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  const jumpTo = (move: number) => {
    setCurrentMove(move)
  }

  const handleClick = (i: number) => {
    const current_history = history.slice(0, currentMove + 1) // 1手目からジャンプ先までのhistory
    const boardStatus = current_history[current_history.length - 1].boardStatus.slice()
    if (calculateWinner(boardStatus) || boardStatus[i]) {
      return;
    }
    boardStatus[i] = xIsNext ? 'X' : 'O'
    setHistory(current_history.concat([{boardStatus: boardStatus}]))
    setCurrentMove(currentMove + 1)
  }
  
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentBoardStatus} onClick={(i: number) => {handleClick(i)}}/>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
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