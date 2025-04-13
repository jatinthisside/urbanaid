import PrimaryBtn from '@/components/common/PrimaryBtn';
import { IoArrowForwardOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";

export default function SearchBox() {
  return (
    <div className="w-[75%] min-h-[80px] flex items-center justify-evenly gap-5 shadow-md rounded-xl mt-2 font-medium px-4">
      {/* service box */}
      <div className='flex items-center gap-2 bg-secondary-100 rounded-xl py-4 text-secondary-foreground font-medium px-2 lg:w-[37%]'>
        <span className='text-xl text-slate-500'>
          <IoSearch />
        </span>
        <input type="text" placeholder="What service do you need?" className='outline-none border-none text-slate-500'/>
      </div>
      {/* location box */}
      <div className='flex items-center gap-2  rounded-xl py-4 bg-secondary-100 text-secondary-foreground font-medium px-2  lg:w-[37%]'>
      <span className='text-xl text-slate-500'>
        <SlLocationPin />
      </span>
        <input type="text" placeholder="What service do you need?" className='outline-none border-none text-slate-500'/>
      </div>
      {/* button */}
      <PrimaryBtn text="Find Services" icon={<IoArrowForwardOutline />} />
    </div>
  )
}
