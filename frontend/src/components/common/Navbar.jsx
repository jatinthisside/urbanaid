import React from 'react'
import { Link } from 'react-router'
import SigninBtn from './SigninBtn'  

export default function Navbar() {
  return (
    <nav className='flex justify-between items-center p-4'>
      <div className='text-2xl font-bold font-text text-[0.9rem] font-semibold text-slate-900'>
        <Link to="/">Urban<span className='text-blue-500'>aid</span></Link>
      </div>
      <ul className='flex gap-7 items-center font-text text-xs text-slate-700 font-[600]'>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      <div>
       <SigninBtn/>
      </div>
      </ul>
    </nav>
  )
}
