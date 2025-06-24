import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../home.css";
import memoryImage from "../assets/memoryImage.jpeg";
import unlockingDay from "../assets/unlocked.jpeg";

function Home() {
  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <section className="hero-section text-white d-flex align-items-center justify-content-center text-center">
        <div className="hero-content p-4 rounded-3 shadow-lg">
          <h1 className="display-4 fw-bold mb-3">Preserve Your Future Self</h1>

          <p className="lead mb-4">
            <Typewriter
              words={[
                "Create a digital time capsule with messages and memories, locked away until a date you choose. A unique way to connect with your future self or share a surprise with loved ones.",
              ]}
              typeSpeed={40}
              deleteSpeed={0}
              delaySpeed={1000}
              cursor
            />
          </p>

          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Button
              as={Link}
              to="/new"
              variant="primary"
              size="lg"
              className="rounded-pill px-4 py-2 fw-bold"
            >
              Create Your Capsule
            </Button>
            <Button
              as={Link}
              to="/about"
              variant="outline-light"
              size="lg"
              className="rounded-pill px-4 py-2 fw-bold"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* What is a Digital Time Capsule? Section */}
      <Container className="my-5 py-5 text-center text-white">
        <h2 className="display-5 fw-bold mb-4 text-primary">
          What is a Digital Time Capsule?
        </h2>
        <p className="fs-5 mx-auto text-dark " style={{ maxWidth: "800px" }}>
          It's more than just a message in a bottle; it's a secure digital vault
          for your thoughts, hopes, and memories. Whether it's a letter to your
          future self or a photo album for your children's graduation DTC ensures your sentiments are
          delivered exactly when they matter most.
        </p>
        <Row className="mt-1 justify-content-center p">
          {/* Text Messages */}
          <Col md={4} className="mb-4 ">
            <Card
              bg="dark"
              text="white"
              className="h-100 shadow-sm border-primary p-3"
            >
              <Card.Body>
                <Card.Title className="h4 fw-bold text-primary">
                  Text Messages
                </Card.Title>
                <Card.Text className="text-white-50">
                  Write heartfelt letters, reflective notes, or even just simple
                  reminders to be opened years from now.
                </Card.Text>
                {/* Sample Capsule Preview */}
                <div className="bg-secondary bg-opacity-10 text-start p-3 rounded mt-3">
                  <p className="mb-0 fst-italic text-white-50">
                    "Dear future me, I hope this message reaches you at a time
                    when you're calm, grounded, and proud of how far you've
                    come. Right now, life feels like a whirlwind full of
                    questions, growth, and a quiet hope that everything will
                    make sense someday. I'm learning to be patient with myself,
                    to take risks even when I’m scared, and to believe that the
                    small steps I take today are leading us toward something
                    meaningful. I wonder what dreams you’ve pursued, what habits
                    you’ve kept, and what parts of life you’ve had to let go of
                    to become who you are now. "
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Image  Memories */}
          <Col md={4} className="mb-4">
            <Card
              bg="dark"
              text="white"
              className="h-100 shadow-sm border-primary p-3"
            >
              <Card.Body>
                <Card.Title className="h4 fw-bold text-primary">
                  Image Memories
                </Card.Title>
                <Card.Text className="text-white-50">
                  Upload cherished photos of all kinds and times preserving
                  moments exactly as they are today.
                </Card.Text>
                {/* Sample Image Thumbnail */}
                <div className="mt-3 rounded overflow-hidden">
                  <img
                    src={memoryImage}
                    alt="Sample memory"
                    className="img-fluid rounded"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Future Delivery */}
          <Col md={4} className="mb-4">
            <Card
              bg="dark"
              text="white"
              className="h-100 shadow-sm border-primary p-3"
            >
              <Card.Body>
                <Card.Title className="h4 fw-bold text-primary">
                  Future Delivery
                </Card.Title>
                <Card.Text className="text-white-50">
                  Set a specific future date for your capsule to be unlocked and
                  delivered, creating a delightful surprise.
                </Card.Text>
                {/* Delivery visual */}
                <div className="mt-3 text-center overflow-hidden">
                  <img
                    src={unlockingDay}
                    alt="Calendar or delivery visual"
                    className="img-fluid rounded"
                    // style={{ maxHeight: "120px" }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* How It Works Section */}
      <section className="bg-secondary-dark py-5 text-white">
        <Container className="py-4">
          <h2 className="display-5 fw-bold mb-5 text-center text-primary">
            How It Works
          </h2>
          <Row className="justify-content-center">
            <Col md={4} className="text-center mb-4">
              <div className="icon-circle mb-3 bg-primary text-white mx-auto">
                1
              </div>
              <h4 className="fw-bold text-white mb-2">Create Your Capsule</h4>
              <p className="text-white-50">
                Craft your message, upload your media, and select your
                recipients. It's quick and easy to start.
              </p>
            </Col>
            <Col md={4} className="text-center mb-4">
              <div className="icon-circle mb-3 bg-primary text-white mx-auto">
                2
              </div>
              <h4 className="fw-bold text-white mb-2">Set the Unlock Date</h4>
              <p className="text-white-50">
                Choose any date in the future next month, next year, or even
                decades from now. Your capsule stays secure until then.
              </p>
            </Col>
            <Col md={4} className="text-center mb-4">
              <div className="icon-circle mb-3 bg-primary text-white mx-auto">
                3
              </div>
              <h4 className="fw-bold text-white mb-2">Anticipate the Reveal</h4>
              <p className="text-white-50">
                On the chosen date, your capsule will be unlocked and
                accessible, bringing a smile to faces.
              </p>
            </Col>
          </Row>
          <div className="text-center mt-5">
            <Button
              as={Link}
              to="/new"
              variant="outline-primary"
              size="lg"
              className="rounded-pill px-5 py-3 fw-bold"
            >
              Start Your Journey
            </Button>
          </div>
        </Container>
      </section>

      {/* Why Choose DTC Section */}
      <Container className="my-5 py-5 text-center text-white">
        <h2 className="display-5 fw-bold mb-5 text-primary">
          Why Choose Digital Time Capsule?
        </h2>
        <Row className="justify-content-center mt-4">
          <Col md={6} lg={4} className="mb-4 ">
            <Card
              bg="dark"
              text="white"
              className="h-100 shadow-sm border-primary p-4"
            >
              <Card.Body>
                <Card.Title className="h5 fw-bold text-primary">
                  Personal Reflection
                </Card.Title>
                <Card.Text className="text-white-50">
                  A unique opportunity for self-discovery and growth by
                  revisiting past thoughts and goals.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4} className="mb-4">
            <Card
              bg="dark"
              text="white"
              className="h-100 shadow-sm border-primary p-4"
            >
              <Card.Body>
                <Card.Title className="h5 fw-bold text-primary">
                  Memorable Surprises
                </Card.Title>
                <Card.Text className="text-white-50">
                  Delight friends and family with unexpected messages and gifts
                  from the past.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4} className="mb-4">
            <Card
              bg="dark"
              text="white"
              className="h-100 shadow-sm border-primary p-4"
            >
              <Card.Body>
                <Card.Title className="h5 fw-bold text-primary">
                  Digital Legacy
                </Card.Title>
                <Card.Text className="text-white-50">
                  Securely pass on stories, advice, and family history to future
                  generations.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
    </div>
  );
}

export default Home;
