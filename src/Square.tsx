import { FC } from "react"

type SquareProps = {
  value: string | null
  onSquareClick(): void
}

export const Square: FC<SquareProps> = ({value, onSquareClick}) => {
  return(
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  )
}