import { Button } from "@/components/ui/button";
import { BsArrowRight } from "react-icons/bs";
export default function ViewAllBtn({ text }: { text: string }) {
  return (
    <Button variant="outline" className="gap-2 px-i-14 py-i-10 rounded-full hover:scale-105 transition-all duration-300 mb-i-20">
        {text}
        <span className="text-xl">
            <BsArrowRight />
        </span>
    </Button>
  )
}
