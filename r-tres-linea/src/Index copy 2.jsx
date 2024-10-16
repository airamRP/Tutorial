import { useState } from 'react'
import './App.css'

function fullBoard(squares) {
  return !squares.some(value => value === null)
}

function calculateWinner(squares) {
  const check = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < check.length; i++) {
    const [a, b, c] = check[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      const position = [a, b, c]
      return { square: squares[a], position }
    }
  }
  return null
}

function Square({ value, onSquareClick, win }) {
  return <button className="square" onClick={onSquareClick}
    style={{
      color: win && 'red'
    }}>{value}</button>
}

export function Board({ xIsNext, squares, onPlay }) {

  const rows = 3
  const columns = 3

  const winner = calculateWinner(squares)
  const end = fullBoard(squares)
  const player = xIsNext ? 'X' : '0'

  function handleClick(i) {
    if (squares[i] || winner || end) {
      return
    }
    const newSquares = squares.slice(0)
    newSquares[i] = player

    onPlay(newSquares, i)
  }

  return (
    <>

      {Array(rows).fill(null).map((_, index) => {
        return (
          <div key={index} className="board-row">
            {Array(columns).fill(null).map((_, index2, a) => {
              const position = a.length * index + index2
              return (
                <Square
                  key={position}
                  value={squares[position]}
                  win={winner?.position?.includes(position) ? true : false}
                  onSquareClick={() => handleClick(position)} />
              )
            })}
          </div>
        )
      })
      }
    </>
  )
}

export function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const [positionSquare, setPositionSquare] = useState(Array())
  const xIsNext = currentMove % 2 === 0
  const squares = history[currentMove]

  let [player, statusText] = xIsNext ? ['X', 'Jugador '] : ['O', 'Jugador ']
  const winner = calculateWinner(squares)
  const end = fullBoard(squares)

  if (winner) {
    statusText = 'Ganador: ' + winner.square
  } else {
    if (end) {
      statusText = 'Empate'
    } else {
      statusText = 'Jugador: ' + player
    }
  }

  function handlePlay(squares, position) {
    const nextHistory = [...history.slice(0, currentMove + 1), squares]
    setHistory(nextHistory)

    const newPosition = [...positionSquare.slice(0, currentMove), position]
    setPositionSquare(newPosition)

    setCurrentMove(nextHistory.length - 1)
  }

  function handleReset() {
    setCurrentMove(0)
    setHistory([Array(9).fill(null)])
    setPositionSquare(Array())
  }

  function handleBack() {
    if (currentMove > 0) {
      setCurrentMove(currentMove - 1)
    }
  }

  function handleNext() {
    if (currentMove < history.length - 1) {
      setCurrentMove(currentMove + 1)
    }
  }

  function handleJumpTo(move) {
    setCurrentMove(move)
  }

  const moves = history.map((squares, index) => {
    let description
    let row, column, square
    if (index > 0) {
      row = Math.floor(positionSquare[index - 1] / 3)
      column = positionSquare[index - 1] % 3
      square = squares[positionSquare[index - 1]]
      description = index + '. ' + square + ': ' + '[' + row + ', ' + column + ']'
    
    return (
      <button
        key={index}
        onClick={() => handleJumpTo(index)}>
        {description}
      </button>
    )
  }
  })

  return (
    <>
      <div className='game'>
        <h4>{statusText}</h4>

        <div className="game-board">
          <Board xIsNext={xIsNext} squares={squares} onPlay={handlePlay} />
        </div>

        <div className="game-controls">
          <button onClick={handleReset}>Reset</button>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
        <h5>Jump to move: </h5>
        <div className='game-info'>
        {moves}
        
        </div>
      </div>
    </>
  )
}
/* 
{
  history.length > 1 &&
  history.map((item, index) => {
    if (index === 0) return
    return (
      <button
        key={index}
        onClick={() => handleJumpTo(index)}>
        <strong>{squares[positionSquare[index - 1]]}</strong>: [{Math.floor(positionSquare[index - 1] / 3)}, {positionSquare[index - 1] % 3}]
      </button>
    )
  })
} */