export default function HeroTagLine({icon}: {icon: React.ReactNode}) {
  return (
    <div className="flex gap-2 items-center shadow-md px-i-14 py-i-8 rounded-full mt-4 text-[14px]">
      <span className="text-base">{icon}</span>
      <p className="font-medium"> The smart way to find local services</p>
    </div>
  )
}
