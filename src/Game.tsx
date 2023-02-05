import { FC, useState } from "react";
import styled from "styled-components";
import { Board } from "./Board";

export type SquareSign = 'X' | 'O' | null
export type History = SquareSign[][]

export const Game: FC = () => {
  const [history, setHistory] = useState<History>([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState<number>(0)

  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  const moves = history.map((_squares, move) => {
    let description: string
    if (move > 0) {
      description = 'Go to move #' + move
    } else {
      description = 'Go to game start'
    }
    return (
      <Li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </Li>
    );
  });

  const jumpTo = (move: number) => {
    setCurrentMove(move)
  }

  const handlePlay = (nextSquares: SquareSign[]) => {
    const nextHistory = [
      ...history.slice(0, currentMove + 1), 
      nextSquares
    ] // 最新の盤面を含まない既存のhistoryにnextSquaresを追加
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1) // historyの長さはmoveより1多い
  }
  
  return (
    <Wrapper>
      <div>
        <Board
          xIsNext={xIsNext}
          squares={currentSquares} 
          onPlay={handlePlay}
        />
      </div>
      <GameInfoDiv>
        <Ol>{moves}</Ol>
      </GameInfoDiv>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const Ol = styled.ol`
  padding-left: 30px;
`

const Li = styled.li`
  padding-left: 30px;
`

const GameInfoDiv = styled.div`
  margin-left: 20px;
`