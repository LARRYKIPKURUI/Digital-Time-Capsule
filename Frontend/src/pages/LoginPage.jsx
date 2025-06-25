import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
    const response = await fetch("http://localhost:5555/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json(); //  Define 'data' here

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setIsLoggedIn(true); //  Make sure you're receiving this as a prop

      showSuccess("Welcome back!");
      setTimeout(() => navigate("/dashboard"), 1500); // or navigate somewhere appropriate
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
      className="d-flex align-items-center justify-content-center bg-light"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={9} md={6} lg={4}>
          <div>
            <Card className="shadow rounded-4 border-0">
              <Card.Header className="text-center bg-white border-0 pt-4">
                <h4 className="fw-bold text-primary">Welcome Back</h4>
                <p className="text-muted mb-0">
                  Sign in to continue to your time capsules
                </p>
              </Card.Header>

              <Card.Body className="px-4 pb-4">
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="fw-semibold">
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="rounded-3"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="rounded-start-3"
                      />
                      <Button
                        variant="outline-secondary"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="rounded-end-3"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </div>
                  </Form.Group>

                  <div className="d-grid">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isLoading}
                      className="rounded-3 py-2 fw-semibold"
                    >
                      {isLoading ? "Processing..." : "Login"}
                    </Button>
                  </div>
                </Form>
              </Card.Body>

              <Card.Footer className="bg-white text-center border-0 pb-4">
                <small className="text-muted">
                  Don't have an account? <Link to="/register">Sign Up</Link>
                </small>
              </Card.Footer>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
