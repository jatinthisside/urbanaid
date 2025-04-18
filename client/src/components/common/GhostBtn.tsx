export default function GhostBtn({
  icon, 
  text, 
  clickHandler, 
  disabled = false
}: {
  icon?: React.ReactNode, 
  text: string, 
  clickHandler?: () => void,
  disabled?: boolean
}) {
  return (
    <button 
      className={`btn-ghost flex items-center gap-1 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} 
      onClick={clickHandler}
      disabled={disabled}
    >
      {icon && <span className="text-base font-semibold">{icon}</span>}
      {text}
    </button>
  )
}
  