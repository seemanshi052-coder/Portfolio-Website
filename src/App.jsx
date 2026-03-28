import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import ParticleBackground from './components/ParticleBackground'

// Lazy load pages for better performance
const LandingPage = lazy(() => import('./pages/LandingPage'))
const MemberPortfolio = lazy(() => import('./pages/MemberPortfolio'))

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="flex-center" style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <div className="animate-pulse" style={{ color: 'var(--text-secondary)' }}>
        <p>Loading...</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <>
      <ParticleBackground />
      <CustomCursor />
      <ScrollProgress />
      <BackToTop />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Landing page route */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Individual member portfolio routes */}
          <Route path="/:memberName" element={<MemberPortfolio />} />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
