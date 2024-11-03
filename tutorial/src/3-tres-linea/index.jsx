import { useState } from 'react';
import { GrPowerReset, GrPrevious, GrNext } from "react-icons/gr";

// 1. Separa la UI en una jerarquía de componentes
/*
  1. Game
    2. GameHeader
    2. Board
      3. Square
    4. ControlPanel
      5. ButtonReset
      6. ButtonLast
      7. ButtonNext
*/

// 2. Construye una versión estática en React
/*
  Renderiza la UI sin añadir interactividad ni estado
    Construye componentes, reutiliza componentes, pasa datos usando props
*/

// status: playing, winner, draw
function GameHeader({ headerText, status }) {
  let color
  if (status === 'winner') {
    color = 'green'
  } else if (status === 'draw') {
    color = 'red'
  }
  return (
    <h3 style={
      {
        color: status !== 'playing' && color
      }
    }>{headerText}</h3>
  )
}

function ButtonReset({ onResetGame }) {
  return <button title='Reset' onClick={onResetGame}><GrPowerReset /></button>
}

function ButtonPrevious({ onPrevious }) {
  return <button title='Previous' onClick={onPrevious}><GrPrevious /></button>
}

function ButtonNext({ onNext }) {
  return <button title='Next' onClick={onNext}><GrNext /></button>
}

function ButtonsJumpTo({ historySquares, positionSquare, onJumpTo }) {
  const moves = historySquares.map((squares, index) => {
    let description, row, column, square
    if (index > 0) {
      row = Math.floor(positionSquare[index - 1] / 3)
      column = positionSquare[index - 1] % 3
      square = squares[positionSquare[index - 1]]
      description = index + ': ' + '[' + row + ', ' + column + '] = ' + square

      return (
        <button className='button-jump'
          key={index}
          onClick={() => onJumpTo(index)}>
          {description}
        </button>
      )
    }
  })

  return (
    <>
      {historySquares[1] && <h3>Jump To:</h3>}
      <div className='buttons-jump'>
        {moves}
      </div>
    </>
  )
}

function ControlPanel({ historySquares, positionSquare, onResetGame, onPrevious, onNext, onJumpTo }) {
  return (
    <div className='control-panel'>
      <div className='buttons-control'>
        <ButtonPrevious onPrevious={onPrevious} />
        <ButtonReset onResetGame={onResetGame} />
        <ButtonNext onNext={onNext} />
      </div>
      <div>
        <ButtonsJumpTo historySquares={historySquares} positionSquare={positionSquare} onJumpTo={onJumpTo} />
      </div>
    </div>
  )
}

function Square({ square, onSquareClick, title, win }) {
  return (
    <button
      onClick={onSquareClick}
      title={title}
      style = {{
        color: win && 'green'
      }}>
      {square}
    </button>
  )
}

function Board({ squares, onSquareClick, isNextX }) {
  const position = calculatePositionWinner(squares)
  return (
    <div className='board'>
      {squares.map((s, index) =>
        <Square
          key={index}
          square={s} number={index}
          onSquareClick={() => onSquareClick(index)}
          title={isNextX ? 'X' : 'O'}
          win={position?.includes(index)}
          
        />
      )}
    </div>
  )
}

function Game() {
  const [historySquares, setHistorySquares] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const [positionSquare, setPositionSquare] = useState(Array(0).fill(null))

  const isNextX = currentMove % 2 === 0
  let squares = historySquares[currentMove]

  let [headerText, gameOver, status] = ['Jugador: ' + (isNextX ? 'X' : 'O'), false, 'playing']
  const winner = calculateWinner(squares)
  if (winner) {
    [headerText, gameOver, status] = ['Ganador: ' + winner, true, 'winner']
  } else {
    if (endGame(squares)) {
      [headerText, gameOver, status] = ['Empate', true, 'draw']
    }
  }

  function handleResetGame() {
    setHistorySquares([Array(9).fill(null)])
    setCurrentMove(0)
  }

  function handlePrevious() {
    if (currentMove > 0) {
      setCurrentMove(currentMove - 1)
    }
  }

  function handleNext() {
    if (currentMove < historySquares.length - 1) {
      setCurrentMove(currentMove + 1)
    }
  }

  function handleJumpTo(move) {
    setCurrentMove(move)
  }

  function handleSquareClick(i) {
    if (gameOver || (squares[i])) {
      return
    }

    const newSquares = squares.slice(0)
    newSquares[i] = isNextX ? 'X' : '0'

    const nextHistory = [...historySquares.slice(0, currentMove + 1), newSquares]
    setHistorySquares(nextHistory)

    setCurrentMove(nextHistory.length - 1)

    const nextPositionSquare = [...positionSquare.slice(0, currentMove), i]
    setPositionSquare(nextPositionSquare)
  }

  return (
    <div className='game'>
      <h2>Tres en línea</h2>
      <GameHeader headerText={headerText} status={status} />
      <Board squares={squares} onSquareClick={handleSquareClick} isNextX={isNextX} />
      <ControlPanel
        historySquares={historySquares}
        positionSquare={positionSquare}
        onResetGame={handleResetGame} onPrevious={handlePrevious} onNext={handleNext} onJumpTo={handleJumpTo} />
    </div>
  )
}

export default function Index() {
  return (
    <Game />
  );
}

function endGame(squares) {
  return !squares.some(s => s === null)
}

function positionWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { square: squares[a], position: [a, b, c] }
    }
  }
  return null
}

function calculatePositionWinner(squares) {
  return positionWinner(squares)?.position
}

function calculateWinner(squares) {
  return positionWinner(squares)?.square
}
