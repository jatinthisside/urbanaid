import Navbar from "@/components/common/Navbar";
import HeroTagLine from "@/components/Home/HeroTagLine";
import { PiShootingStar } from "react-icons/pi";
import SearchBox  from "@/components/Home/SearchBox";

export default function Home() {
  return (
    <main className="container relative overflow-x-hidden">
      {/* gradient blue right */}
      <div className="absolute top-0 right-[-25%] w-1/2 h-full bg-[radial-gradient(circle,_#60a5fa_10%,_transparent_80%)] blur-4xl opacity-25 pointer-events-none">
        {/* gradient blue */}
      </div>
      <section className="w-full min-h-screen py-7 font-semibold relative">
        {/* navbar */}
        <Navbar />
        {/* Landing section */}
        <div className="w-full h-auto mx-auto flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 px-[10%]">
          {/* Hero Section */}
          <div className="flex flex-col gap-4 justify-center items-center h-[100%] w-full py-[2.8rem]">
            <HeroTagLine icon={<PiShootingStar />}/>
            <div className="flex flex-col gap-8 text-center w-[70%] relative mt-2">
              <div className="absolute top-[-5%] w-89 h-50 rounded-full bg-[radial-gradient(circle,_#60a5fa_10%,_transparent_70%)] blur-3xl opacity-30 pointer-events-none">
                {/* gradient blue */}
              </div>
              <h1 className="text-6xl font-bold px-10 text-gradient-primary">Local services, <span className="italic">expertly delivered</span></h1>
              <p className="text-lg font-medium text-slate-500">Connect with trusted professionals in your area for all your service needs — from home repairs to personal tutoring</p>
            </div>
            <SearchBox />   
            <ul className="lg:w-[70%] h-auto flex justify-center items-center gap-x-10 gap-y-4 flex-wrap mt-6 px-10 text-[0.9rem] text-slate-400 opacity-70 font-[400] list-disc">
              <li>10,000+ providers</li>
              <li>24/7 support</li>
              <li>Vetted professionals</li>
              <li>Satisfaction guarantee</li>
              <li>Discover our services</li>
            </ul>       
          </div>
        </div>
      </section>
    </main>
  )
}
