import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";

function CreateCapsulePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [mediaFile, setMediaFile] = useState(null); //  File object
  const [reminderEmail, setReminderEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const showError = (msg) => {
    Swal.fire({
      icon: "error",
      title: "Invalid",
      text: msg,
      confirmButtonColor: "#dc3545",
    });
  };

  const showSuccess = (msg) => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: msg,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!title.trim()) return showError("Capsule Title cannot be empty.");
    if (!message.trim()) return showError("Your Message cannot be empty.");
    if (!unlockDate) return showError("Please select an Unlock Date & Time.");

    const selectedDate = new Date(unlockDate);
    const now = new Date();
    if (selectedDate <= now)
      return showError("Unlock Date must be in the future.");

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("message", message);
      formData.append("unlock_date", unlockDate);
      formData.append("image", mediaFile); // file from input[type="file"]
      if (reminderEmail.trim()) {
        formData.append("reminder_email", reminderEmail.trim());
      }

      const response = await fetch("http://localhost:5555/capsules", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        showSuccess("Capsule created successfully!");
        setTimeout(() => navigate("/capsules"), 1600);
      } else {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to create capsule.");
      }
    } catch (err) {
      console.error("Error creating capsule:", err);
      showError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="my-3">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="text-center mb-3">
            <h2 className="fw-bold">Create a New Time Capsule</h2>
            <p className="text-muted p-3">
              Write a message to your future self. It will be sealed until the
              date and time you choose.
            </p>
          </div>

          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="p-4">
              <Form onSubmit={handleCreate}>
                <Form.Group className="mb-3" controlId="capsuleTitle">
                  <Form.Label className="fw-semibold text-primary">
                    Capsule Title
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Goals for Next Year"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isLoading}
                    className="rounded-3"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="capsuleMessage">
                  <Form.Label className="fw-semibold text-primary">
                    Your Message
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Dear Future Me..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isLoading}
                    className="rounded-3"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="capsuleMedia">
                  <Form.Label className="fw-semibold text-primary">
                    Upload Capsule Media
                  </Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    disabled={isLoading}
                    onChange={(e) => setMediaFile(e.target.files[0])}
                    className="rounded-3"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="unlockDate">
                  <Form.Label className="fw-semibold text-primary">
                    Unlock Date & Time
                  </Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={unlockDate}
                    onChange={(e) => setUnlockDate(e.target.value)}
                    disabled={isLoading}
                    className="rounded-3"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="reminderEmail">
                  <Form.Label className="fw-semibold text-primary">
                    Reminder Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter recipient email "
                    value={reminderEmail}
                    onChange={(e) => setReminderEmail(e.target.value)}
                    disabled={isLoading}
                    className="rounded-3"
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="success"
                    type="submit"
                    disabled={isLoading}
                    className="rounded-3 py-2"
                  >
                    {isLoading ? "Sealing Capsule..." : "Seal Capsule"}
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

export default CreateCapsulePage;
