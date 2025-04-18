import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import { DesignSystemShowcase } from "./components/DesignSystemShowcase";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Otp from "./pages/Otp";
import { useEffect } from "react";
import { fetchUserSession } from "./features/auth";
import { useAppDispatch } from "./store/hooks";

export default function App() {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    // Call the fetchUserSession function
    dispatch(fetchUserSession());
  }, [dispatch]);
  
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design-system-showcase" element={<DesignSystemShowcase />} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/otp' element={<Otp/>} />
      </Routes>
  )
}
