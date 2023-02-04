import { FC, useState } from "react";
import { calculateWinner, SquareSign } from "./Game";
import { Square } from "./Square";

export const Board: FC = () => {
  const [squares, setSquares] = useState<SquareSign[]>(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState<boolean>(true)

  const winner = calculateWinner(squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

  const renderSquare = (i: number) => {
    return (
      <Square 
        value={squares[i]}
        onClick={() => handleClick(i)} 
      />
    )
  }

  const handleClick = (i: number) => {
    const copied_squares = squares.slice() // コピー
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    copied_squares[i] = xIsNext ? 'X' : 'O'
    setSquares(copied_squares)
    setXIsNext(!xIsNext)
  }

  return (
    <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
  )
}