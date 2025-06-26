import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
      const response = await fetch("http://localhost:5555/register", {
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
      className="d-flex align-items-center justify-content-center bg-light"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={9} md={6} lg={4}>
          <div>
            <Card className="shadow rounded-4 border-0">
              <Card.Header className="text-center bg-white border-0 pt-4">
                <h4 className="fw-bold text-primary">Create Your Account</h4>
                <p className="text-muted mb-0">
                  Join and start preserving memories
                </p>
              </Card.Header>
              <Card.Body className="px-4 pb-4">
                <Form onSubmit={onSubmit}>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label className="fw-semibold">Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      name="username"
                      value={username}
                      onChange={onChange}
                      required
                      className="rounded-3"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label className="fw-semibold">
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={email}
                      onChange={onChange}
                      required
                      className="rounded-3"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        name="password"
                        value={password}
                        onChange={onChange}
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
                      {isLoading ? "Registering..." : "Register"}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
              <Card.Footer className="bg-white text-center border-0 pb-4">
                <small className="text-muted">
                  Already have an account? <Link to="/login">Login</Link>
                </small>
              </Card.Footer>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
