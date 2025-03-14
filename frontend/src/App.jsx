import React from 'react'
import {Routes, Route} from 'react-router'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

export default function App() {
  return (
    <div className='text-white w-full min-h-screen px-[4rem]'>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
      </Routes>
    </div>
  )
}
