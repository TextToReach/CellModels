import { createRoot } from 'react-dom/client'
import './index.css'
import App from './routes/page.tsx'

createRoot(document.getElementById('root')!).render(
  <App />
)