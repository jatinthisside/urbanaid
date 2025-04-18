export default function PrimaryBtn({icon, text, className, clickHandler}: {icon?: React.ReactNode, text: string, className?: string, clickHandler?: () => void}) {
  return (
    <button onSubmit={clickHandler} className={`btn-primary flex items-center gap-1 ${className}`} onClick={clickHandler}>
      {
        icon && <span className="text-base font-semibold">{icon}</span>
      }
      {text}
    </button>
  )
}
