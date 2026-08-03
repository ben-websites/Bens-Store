import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2200,
          style: {
            borderRadius: '8px',
            border: '1px solid #d8d1c2',
            color: '#1f2937',
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>,
)
