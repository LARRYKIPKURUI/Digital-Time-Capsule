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
import { motion } from "framer-motion";
const API_URL = import.meta.env.VITE_APP_API_URL;

function ListCapsulesPage() {
  const [capsules, setCapsules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        const response = await fetch(`${API_URL}/capsules/${user.id}`, {
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
    <Container className="my-5 position-relative z-1" style={{ minHeight: "80vh" }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-5"
      >
        <h2 className="fw-bold text-gradient brand-font display-5">Your Capsules</h2>
      </motion.div>

      {capsules.length === 0 ? (
        <p className="text-center">You haven’t created any capsules yet.</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={3} className="g-4">
          {capsules.map((capsule) => {
            const isLocked = new Date(capsule.unlock_date) > new Date();

            return (
              <Col key={capsule.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="h-100"
                >
                  <Card className="h-100 glass-card overflow-hidden">
                    {capsule.media_url && (
                      <Card.Img
                        variant="top"
                        src={capsule.media_url}
                        alt={capsule.title}
                        style={{ height: "200px", objectFit: "cover", opacity: 0.85 }}
                      />
                    )}
                    <Card.Body className="bg-dark bg-opacity-50">
                      <Card.Title className="fw-bold text-primary brand-font fs-4">{capsule.title}</Card.Title>
                      <Card.Text className="text-white-50">
                        Unlock Date:{" "}
                        <span className="text-white">{new Date(capsule.unlock_date).toLocaleDateString()}</span>
                      </Card.Text>
                      <Badge bg={isLocked ? "secondary" : "success"} className="px-3 py-2 rounded-pill">
                        {isLocked ? "Locked 🔒" : "Unlocked 🔓"}
                      </Badge>
                    </Card.Body>
                    <Card.Footer className="bg-dark bg-opacity-50 d-flex justify-content-between gap-2 border-0 pb-4 pt-0">
                      <Button
                        size="sm"
                        className="btn-premium-outline px-4"
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
                        className="rounded-pill px-4"
                        onClick={() => handleDelete(capsule.id)}
                      >
                        Delete
                      </Button>
                    </Card.Footer>
                  </Card>
                </motion.div>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
}

export default ListCapsulesPage;
