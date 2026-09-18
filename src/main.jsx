import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'

const rootElement = document.getElementById('root')
const skeleton = document.getElementById('app-skeleton')

createRoot(rootElement).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)

if (skeleton) {
  const hideSkeleton = () => {
    skeleton.style.opacity = '0'
    skeleton.style.visibility = 'hidden'
    skeleton.style.pointerEvents = 'none'
    document.body.style.overflow = ''
  }

  requestAnimationFrame(hideSkeleton)
}
