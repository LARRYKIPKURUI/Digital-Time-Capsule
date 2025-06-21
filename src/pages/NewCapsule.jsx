
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap'; // Added Row, Col for potential layout if needed

function CreateCapsulePage() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [unlockDate, setUnlockDate] = useState('');
    const [imageFile, setImageFile] = useState(null); // State for file input
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
    const [error, setError] = useState(''); // State for error messages
    const [successMessage, setSuccessMessage] = useState(''); // State for success message

    const handleCreate = (e) => { 
        e.preventDefault();
        setError(''); // Clear any previous errors
        setSuccessMessage(''); // Clear any previous success messages
        setIsLoading(true); 

        // --- Client-side Validation ---
        if (!title.trim()) {
            setError('Capsule Title cannot be empty.');
            setIsLoading(false); 
            return; // Stop the function execution
        }
        if (!message.trim()) {
            setError('Your Message cannot be empty.');
            setIsLoading(false); // Stop loading, validation failed
            return; 
        }
        if (!unlockDate) {
            setError('Please select an Unlock Date.');
            setIsLoading(false); 
            return; 
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to compare just dates
        const selectedDate = new Date(unlockDate);
        selectedDate.setHours(0, 0, 0, 0);

        // Validate that the unlock date is in the future
        if (selectedDate <= today) {
            setError('Unlock Date must be in the future.');
            setIsLoading(false); 
            return; 
        }

        // --- Client-side validation passed ---
        // At this point, the data is valid and ready to be sent to the backend.
        console.log('Client-side validation passed. Data ready for backend submission:', { title, message, unlockDate, imageFile: imageFile ? imageFile.name : null });

        // --- BACKEND INTEGRATION POINT ---
        // This is where I will make the API call to the backend.
        // will use `fetch` or `axios` to send `title`, `message`, `unlockDate`,
        // and `imageFile` (often as FormData for file uploads).

        
        // For this refactored component, without actual API calls,
        // the loading state will stop here
        // In a real app, the code above would replace this.
        setIsLoading(false);
        
        
        setSuccessMessage('Capsule data validated. Ready for backend submission!');
        setTimeout(() => navigate('/dashboard'), 1500);
    };

    return (
        <Container className="my-5"> {/* Added margin for better spacing */}
            <Row className="justify-content-center">
                <Col md={8} lg={6}> {/* Constrain width for better readability */}
                    <h2>Create a New Time Capsule</h2>
                    <p className="text-muted mb-4">Write a message to your future self. It will be sealed until the date you choose.</p>

                    {/* Display messages */}
                    {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
                    {successMessage && <Alert variant="success">{successMessage}</Alert>}

                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleCreate}>
                                <Form.Group className="mb-3" controlId="capsuleTitle">
                                    <Form.Label>Capsule Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="e.g., Goals for Next Year"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                        disabled={isLoading} // Disable input while loading
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="capsuleMessage">
                                    <Form.Label>Your Message</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        placeholder="Dear Future Me..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                        disabled={isLoading} 
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="capsuleImage">
                                    <Form.Label>Add a Picture (Optional)</Form.Label>
                                    <Form.Control
                                        type="file"
                                        onChange={(e) => setImageFile(e.target.files[0])} // Store the file object
                                        disabled={isLoading}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="unlockDate">
                                    <Form.Label>Unlock Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={unlockDate}
                                        onChange={(e) => setUnlockDate(e.target.value)}
                                        required
                                        disabled={isLoading} 
                                    />
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={isLoading} 
                                >
                                    {isLoading ? 'Sealing Capsule...' : 'Seal Capsule'} {/* Change text based on loading */}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default CreateCapsulePage;