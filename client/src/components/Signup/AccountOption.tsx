import { ReactNode } from "react";

interface AccountOptionProps{
    icon: ReactNode,
    title:String,
    desc:String,
    accType:Boolean
}

export default function AccountOption({icon,title, desc, accType}:AccountOptionProps) {
  return (
    <div className="border-[1px] border-slate-200 py-i-10 px-i-10 rounded-md">
      <div className={`w-auto h-auto flex items-center gap-2 px-i-10 py-i-8 ${accType ? "border-card" : ""} rounded-lg`}>
        {/* icons */}
        <span className="bg-primary-50 rounded-full flex items-center justify-center h-fit px-i-10 py-i-10">
          {icon}
        </span>
        {/* content */}
        <div className="flex flex-col items-start">
          <p>{title}</p>
          <span className="text-sm text-slate-500">
            {desc}
          </span>
        </div>
      </div>
    </div>
  );
}
