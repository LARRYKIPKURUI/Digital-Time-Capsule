import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
const API_URL = import.meta.env.VITE_APP_API_URL;

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { username, email, password } = formData;

  const showError = (msg) => {
    Swal.fire({
      icon: "error",
      title: "Registration Failed",
      text: msg,
      confirmButtonColor: "#dc3545",
    });
  };

  const showSuccess = (msg) => {
    Swal.fire({
      icon: "success",
      title: "Account Created!",
      text: msg,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!username.trim() || !email.trim() || !password.trim()) {
      setIsLoading(false);
      return showError("All fields are required.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setIsLoading(false);
      return showError("Please enter a valid email address.");
    }

    if (password.length < 6) {
      setIsLoading(false);
      return showError("Password must be at least 6 characters.");
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const resData = await response.json(); 

      if (response.status === 201) {
        showSuccess("Your account has been created!");

        // Save token
        localStorage.setItem("token", resData.token); 

        // Reset the form
        setFormData({ username: "", email: "", password: "" });

        // Navigate to login after sign up
        setTimeout(() => navigate("/login"), 1600);
      } else {
        showError(resData.error || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
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
      <Row className="w-100 justify-content-center mt-5 mb-5">
        <Col xs={11} sm={9} md={6} lg={5}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass-panel">
              <Card.Header className="text-center bg-transparent border-0 pt-5">
                <h3 className="fw-bold text-gradient brand-font">Create Your Account</h3>
                <p className="text-white-50 mt-2 mb-0">
                  Join and start preserving memories
                </p>
              </Card.Header>
              <Card.Body className="px-5 py-4 text-white">
                <Form onSubmit={onSubmit}>
                  <Form.Group className="mb-4" controlId="formUsername">
                    <Form.Label className="fw-semibold text-white-50">Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      name="username"
                      value={username}
                      onChange={onChange}
                      required
                      className="bg-dark bg-opacity-50 text-white border-secondary border-opacity-25 py-2"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formEmail">
                    <Form.Label className="fw-semibold text-white-50">
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={email}
                      onChange={onChange}
                      required
                      className="bg-dark bg-opacity-50 text-white border-secondary border-opacity-25 py-2"
                    />
                  </Form.Group>

                  <Form.Group className="mb-5" controlId="formPassword">
                    <Form.Label className="fw-semibold text-white-50">Password</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        name="password"
                        value={password}
                        onChange={onChange}
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
                      {isLoading ? "Registering..." : "Register"}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
              <Card.Footer className="bg-transparent text-center border-0 pb-5">
                <small className="text-white-50">
                  Already have an account? <Link to="/login" className="text-info text-decoration-none fw-bold ms-1">Login</Link>
                </small>
              </Card.Footer>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
