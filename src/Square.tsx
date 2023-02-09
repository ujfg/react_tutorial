import { FC } from "react"
import styled from "styled-components"

type SquareProps = {
  value: string | null
  onSquareClick(): void
  highlighted?: boolean
}

export const Square: FC<SquareProps> = ({
  value, 
  onSquareClick,
  highlighted
}) => {
  return(
    <Wrapper onClick={onSquareClick} highlighted={!!highlighted}>
      {value}
    </Wrapper>
  )
}

const Wrapper = styled.button<{highlighted: boolean}>`
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
  &:focus {
    outline: none;
  }
  ${({highlighted}) => highlighted && `background: yellow;`};
`