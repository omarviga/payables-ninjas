
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// Check for user's preferred color scheme
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Apply dark mode class if preferred
if (prefersDarkMode) {
  document.documentElement.classList.add('dark');
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
