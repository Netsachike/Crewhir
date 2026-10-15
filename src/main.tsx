import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { App } from './app'
import './styles/globals.css'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Prerendered pages hydrate; the dev server renders from scratch.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)

;(window as Window & { __crewhirReady?: boolean }).__crewhirReady = true
