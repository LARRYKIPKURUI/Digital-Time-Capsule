import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State to hold validation error messages
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); 
        setIsLoading(true); // Indicate a process is starting

        // --- Client-side Validation ---
        // 1. Check if fields are empty
        if (!email.trim() || !password.trim()) {
            setError('Please enter both your email and password.');
            setIsLoading(false); // Stop loading, validation failed
            return; 
        }

        // 2. Validate email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address.');
            setIsLoading(false); 
            return; // Stop the function execution
        }

        // --- If client-side validation passes, simulate sending to backend ---
        console.log('Client-side validation passed. Sending data to backend for authentication:', { email, password });

        try {
            // this is where the API Call will be made
           

            //  SIMULATION ONLY 
            // For this refactor, i'll just simulate a successful 'send'
            // and then let the backend handle the *actual* login logic.
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate a small delay for "sending"

            // If we reach here, it means client-side validation passed and data was "sent".
            // The actual login success/failure and redirection would happen AFTER the backend response.
            // For now, i'll redirect as if the backend would have handled it.
            
            navigate('/dashboard');

        } catch (backendError) {
            // This catch block will handle network errors or issues with the backend call itself
            console.error('Network or backend communication error:', backendError);
            setError('Could not connect to the server. Please try again later.');
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
            <Row>
                <Col md={12}>
                    <Card style={{ width: '25rem' }}>
                        <Card.Header as="h4" className="text-center">Welcome Back</Card.Header>
                        <Card.Body>
                            <Card.Text className="text-center mb-4 text-muted">Sign in to continue to your time capsules.</Card.Text>

                            {/* Display validation error message if present */}
                            {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required 
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required 
                                    />
                                </Form.Group>
                                <div className="d-grid">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        disabled={isLoading} // Disable button when loading
                                    >
                                        {isLoading ? 'Processing...' : 'Login'} {/* Change button text based on loading state */}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                         <Card.Footer className="text-muted text-center">
                            Don't have an account? <Link to="/signup">Sign Up</Link>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;