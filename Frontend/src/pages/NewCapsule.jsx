import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
const API_URL = import.meta.env.VITE_APP_API_URL;

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

      const response = await fetch(`${API_URL}/capsules`, {
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
    <Container className="my-5 position-relative z-1" style={{ minHeight: "80vh" }}>
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-4">
              <h2 className="fw-bold text-gradient brand-font display-5">Create a New Time Capsule</h2>
              <p className="text-white-50 mt-2">
                Write a message to your future self. It will be sealed until the
                date and time you choose.
              </p>
            </div>

            <Card className="glass-panel border-0 text-white">
              <Card.Body className="p-4 p-md-5">
                <Form onSubmit={handleCreate}>
                  <Form.Group className="mb-4" controlId="capsuleTitle">
                    <Form.Label className="fw-semibold text-white-50">
                      Capsule Title
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g., Goals for Next Year"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      disabled={isLoading}
                      className="bg-dark bg-opacity-50 text-white border-secondary border-opacity-25 py-2"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="capsuleMessage">
                    <Form.Label className="fw-semibold text-white-50">
                      Your Message
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Dear Future Me..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={isLoading}
                      className="bg-dark bg-opacity-50 text-white border-secondary border-opacity-25 py-2"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="capsuleMedia">
                    <Form.Label className="fw-semibold text-white-50">
                      Upload Capsule Media
                    </Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      disabled={isLoading}
                      onChange={(e) => setMediaFile(e.target.files[0])}
                      className="bg-dark bg-opacity-50 text-white border-secondary border-opacity-25"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="unlockDate">
                    <Form.Label className="fw-semibold text-white-50">
                      Unlock Date & Time
                    </Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={unlockDate}
                      onChange={(e) => setUnlockDate(e.target.value)}
                      disabled={isLoading}
                      className="bg-dark bg-opacity-50 text-white border-secondary border-opacity-25 py-2"
                      style={{ colorScheme: 'dark' }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-5" controlId="reminderEmail">
                    <Form.Label className="fw-semibold text-white-50">
                      Reminder Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter recipient email "
                      value={reminderEmail}
                      onChange={(e) => setReminderEmail(e.target.value)}
                      disabled={isLoading}
                      className="bg-dark bg-opacity-50 text-white border-secondary border-opacity-25 py-2"
                    />
                  </Form.Group>

                  <div className="d-grid mt-2">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="btn-premium"
                    >
                      {isLoading ? "Sealing Capsule..." : "Seal Capsule"}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateCapsulePage;
