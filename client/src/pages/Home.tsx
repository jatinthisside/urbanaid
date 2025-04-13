import Navbar from "@/components/common/Navbar";
import HeroTagLine from "@/components/Home/HeroTagLine";
import { PiShootingStar } from "react-icons/pi";
import SearchBox from "@/components/Home/SearchBox";
import ServiceCard from "@/components/Home/ServiceCard";
import ViewAllBtn from "@/components/common/ViewAllBtn";
import HowWork from "@/components/Home/HowWork";
import SubHeader from "@/components/common/SubHeader";
import TopVendors from "@/components/Home/TopVendors";
import PrimaryBtn from "@/components/common/PrimaryBtn";
import { BsArrowRight } from "react-icons/bs";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <main className="w-[100vw] min-h-[100vh] relative overflow-x-hidden flex justify-center items-center">
      <section className="w-[80%] min-h-screen font-semibold relative flex flex-col gap-y-[2.8rem]">
        {/* navbar */}
        <Navbar />
        {/* Landing section */}
        <div className="w-full h-[100vh] mx-auto flex justify-center items-center px-[10%]">
          {/* Hero Section */}
          <div className="flex flex-col gap-4 justify-center items-center h-[100%] w-full">
            <HeroTagLine icon={<PiShootingStar />} />
            <div className="flex flex-col gap-8 text-center w-[55%] relative mt-i-10 px-i-10">
              <div className="absolute top-[-5%] w-89 h-50 rounded-full bg-[radial-gradient(circle,_#60a5fa_10%,_transparent_70%)] blur-3xl opacity-30 pointer-events-none">
                {/* gradient blue */}
              </div>
              <h1 className="text-6xl font-bold px-10 text-gradient-primary">
                Local services,{" "}
                <span className="italic">expertly delivered</span>
              </h1>
              <p className="text-lg font-medium text-slate-500">
                Connect with trusted professionals in your area for all your
                service needs — from home repairs to personal tutoring
              </p>
            </div>
            <SearchBox />
            <ul className="lg:w-[60%] h-auto flex justify-center items-center gap-x-10 gap-y-4 flex-wrap mt-i-10 px-10 text-[0.9rem] text-slate-400 opacity-70 font-[400] list-disc">
              <li>10,000+ providers</li>
              <li>24/7 support</li>
              <li>Vetted professionals</li>
              <li>Satisfaction guarantee</li>
              <li>Discover our services</li>
            </ul>
          </div>
        </div>
        {/* Services Section */}
        <div className="w-full min-h-[100vh] mx-auto flex justify-center items-center flex-col py-i-10">
          {/* Services Section */}
          <SubHeader
            tag="Our Services"
            title="Services tailored to your needs"
            description="Discover the perfect service provider for any task, from home repairs to personal tutoring."
          />
          {/* Cards container */}
          <div className="w-full flex gap-4 flex-wrap justify-center py-i-lg">
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
          </div>
          <ViewAllBtn text="View All Services" />
        </div>
        {/* How it works section */}
        <HowWork />
        {/* Top Vendors Section */}
        <TopVendors />
        {/* CTA Section */}
        <div className="w-full flex flex-col gap-y-4 justify-center items-center py-i-10 mb-i-xl">
          <h2 className="text-3xl font-bold">Ready to find your perfect service?</h2>
          <p className="text-slate-500 text-center w-[50%] text-base font-medium">Browse our complete catalog of services and connect with top-rated providers in your area.</p>
          <PrimaryBtn text="View all services" icon={<BsArrowRight />} />
        </div>
        {/* Footer Section */}
      </section>
    </main>
  );
}
