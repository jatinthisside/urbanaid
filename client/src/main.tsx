import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router";
import Footer from './components/common/Footer.tsx';
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "react-redux";
import store from "./store/store.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
      <App />
      {/* Footer */}
      <div className='w-[100vw] flex justify-center items-center bg-primary-900'>
        <Footer />
      </div>
      <Toaster position='top-right' richColors/>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
