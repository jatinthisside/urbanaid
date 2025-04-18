import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import { DesignSystemShowcase } from "./components/DesignSystemShowcase";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Otp from "./pages/Otp";

export default function App() {
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
