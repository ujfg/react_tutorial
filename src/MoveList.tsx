import { FC, useState } from "react"
import styled from "styled-components"
import { History } from "./Game"

type MoveListProps = {
  histories: History
  currentMove: number
  onJump(move: number): void
}

export const MoveList: FC<MoveListProps> = ({
  histories,
  currentMove,
  onJump
}) => {
  const [isAsc, setIsAsc] = useState<boolean>(true)
  const historyElements = histories.map((history, move) => {
    let description: string
    if (move === currentMove) {
      description = 'You are at move #' + move
    } else if (move > 0) {
      description = 'Go to move #' + move
    } else {
      description = 'Go to game start'
    }

    if (move === currentMove) {
      return description
    } else {
      return <button onClick={() => onJump(move)}>{description}</button>
    }
  })

  const sortedHistories = isAsc ? historyElements : historyElements.reverse()
  const moveList = sortedHistories.map((element, index) => {
    return (
      <Li key={index}>
        {element}
      </Li>
    )
  })

  return (
    <>
      <button onClick={() => {setIsAsc(!isAsc)}}>toggle</button>
      <Ul>{moveList}</Ul>
    </>
  )
}

const Ul = styled.ul`
  padding-left: 30px;
`

const Li = styled.li`
  padding-left: 30px;
`