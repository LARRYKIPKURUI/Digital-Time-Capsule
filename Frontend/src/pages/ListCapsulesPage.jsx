import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Badge,
} from "react-bootstrap";
import Swal from "sweetalert2";

function ListCapsulesPage() {
  const [capsules, setCapsules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        const response = await fetch(`http://localhost:5555/capsules/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCapsules(data);
        } else {
          throw new Error("Failed to fetch capsules.");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Unable to load capsules.", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCapsules();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Capsule?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#dc3545",
      cancelButtonText: "Cancel",
      cancelButtonColor: "green",
    });

    if (!confirm.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5555/capsules/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setCapsules((prev) => prev.filter((c) => c.id !== id));
        Swal.fire("Deleted!", "Capsule has been deleted.", "success");
      } else {
        throw new Error("Failed to delete.");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not delete capsule.", "error");
    }
  };

  if (isLoading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
        <p>Loading your capsules...</p>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Your Capsules</h2>
      </div>

      {capsules.length === 0 ? (
        <p className="text-center">You haven’t created any capsules yet.</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={3} className="g-4">
          {capsules.map((capsule) => {
            const isLocked = new Date(capsule.unlock_date) > new Date();

            return (
              <Col key={capsule.id}>
                <Card className="h-100 shadow-sm rounded-4">
                  {capsule.media_url && (
                    <Card.Img
                      variant="top"
                      src={capsule.media_url}
                      alt={capsule.title}
                      className="rounded-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  )}
                  <Card.Body>
                    <Card.Title>{capsule.title}</Card.Title>
                    <Card.Text className="text-muted">
                      Unlock Date:{" "}
                      {new Date(capsule.unlock_date).toLocaleDateString()}
                    </Card.Text>
                    <Badge bg={isLocked ? "secondary" : "success"}>
                      {isLocked ? "Locked" : "Unlocked"}
                    </Badge>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="btn btn-primary text-white fw-bold"
                      onClick={() => navigate(`/capsule/${capsule.id}`)}
                    >
                      View
                    </Button>
                    {/* <Button
                      variant="outline-warning"
                      size="sm"
                      className="btn btn-warning text-dark fw-bold"
                      onClick={() => navigate(`/capsules/edit/${capsule.id}`)}
                    >
                      Edit
                    </Button> */}
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="btn btn-danger text-white fw-bold"
                      onClick={() => handleDelete(capsule.id)}
                    >
                      Delete
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
}

export default ListCapsulesPage;
