import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AppRoutes from './routes';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="position-relative overflow-hidden">
      {/* Global Glowing Orbs */}
      <div className="glowing-orb orb-1"></div>
      <div className="glowing-orb orb-2"></div>
      
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="min-vh-100 position-relative z-1">
        <AppRoutes setIsLoggedIn={setIsLoggedIn} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
