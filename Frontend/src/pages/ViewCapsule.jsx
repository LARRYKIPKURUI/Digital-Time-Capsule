import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
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
    <Container className="my-5 position-relative z-1" style={{ minHeight: "80vh" }}>
      <Button
        onClick={() => navigate("/capsules")}
        className="btn-premium-outline mb-4 px-4"
      >
        &larr; Back to My Capsules
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="glass-panel border-0 text-white p-2">
          <Card.Header
            as="h3"
            className="d-flex justify-content-between align-items-center bg-transparent border-0 pt-4 px-4"
          >
            <span className="brand-font text-gradient fw-bold">{capsule.title}</span>
            <span className={`badge px-3 py-2 ${isLocked ? "bg-secondary" : "bg-success"}`}>
              {isLocked ? "Locked 🔒" : "Unlocked 🔓"}
            </span>
          </Card.Header>

          <Card.Body className="px-4 pb-4">
            <Card.Text className="text-white-50 mb-4 border-bottom border-secondary border-opacity-25 pb-3">
              Unlock Date: <span className="text-white">{new Date(capsule.unlock_date).toLocaleDateString()}</span>
            </Card.Text>

            <Card.Text className="fs-5" style={{ lineHeight: "1.8", whiteSpace: "pre-wrap" }}>
              {capsule.message}
            </Card.Text>

            {capsule.media_url && (
              <div className="mt-4 rounded-4 overflow-hidden border border-secondary border-opacity-25">
                <img
                  src={capsule.media_url}
                  alt={capsule.title}
                  className="img-fluid w-100"
                />
              </div>
            )}
          </Card.Body>
        </Card>
      </motion.div>
    </Container>
  );
}

export default ViewCapsule;
