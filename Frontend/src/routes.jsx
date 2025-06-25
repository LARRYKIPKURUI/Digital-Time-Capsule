import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NewCapsule from "./pages/NewCapsule";
import ViewCapsule from "./pages/ViewCapsule";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import ListCapsulesPage from "./pages/ListCapsulesPage";

function AppRoutes({ setIsLoggedIn }) {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/login"
        element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
      />

      {/* Protected Routes */}
      <Route
        path="/new"
        element={
          <PrivateRoute>
            <NewCapsule />
          </PrivateRoute>
        }
      />
      <Route
        path="/capsule/:id"
        element={
          <PrivateRoute>
            <ViewCapsule />
          </PrivateRoute>
        }
      />
      <Route
        path="/capsules"
        element={
          <PrivateRoute>
            <ListCapsulesPage/>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
