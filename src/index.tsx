import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

type SquareProps = {
  value: string | null
  onClick(): void
}

// class Square extends React.Component<SquareProps> {
//   render() {
//     return (
//       <button 
//         className="square" 
//         onClick={() => this.props.onClick()}>
//           {this.props.value}
//       </button>
//     );
//   }
// }

const Square: FC<SquareProps> = (props) => {
  return(
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  )
}

// type BoardState = {
//   squares: Array<string | null>
//   xIsNext: boolean
// }

// class Board extends React.Component<{}, BoardState> {
//   constructor(props: {}) {
//     super(props)
//     this.state = {
//       squares: Array(9).fill(null),
//       xIsNext: true
//     }
//   }
//   renderSquare(i: number) {
//     return (
//       <Square 
//         value={this.state.squares[i]}
//         onClick={() => this.handleClick(i)} 
//       />
//     )
//   }

//   handleClick(i: number) {
//     const squares = this.state.squares.slice(); // コピー
//     squares[i] = this.state.xIsNext ? 'X' : 'O';
//     this.setState({
//       squares: squares,
//       xIsNext: !this.state.xIsNext,
//     });
//   }

//   render() {
//     const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

//     return (
//       <div>
//         <div className="status">{status}</div>
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }

const Board: FC = () => {
  const [squares, setSquares] = useState<Sign[]>(Array(9).fill(null))
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

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

type Sign = 'X' | 'O' | null
const calculateWinner = (squares: Sign[]) => {
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
// ========================================

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<Game />);
