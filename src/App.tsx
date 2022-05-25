import React, { FC } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import './styles/App.css'
import LandingPage from './pages/LandingPage'
import { useAppSelector } from './app/hooks'
import ExplorePage from './pages/ExplorePage'
import PropertyDetailsComponent from './pages/PropertyDetailsPage'
import PostProperty from './pages/PostPropertyPage'
import RegisterUser from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import NotFound from './components/404/NotFoundRoute'

const App: FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { token } = useAppSelector((state) => state.userLogin)

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const isLoggedIn = !!token

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="register" element={<RegisterUser />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="postproperty"
            element={isLoggedIn ? <PostProperty /> : <Navigate to="/login" replace />}
          />
          <Route path="explore">
            <Route index element={<ExplorePage />} />
            <Route path=":id" element={<PropertyDetailsComponent />} />
          </Route>
          <Route path="*" element={<NotFound />} /> {/* here is not found route */}
        </Routes>
      </Router>
    </div>
  )
}

export default App
