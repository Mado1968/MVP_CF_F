import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SessionProvider } from './context/SessionContext'
import SafetyExit   from './components/cards/layout/SafetyExit'
import WelcomePage  from './pages/WelcomePage'
import FlowPage     from './pages/FlowPage'
import SafetyPage   from './pages/SafetyPage'
import ClosingPage  from './pages/ClosingPage'
import RouteAPage   from './pages/RouteAPage'
import RouteBPage   from './pages/RouteBPage'
import RouteCPage   from './pages/RouteCPage'


export default function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"       element={<WelcomePage />} />
          <Route path="/flow"   element={<FlowPage />} />
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="/done"   element={<ClosingPage />} />
          <Route path="/route-a" element={<RouteAPage />} />
          <Route path="/route-b" element={<RouteBPage />} />
          <Route path="/route-c" element={<RouteCPage />} />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  )
}
