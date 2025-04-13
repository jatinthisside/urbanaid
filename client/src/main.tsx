import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router";
import Footer from './components/common/Footer.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      {/* Footer */}
      <div className='w-[100vw] flex justify-center items-center bg-primary-900'>
        <Footer />
      </div>
    </BrowserRouter>
  </StrictMode>,
)
