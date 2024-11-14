export function Square({ children, isSelected, index, updateBoard }) {
  const className = `square ${isSelected && 'is-selected'}`
  return (
    <div className={className} onClick={() => updateBoard(index)}>
      {children}
    </div>
  )
}
