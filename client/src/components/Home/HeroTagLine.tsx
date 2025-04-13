export default function HeroTagLine({icon}: {icon: React.ReactNode}) {
  return (
    <div className="flex gap-2 items-center shadow-md px-3 py-2 rounded-full text-sm">
      <span className="text-base">{icon}</span>
      <p className="font-medium"> The smart way to find local services</p>
    </div>
  )
}
