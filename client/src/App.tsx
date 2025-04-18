import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import { DesignSystemShowcase } from "./components/DesignSystemShowcase";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Otp from "./pages/Otp";
import { useEffect, useState } from "react";
import { fetchUserSession } from "./features/auth";
import { useAppDispatch } from "./store/hooks";
import Loader from "./components/common/Loader";
import Footer from "./components/common/Footer";
export default function App() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    // Call the fetchUserSession function
    dispatch(fetchUserSession(setIsLoading));
  }, [dispatch]);

  if(isLoading){
    return <Loader />
  }
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design-system-showcase" element={<DesignSystemShowcase />} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/otp' element={<Otp/>} />
      </Routes>
      <div className='w-[100vw] flex justify-center items-center bg-primary-900'>
        <Footer />
      </div>
    </>
  )
}
