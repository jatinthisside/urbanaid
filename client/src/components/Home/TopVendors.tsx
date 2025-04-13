import SubHeader from "../common/SubHeader"
import ViewAllBtn from "../common/ViewAllBtn"
import VendorCard from "./VendorCard"

export default function TopVendors() {
  return (  
   <section className="w-full py-i-10 my-i-10 mb-i-xl h-auto">
    <div className="w-full max-w-[1200px] mx-auto px-i-14 flex flex-col gap-7">
      {/* Section Header */}
      <SubHeader tag="Top Rated Providers" title="Meet our top service providers" description="Highly rated professionals ready to help with your service needs." />
      {/* Venodr Cards Container */}
      <div className="w-full py-i-4 flex flex-wrap gap-6 justify-center">
        <VendorCard name="John Doe" profession="Home Improvement Specialist" rating={4.5} reviews={100} hourlyRate={50} isVerified={true} profileImage="https://via.placeholder.com/150" location="New York, NY"/>
        <VendorCard name="John Doe" profession="Home Improvement Specialist" rating={4.5} reviews={100} hourlyRate={50} isVerified={true} profileImage="https://via.placeholder.com/150" location="New York, NY" />
        <VendorCard name="John Doe" profession="Home Improvement Specialist" rating={4.5} reviews={100} hourlyRate={50} isVerified={true} profileImage="https://via.placeholder.com/150" location="New York, NY" />
      </div>
      <div className="w-full flex justify-center">
        <ViewAllBtn text="View All Providers" />
      </div>
      </div>
    </section>
  )
}
