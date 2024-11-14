import { useState } from "react"
import { Square } from "./components/Square"
import { TURNS } from "./constants"
import { checkWinner, checkEndGame } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"
import { saveGameToStorage, resetGameStorage } from "./logic/storage"

export default function Index() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.x
  })

  const newWinner = checkWinner(board)
  const draw = checkEndGame(board)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)

    resetGameStorage()
  }

  function updateBoard(index) {
    if (board[index] || newWinner) {
      return
    }

    const nextBoard = [...board]
    nextBoard[index] = turn
    setBoard(nextBoard)

    const newTurn = (TURNS.x === turn) ? TURNS.o : TURNS.x
    setTurn(newTurn)

    // Guardar partida
    saveGameToStorage({
      board: nextBoard,
      turn: newTurn
    })
  }

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((item, index) =>
            <Square key={index} index={index} updateBoard={updateBoard} >
              {item}
            </Square>)
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.x}>
          {TURNS.x}
        </Square>
        <Square isSelected={turn === TURNS.o}>
          {TURNS.o}
        </Square>
      </section>

      <WinnerModal draw={draw} winner={newWinner} resetGame={resetGame} />

    </main>

  );
}

