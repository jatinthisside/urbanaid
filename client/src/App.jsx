import React from 'react';
import { Routes, Route } from 'react-router';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import About from '../pages/About';


export default function App() {
  return (
    <div>
      <Routes> 
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  )
}
