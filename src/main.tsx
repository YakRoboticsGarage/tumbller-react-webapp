import { createRoot } from 'react-dom/client'
import { AuthProvider } from './providers/AuthProvider'
import App from './App'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Failed to find the root element')
}

createRoot(rootElement).render(
  <AuthProvider>
    <App />
  </AuthProvider>
)
