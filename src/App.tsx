import React from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import ExplorePage from './pages/ExplorePage'
import './styles/App.css'
import NotFound from './components/404/NotFoundRoute'
import LandingPage from './pages/LandingPage'

const App: React.FC = () => {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="explore">
            <Route index element={<ExplorePage />} />
          </Route>
          <Route path="*" element={<NotFound />} /> {/* here is not found route */}
        </Routes>
      </Router>
    </div>
  )
}

export default App
