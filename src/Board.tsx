import { FC } from "react";
import styled from "styled-components";
import { SquareSign } from "./Game";
import { Square } from "./Square";

type BoardProps = {
  xIsNext: boolean
  squares: SquareSign[]
  onPlay(squares: SquareSign[]): void
}

export const Board: FC<BoardProps> = ({
  squares,
  onPlay,
  xIsNext,
}) => {
  const winner = calculateWinner(squares)
  let status: string
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  const handleClick = (i: number) => {
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[i] = 'X'
    } else {
      nextSquares[i] = 'O'
    }
    onPlay(nextSquares)
  }

  const renderSquare = (i: number) => {
    return (
      <Square 
        value={squares[i]}
        onSquareClick={() => handleClick(i)} 
      />
    )
  }

  return (
    <>
      <StatusDiv>{status}</StatusDiv>
      <BoardRow>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </BoardRow>
      <BoardRow>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </BoardRow>
      <BoardRow>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </BoardRow>
    </>
  )
}

const StatusDiv = styled.div`
  margin-bottom: 10px;
`
const BoardRow = styled.div`
  ::after{
    clear: both;
    content: "";
    display: table;
  }
`

const calculateWinner = (squares: SquareSign[]) => {
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