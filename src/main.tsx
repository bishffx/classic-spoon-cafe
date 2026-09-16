import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Keep all client-initiated scrolls under our control.
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)