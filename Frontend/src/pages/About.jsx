import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faRocket, faHandshake } from '@fortawesome/free-solid-svg-icons';

function About() {
  return (
    <div className="bg-light text-dark">

      {/* Hero Section */}
      <div
        className="text-center d-flex align-items-center justify-content-center"
        style={{
          height: '70vh',
          backgroundImage: `url("https://placehold.co/1920x1080/1a202c/ffffff?text=About+Us+Background")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 1,
          }}
        />
        <Container style={{ zIndex: 2 }} className="text-white">
          <h1 className="display-4 fw-bold">About Digital Time Capsule</h1>
          <p className="lead mb-4">
            Empowering individuals to connect with their past, present, and future selves through memory, legacy, and time.
          </p>
          <Button
            as={Link}
            to="/new"
            variant="primary"
            className="px-4 py-2"
          >
            Start Your Time Capsule
          </Button>
        </Container>
      </div>

      {/* Our Story Section */}
      <Container className="py-5">
        <h2 className="text-center text-primary mb-5 display-5">Our Story</h2>
        <Row className="align-items-center">
          <Col lg={6}>
            <p className="lead">
              In a fast-paced world, memories are fleeting. Digital Time Capsule was created to offer a secure,
              thoughtful way to preserve and share moments that matter—now or in the future.
            </p>
            <p className="lead">
              Whether it’s a message for your future self or a gift for a loved one, DTC is your vault of personal legacy.
            </p>
          </Col>
          <Col lg={6}>
            <img
              src="https://placehold.co/600x400/2d3748/ffffff?text=Our+Story"
              alt="Our Story"
              className="img-fluid rounded shadow"
            />
          </Col>
        </Row>
      </Container>

      {/* Core Principles Section */}
      <div className="bg-white py-5 border-top">
        <Container>
          <h2 className="text-center text-primary mb-5 display-5">Our Core Principles</h2>
          <Row className="text-center">
            <Col md={4} className="mb-4">
              <div className="mb-3">
                <FontAwesomeIcon icon={faRocket} size="3x" className="text-primary" />
              </div>
              <h5 className="fw-bold">Our Mission</h5>
              <p>
                To provide a secure, intuitive platform for sending digital messages and memories to the future.
              </p>
            </Col>
            <Col md={4} className="mb-4">
              <div className="mb-3">
                <FontAwesomeIcon icon={faEye} size="3x" className="text-primary" />
              </div>
              <h5 className="fw-bold">Our Vision</h5>
              <p>
                To be the global leader in digital legacy tools, connecting people across time through memory.
              </p>
            </Col>
            <Col md={4} className="mb-4">
              <div className="mb-3">
                <FontAwesomeIcon icon={faHandshake} size="3x" className="text-primary" />
              </div>
              <h5 className="fw-bold">Our Values</h5>
              <ul className="list-unstyled">
                <li>Security & Privacy</li>
                <li>Emotional Connection</li>
                <li>Simplicity & Accessibility</li>
                <li>Innovation</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Call to Action */}
      <Container className="text-center py-5">
        <h2 className="text-primary mb-4 display-5">Ready to Preserve Your Moments?</h2>
        <p className="lead mb-4">
          Join a community creating meaningful messages across time.
          Start your first capsule today.
        </p>
        <Button as={Link} to="/new" variant="primary" className="px-5 py-3 fw-bold">
          Create Your Digital Time Capsule
        </Button>
      </Container>
    </div>
  );
}

export default About;
