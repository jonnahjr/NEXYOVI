import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

import { SiteProvider } from './context/SiteContext'

createRoot(document.getElementById('root')!).render(
 <StrictMode>
 <BrowserRouter>
 <SiteProvider>
 <App />
 </SiteProvider>
 </BrowserRouter>
 </StrictMode>,
)

