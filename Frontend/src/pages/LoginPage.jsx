import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
const API_URL = import.meta.env.VITE_APP_API_URL;

function LoginPage({ setIsLoggedIn}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const showError = (msg) => {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: msg,
      confirmButtonColor: "#dc3545",
    });
  };

  const showSuccess = (msg) => {
    Swal.fire({
      icon: "success",
      title: "Login Successful!",
      text: msg,
      timer: 1500,
      showConfirmButton: false,
    });
  };

 const handleLogin = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  if (!email.trim() || !password.trim()) {
    setIsLoading(false);
    return showError("Please enter both your email and password.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setIsLoading(false);
    return showError("Please enter a valid email address.");
  }

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json(); 

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setIsLoggedIn(true); 

      showSuccess("Welcome back!");
      setTimeout(() => navigate("/"), 1500); 
    } else {
      showError(data.error || "Invalid email or password.");
    }
  } catch (err) {
    console.error("Login error:", err);
    showError("Something went wrong. Please try again later.");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center position-relative z-1"
      style={{ minHeight: "80vh" }}
    >
      <Row className="w-100 justify-content-center mt-5">
        <Col xs={11} sm={9} md={6} lg={5}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass-panel">
              <Card.Header className="text-center bg-transparent border-0 pt-5">
                <h3 className="fw-bold text-gradient brand-font">Welcome Back</h3>
                <p className="text-white-50 mt-2 mb-0">
                  Sign in to continue to your time capsules
                </p>
              </Card.Header>

              <Card.Body className="px-5 pb-4 text-white">
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label className="fw-semibold text-white-50">
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-dark bg-opacity-50 text-white border-secondary border-opacity-25 py-2"
                    />
                  </Form.Group>

                  <Form.Group className="mb-5" controlId="formBasicPassword">
                    <Form.Label className="fw-semibold text-white-50">Password</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-dark bg-opacity-50 text-white border-secondary border-opacity-25 py-2 border-end-0"
                      />
                      <Button
                        variant="outline-secondary"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="border-secondary border-opacity-25 bg-dark bg-opacity-50 text-white-50 border-start-0"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </div>
                  </Form.Group>

                  <div className="d-grid mt-4">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="btn-premium"
                    >
                      {isLoading ? "Processing..." : "Login"}
                    </Button>
                  </div>
                </Form>
              </Card.Body>

              <Card.Footer className="bg-transparent text-center border-0 pb-5">
                <small className="text-white-50">
                  Don't have an account? <Link to="/register" className="text-info text-decoration-none fw-bold ms-1">Sign Up</Link>
                </small>
              </Card.Footer>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
