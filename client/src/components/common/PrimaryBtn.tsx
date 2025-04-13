export default function PrimaryBtn({icon, text}: {icon?: React.ReactNode, text: string}) {
  return (
    <button className="btn-primary flex items-center gap-1">
      <span className="text-base font-semibold">{icon}</span>
      {text}
    </button>
  )
}
