import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Alert } from 'react-bootstrap';

// Mock data -> to be replaced with data fetched from  backend)
const mockCapsules = [
    {
        id: '1',
        title: 'Goals for Next Year',
        message: 'Dear Future Me, hope you achieved all your goals! Remember to stay positive and keep learning. Did you finally learn to play the guitar?',
        unlockDate: '2025-12-25', // This capsule is still locked
        imageUrl: 'https://via.placeholder.com/400x200/FF5733/FFFFFF?text=Future+Goals'
    },
    {
        id: '2',
        title: 'Memories of 2024',
        message: 'This year was wild! Remember that trip to the coast? And the new job? Cherish these moments.',
        unlockDate: '2024-06-21', // This capsule is unlocked
        imageUrl: 'https://via.placeholder.com/400x200/33FF57/FFFFFF?text=2024+Memories'
    },
    {
        id: '3',
        title: 'Letter to My Grandkids',
        message: 'Hello, future generations! This is your grandparent speaking from the past. The world looked very different back then...',
        unlockDate: '2050-01-01', // This capsule is still locked
        imageUrl: null
    },
];

function ViewCapsule() {
    const { id } = useParams(); // Gets the capsule ID from the URL (e.g., /view-capsule/1)
    const navigate = useNavigate();

    // Directly find the capsule from mock data
    const capsule = mockCapsules.find(c => c.id === id);

    // Determine if the capsule is locked based on its unlockDate
    const isLocked = capsule ? new Date(capsule.unlockDate) > new Date() : true;

    // If no capsule is found for the given ID, show a simple alert
    if (!capsule) {
        return (
            <Container className="text-center my-5">
                <Alert variant="danger">Capsule not found!</Alert>
                <Button variant="secondary" onClick={() => navigate('/dashboard')}>
                    Back to Dashboard
                </Button>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <Button variant="outline-secondary" onClick={() => navigate('/dashboard')} className="mb-4">
                &larr; Back to all Capsules
            </Button>
            <Card>
                <Card.Header as="h3" className="d-flex justify-content-between align-items-center">
                    {capsule.title}
                    {isLocked ? (
                        <span className="badge bg-secondary">Locked</span>
                    ) : (
                        <span className="badge bg-success">Unlocked</span>
                    )}
                </Card.Header>
                <Card.Body>
                    <Card.Text className="text-muted mb-3">
                        Unlock Date: {new Date(capsule.unlockDate).toLocaleDateString()}
                    </Card.Text>

                    {isLocked ? (
                        <Alert variant="warning" className="text-center">
                            This capsule is currently sealed. It will unlock on {new Date(capsule.unlockDate).toLocaleDateString()}.
                        </Alert>
                    ) : (
                        <>
                            <Card.Text>{capsule.message}</Card.Text>
                            {capsule.imageUrl && (
                                <img src={capsule.imageUrl} alt={capsule.title} className="img-fluid rounded mt-3" />
                            )}
                        </>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ViewCapsule;