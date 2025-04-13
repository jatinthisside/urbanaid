import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import { DesignSystemShowcase } from "./components/DesignSystemShowcase";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design-system-showcase" element={<DesignSystemShowcase />} />
      </Routes>
    </div>
  )
}
