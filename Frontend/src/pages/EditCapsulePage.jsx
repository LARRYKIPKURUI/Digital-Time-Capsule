import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import Swal from "sweetalert2";

function EditCapsulePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [mediaURL, setMediaURL] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const fetchCapsule = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5555/capsules/${id}`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //  Must include token
        },
      });

      if (res.ok) {
        const data = await res.json();
        setTitle(data.title);
        setMessage(data.message);
        setMediaURL(data.media_url);
        setUnlockDate(data.unlock_date.split("T")[0]); // format YYYY-MM-DD
      } else {
        throw new Error("Capsule not found");
      }
    } catch (err) {
      console.error("Failed to load capsule:", err);
      Swal.fire("Error", "Failed to load capsule.", "error");
      navigate("/capsules");
    } finally {
      setIsLoading(false); 
    }
  };

  fetchCapsule();
}, [id, navigate]);

const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:5555/capsules/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        message,
        media_url: mediaURL,
        unlock_date: unlockDate,
      }),
    });

    if (res.ok) {
      Swal.fire("Success", "Capsule updated successfully.", "success");
      navigate(`/capsule/${id}`); // This one uses the PUBLIC view route
    } else {
      const data = await res.json();
      Swal.fire("Error", data.error || "Failed to update capsule.", "error");
    }
  } catch (err) {
    console.error(err);
    Swal.fire("Error", "An error occurred.", "error");
  }
};

if (isLoading) {
  return (
    <Container className="text-center my-5">
      <Spinner animation="border" />
      <p className="mt-2">Loading capsule...</p>
    </Container>
  );
}

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h2 className="text-center fw-bold mb-4">Edit Capsule</h2>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="p-4">
              <Form onSubmit={handleUpdate}>
                <Form.Group className="mb-3">
                  <Form.Label>Capsule Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Your Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Media URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={mediaURL}
                    onChange={(e) => setMediaURL(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Unlock Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={unlockDate}
                    onChange={(e) => setUnlockDate(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EditCapsulePage;
