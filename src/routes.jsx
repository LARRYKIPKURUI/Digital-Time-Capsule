import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import NewCapsule from './pages/NewCapsule'
import ViewCapsule from './pages/ViewCapsule'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/new" element={<NewCapsule />} />
      <Route path="/capsule/:id" element={<ViewCapsule />} />
    </Routes>
  )
}

export default AppRoutes
