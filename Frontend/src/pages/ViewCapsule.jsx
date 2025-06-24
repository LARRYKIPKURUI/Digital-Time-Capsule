import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Alert, Spinner } from 'react-bootstrap';

function ViewCapsule() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [capsule, setCapsule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

// Endpoint should return json like the below format and return 404 for missing capsules application/json on success
// {
//   "id": "2",
//   "title": "Memories of 2024",
//   "message": "This year was wild...",
//   "unlock_date": "2024-06-21",
//   "image_url": "https://example.com/image.jpg"
// }


  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        const response = await fetch(`/api/capsules/${id}`); //To Replace with Real Backend Endpoint
        if (response.ok) {
          const data = await response.json();
          setCapsule(data);
        } else if (response.status === 404) {
          setNotFound(true);
        } else {
          throw new Error('Failed to fetch capsule');
        }
      } catch (err) {
        console.error('Error fetching capsule:', err);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCapsule();
  }, [id]);

  if (isLoading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status" />
        <p className="mt-2">Loading capsule...</p>
      </Container>
    );
  }

  if (notFound || !capsule) {
    return (
      <Container className="text-center my-5">
        <Alert variant="danger">Capsule not found!</Alert>
        <Button variant="secondary" onClick={() => navigate('/')}>
          Back to Home Page 
        </Button>
      </Container>
    );
  }

  const isLocked = new Date(capsule.unlock_date) > new Date();

  return (
    <Container className="my-5">
      <Button
        variant="outline-secondary"
        onClick={() => navigate('/')}
        className="mb-4"
      >
        &larr; Back to all Capsules
      </Button>

      <Card>
        <Card.Header
          as="h3"
          className="d-flex justify-content-between align-items-center"
        >
          {capsule.title}
          <span className={`badge ${isLocked ? 'bg-secondary' : 'bg-success'}`}>
            {isLocked ? 'Locked' : 'Unlocked'}
          </span>
        </Card.Header>

        <Card.Body>
          <Card.Text className="text-muted mb-3">
            Unlock Date: {new Date(capsule.unlock_date).toLocaleDateString()}
          </Card.Text>

          {isLocked ? (
            <Alert variant="warning" className="text-center">
              This capsule is currently sealed. It will unlock on{' '}
              {new Date(capsule.unlock_date).toLocaleDateString()}.
            </Alert>
          ) : (
            <>
              <Card.Text>{capsule.message}</Card.Text>
              {capsule.image_url && (
                <img
                  src={capsule.image_url}
                  alt={capsule.title}
                  className="img-fluid rounded mt-3"
                />
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ViewCapsule;
