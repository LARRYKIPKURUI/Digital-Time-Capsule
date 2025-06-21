import React, { useState } from "react";
// import axios from "axios";
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    // sending data to  Flask API
    console.log("Form data submitted:", formData);

    //  future API call with axios:
    /*
        try {
            // Replace with your actual backend URL
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            console.log('Server response:', res.data);
            // You can then redirect the user or show a success message
        } catch (err) {
            console.error(err.response.data);
            // Handle registration errors (e.g., user already exists)
        }
        */
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow rounded-4">
            <h2 className="text-center mb-4">Create Your Account</h2>
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-4">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  minLength="6"
                  required
                />
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
