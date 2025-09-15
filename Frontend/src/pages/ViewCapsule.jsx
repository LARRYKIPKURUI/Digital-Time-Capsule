import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
const API_URL = import.meta.env.VITE_APP_API_URL;

function ViewCapsule() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [capsule, setCapsule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        const response = await fetch(`${API_URL}/capsule/${id}`);

        if (response.status === 404) {
          Swal.fire({
            icon: "error",
            title: "Not Found",
            text: "Capsule not found!",
            confirmButtonColor: "#dc3545",
          }).then(() => navigate("/capsules"));
          return;
        }

        if (response.status === 403) {
          Swal.fire({
            icon: "warning",
            title: "Capsule Locked",
            text: "This capsule is still sealed. Come back after the unlock date.",
            confirmButtonColor: "#ffc107",
          }).then(() => navigate("/capsules"));
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setCapsule(data);
        } else {
          throw new Error("Failed to fetch capsule");
        }
      } catch (err) {
        console.error("Error fetching capsule:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong while loading the capsule.",
          confirmButtonColor: "#dc3545",
        }).then(() => navigate("/capsules"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCapsule();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status" />
        <p className="mt-2">Loading capsule...</p>
      </Container>
    );
  }

  if (!capsule) return null; 

  const isLocked = new Date(capsule.unlock_date) > new Date();

  return (
    <Container className="my-5">
      <Button
        variant="outline-secondary"
        onClick={() => navigate("/capsules")}
        className="mb-4"
      >
        &larr; Back to My Capsules
      </Button>

      <Card>
        <Card.Header
          as="h3"
          className="d-flex justify-content-between align-items-center"
        >
          {capsule.title}
          <span className={`badge ${isLocked ? "bg-secondary" : "bg-success"}`}>
            {isLocked ? "Locked" : "Unlocked"}
          </span>
        </Card.Header>

        <Card.Body>
          <Card.Text className="text-muted mb-3">
            Unlock Date: {new Date(capsule.unlock_date).toLocaleDateString()}
          </Card.Text>

          <Card.Text>{capsule.message}</Card.Text>

          {capsule.media_url && (
            <img
              src={capsule.media_url}
              alt={capsule.title}
              className="img-fluid rounded mt-3"
            />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ViewCapsule;
