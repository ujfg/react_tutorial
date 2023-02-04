import { FC } from "react"

type SquareProps = {
  value: string | null
  onClick(): void
}

export const Square: FC<SquareProps> = (props) => {
  return(
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  )
}