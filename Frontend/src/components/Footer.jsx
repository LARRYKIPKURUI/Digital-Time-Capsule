import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF,  faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'; // contact icons

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    
    <footer className="bg-dark text-white pt-5 pb-3 mt-5 shadow-lg">
      <Container>
        <Row className="mb-4">

          {/* Brand/About Section */}
          <Col lg={4} md={6} className="mb-4 mb-lg-0">
            <h5 className="text-uppercase fw-bold mb-3 text-primary">DTC</h5>
            <p className="text-white-50">
              Preserving your precious moments for the future. Digital Time Capsule allows you to create and store memories securely.
            </p>
          </Col>

          {/* Quick Links Section */}
          <Col lg={2} md={6} className="mb-4 mb-lg-0">
            <h5 className="text-uppercase fw-bold mb-3 text-primary">Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/" className="text-white-50 py-1">Home</Nav.Link>
              <Nav.Link as={Link} to="/about" className="text-white-50 py-1">About Us</Nav.Link>
              <Nav.Link as={Link} to="/pricing" className="text-white-50 py-1">Pricing</Nav.Link>
              <Nav.Link as={Link} to="/faq" className="text-white-50 py-1">FAQ</Nav.Link>
            </Nav>
          </Col>

          {/* Capsule Links Section */}
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase fw-bold mb-3 text-primary">Capsules</h5>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/new" className="text-white-50 py-1">Create New Capsule</Nav.Link>
              <Nav.Link as={Link} to="/capsules" className="text-white-50 py-1">View My Capsules</Nav.Link>
              <Nav.Link as={Link} to="/community-capsules" className="text-white-50 py-1">Community Capsules</Nav.Link>
            </Nav>
          </Col>

          {/* Contact Section */}
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase fw-bold mb-3 text-primary">Contact Us</h5>
            <ul className="list-unstyled text-white-50">
              <li className="mb-2">
                <FontAwesomeIcon icon={faEnvelope} className="me-2 text-primary" /> info@dtc.com
              </li>
              <li className="mb-2">
                <FontAwesomeIcon icon={faPhone} className="me-2 text-primary" /> +254 712 345 678 (Kenya)
              </li>
              <li className="mb-2">
                <FontAwesomeIcon icon={faPhone} className="me-2 text-primary" /> +1 234 567 8900 (USA)
              </li>
              <li className="mb-2">
                Nairobi, Kenya
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="my-4 border-secondary" /> 

        <Row className="align-items-center">
          {/* Social Media Links */}
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <h6 className="d-inline-block me-3 mb-0">Follow Us:</h6>
            <Button variant="outline-primary" href="https://facebook.com" target="_blank" className="btn-social me-2 rounded-circle">
              <FontAwesomeIcon icon={faFacebookF} />
            </Button>
            <Button variant="outline-primary" href="https://instagram.com" target="_blank" className="btn-social me-2 rounded-circle">
              <FontAwesomeIcon icon={faInstagram} />
            </Button>
            <Button variant="outline-primary" href="https://linkedin.com" target="_blank" className="btn-social rounded-circle">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </Button>
          </Col>

          {/* Copyright Section */}
          <Col md={6} className="text-center text-md-end">
            <p className="mb-0 text-white-50">
              &copy; {currentYear} Digital Time Capsule. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
