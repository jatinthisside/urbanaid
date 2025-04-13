import { FiTool } from "react-icons/fi";
import { Link } from "react-router";
import GhostBtn from "../common/GhostBtn";
import { BsBoxArrowInDownLeft } from "react-icons/bs";

export default function ServiceCard() {
  return (
    <div className="w-[330px] min-h-[650px] rounded-md shadow-lg">
      {/* Image */}
      <div className="w-full h-[250px] rounded-t-md overflow-hidden">
        <img 
          src="https://picsum.photos/300/350" 
          alt="cover_img" 
          className="w-full h-full object-cover rounded-t-md" 
        />
      </div>
      {/* Content */}
      {/* Main Content Section */}
      <div className="w-full py-i-lg px-i-lg">
        {/* Icon & Price */}
         <div className="w-full flex justify-between items-center">
            {/* Icon */}
            <span className="bg-secondary-300 px-i-14 py-i-14 rounded-md text-2xl">
                <FiTool />
            </span>
            {/* Price */}
            <span className="text-sm font-medium bg-primary-50 text-accent px-i-14 py-i-10 rounded-md">
                From $100/Hour
            </span>
         </div>
         {/* Name & Details */}
         <div className="w-full flex flex-col gap-4 justify-between mt-i-lg">
            <span className="text-xl font-semibold">Home Repairs</span>
            <span className="text-base font-medium text-slate-400">
              Professional solutions for all your home maintenance and repair needs.
            </span>
            <ul className="list-disc list-outside text-sm flex flex-col gap-2 pl-i-lg font-extralight text-slate-400 marker:text-accent ul_marker">
                <li>Expert handymen available 7 days/week</li>
                <li>Same-day emergency services</li>
                <li>90-day workmanship guarantee</li>
                <li>Free estimates for large projects</li>
            </ul>
         </div>
         {/* CTAs */}
         <div className="w-full h-[2px] opacity-30 bg-secondary-400 my-i-16"></div>
         <div className="w-full flex justify-between items-center">
            <Link to="/" className="font-medium text-sm">View details</Link>
            <GhostBtn text="Book Now" icon={<BsBoxArrowInDownLeft />}/>
         </div>
      </div>
    </div>
  )
}
