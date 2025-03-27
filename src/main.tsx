
import React from 'react' // Explicitly import React
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Wrap App with React.StrictMode to ensure React rules are followed
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
