import NavBar from './components/NavBar'
import Footer from './components/Footer'
import AppRoutes from './routes'

function App() {
  return (
    <>
      <NavBar />
      <div className="p-4">
        <AppRoutes />
      </div>
      <Footer />
    </>
  )
}

export default App
