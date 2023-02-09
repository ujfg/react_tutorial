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
  const winnerSquares = calculateWinnerSquares(squares)
  let status: string
  if (winnerSquares) {
    status = 'Winner: ' + squares[winnerSquares[0]]
  } else if (squares.some((square) => !square )) {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  } else {
    status = 'draw...'
  }

  const handleClick = (i: number) => {
    if (calculateWinnerSquares(squares) || squares[i]) {
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

  const isHighlighted = (index: number) => {
    const winnerSquares = calculateWinnerSquares(squares)
    if (!winnerSquares) return false

    return winnerSquares.includes(index)
  } 

  const renderSquare = (i: number) => {
    return (
      <Square 
        key={i}
        value={squares[i]}
        onSquareClick={() => handleClick(i)} 
        highlighted={isHighlighted(i)}
      />
    )
  }

  const renderRow = (numbers: number[], index: number) => {
    return (
      <BoardRow key={index}>
        {numbers.map((number) => {
          return renderSquare(number)
        })}
      </BoardRow>
    )
  }

  const rows = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]

  return (
    <>
      <StatusDiv>{status}</StatusDiv>
      {rows.map((row, index) => {
        return renderRow(row, index)
      })}
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

const calculateWinnerSquares = (squares: SquareSign[]) => {
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
      return [a, b, c];
    }
  }
  return null;
}