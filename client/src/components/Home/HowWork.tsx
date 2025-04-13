import { FiSearch, FiCalendar, FiMessageCircle, FiCheckCircle } from "react-icons/fi";
import { Button } from "../ui/button";
import SubHeader from "../common/SubHeader";

export default function HowWork() {
  const steps = [
    {
      id: 1,
      icon: <FiSearch className="text-2xl" />,
      title: "Find a service",
      description: "Browse through our extensive catalog of services or search for a specific need.",
    },
    {
      id: 2,
      icon: <FiCalendar className="text-2xl" />,
      title: "Book an appointment",
      description: "Select a convenient time from the provider's availability calendar.",
    },
    {
      id: 3,
      icon: <FiMessageCircle className="text-2xl" />,
      title: "Connect & communicate",
      description: "Chat with your service provider to discuss specific requirements.",
    },
    {
      id: 4,
      icon: <FiCheckCircle className="text-2xl" />,
      title: "Get it done",
      description: "Receive quality service and provide feedback on your experience.",
    },
  ];

  return (
    <section className="w-full py-i-20 my-i-10">
      <div className="w-full max-w-[1200px] mx-auto px-i-14 flex flex-col gap-7">
        {/* Section Header */}
        <SubHeader tag="How It Works" title="Simple, transparent process" description="Getting the service you need is easy and straightforward with our platform." />

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="shadow-lg bg-white rounded-md overflow-hidden h-[250px] flex flex-col justify-center items-center"
            >
              <div className="flex flex-col gap-4 items-center px-i-lg py-i-14">
                <div className="flex items-center justify-center w-[60px] h-[60px] relative mb-4">
                  <div className="absolute inset-0 bg-primary-50 rounded-full flex items-center justify-center text-primary-500">
                    {step.icon}
                  </div>
                  <div className="absolute -top-1 -right-1 w-[24px] h-[24px] bg-primary-800 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {step.id}
                  </div>
                </div>
                <h3 className="text-sm font-medium text-slate-800">{step.title}</h3>
                <p className="text-slate-500 text-center text-[13px] mt-i-4 font-medium">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-primary-gradient rounded-md px-i-lg py-i-lg mt-i-lg mb-i-20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white flex flex-col gap-2">
              <h3 className="text-xl font-bold">Ready to find your service provider?</h3>
              <p className="text-primary-50 mt-i-2 text-xs font-medium">Join thousands of satisfied customers today.</p>
            </div>
            <div className="mt-i-10 md:mt-0">
              <Button variant="secondary" className="rounded-md text-xs font-semibold px-i-lg py-i-2">
                Get Started Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
