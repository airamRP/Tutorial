import { Square } from './Square'

export function WinnerModal({ draw, winner, resetGame }) {

  if (winner === null && !draw) return

  const text = winner ? 'Ganó:' : 'Empate'

  return (
    <section className="winner">
      <div className="text">
        <h2>{text}</h2>

        {winner && (
          <header className='win'>
            <Square>{winner}</Square>
          </header>
        )}

        <footer>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  )
}
