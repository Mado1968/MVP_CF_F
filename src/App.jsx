import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SessionProvider } from './context/SessionContext'
import SafetyExit   from './components/cards/layout/SafetyExit'
import WelcomePage  from './pages/WelcomePage'
import FlowPage     from './pages/FlowPage'
import SafetyPage   from './pages/SafetyPage'
import ClosingPage  from './pages/ClosingPage'
import WelcomePage  from './pages/WelcomePage'

export default function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <SafetyExit />
        <Routes>
          <Route path="/"       element={<WelcomePage />} />
          <Route path="/flow"   element={<FlowPage />} />
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="/done"   element={<ClosingPage />} />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  )
}
