export default function SubHeader({tag,title, description}: {tag: string, title: string, description: string}) {
  return (
    <div className="flex flex-col items-center text-center mb-16">
          <span className="bg-primary-50 text-accent rounded-full px-i-14 py-i-4 text-sm font-medium">
            {tag}
          </span>
          <h2 className="text-3xl font-bold mt-i-10">{title}</h2>
          <p className="text-slate-500 max-w-[600px] mt-i-4 font-medium">
            {description}
          </p>
    </div>
  )
}
