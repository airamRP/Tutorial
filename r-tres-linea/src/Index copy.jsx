import { useState } from 'react'
import './App.css'

function endGame(squares) {
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
      return squares[a]
    }
  }
  return null
}

function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{value}</button>
}

function Board({ xIsNext, squares, onPlay }) {

  // let [player, statusText] = xIsNext ? ['X', 'Jugador '] : ['0', 'Jugador ']

  const rows = 3
  const columns = 3

  const winner = calculateWinner(squares)
  const end = endGame(squares)
  const player = xIsNext ? 'X': '0'

  function handleClick(i) {
    if (squares[i] || winner || end) {
      return
    }
    const newSquare = squares.slice(0)
    newSquare[i] = player
    console.log('setStatus', winner, end, player)
    onPlay(newSquare, winner, end, player)
  }

/*   if (winner) {
    statusText = 'Ganador: ' + winner
  } else {
    if (end) {
      statusText = 'Empate'
    } else {
      statusText = 'Siguiente Jugador: ' + player
    }
  }
 */
  return (
    <>
      
      {Array(rows).fill(null).map((_, index) => {
        return (
          <div key={index} className="board-row">
            {Array(columns).fill(null).map((_, index2, a) => {
              const position = a.length * index + index2
              return (
                <Square key={position} value={squares[position]} onSquareClick={() => handleClick(position)} />
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
  const [xIsNext, setXIsNext] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(null))

  let statusText = 'Siguiente jugador: X'
  /* let [player, statusText] = xIsNext ? ['X', 'Jugador '] : ['0', 'Jugador ']
  const winner = calculateWinner(squares)
  const end = endGame(squares)
  if (winner) {
    statusText = 'Ganador: ' + winner
  } else {
    if (end) {
      statusText = 'Empate'
    } else {
      statusText = 'Siguiente Jugador: ' + player
    }
  } */

  function setStatus(winner, end, player) {
    if (winner) {
      statusText = 'Ganador: ' + winner
    } else {
      if (end) {
        statusText = 'Empate'
      } else {
        statusText = 'Siguiente Jugador: ' + player
      }
    }
  }


  function handlePlay (square, winner, end, player) {
    setSquares(square)
    setXIsNext(!xIsNext)
    setStatus(winner, end, player)
  }

  return (
    <>
    <div className="status">{statusText}</div>
    <Board xIsNext={xIsNext} squares={squares} onPlay={handlePlay} />
    </>
  )
}