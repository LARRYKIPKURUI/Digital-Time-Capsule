import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faRocket,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import aboutBg from "../assets/about_background.jpeg";
import memory from "../assets/Designer.png";
import { motion } from "framer-motion";

function About() {
  return (
    <div className="position-relative z-1 text-white overflow-hidden">
      {/* Hero Section */}
      <section
        className="text-center d-flex align-items-center justify-content-center hero-section"
        style={{
          minHeight: "70vh",
          backgroundImage: `url(${aboutBg})`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ zIndex: 2 }} 
          className="text-white p-4 p-md-5 rounded-4 glass-panel mx-3 mt-5 shadow-lg"
        >
          <h1 className="display-4 fw-bold text-gradient brand-font">About Digital Time Capsule</h1>
          <p className="lead mb-4 mt-3 text-white-50">
            Empowering individuals to connect with their past, present, and
            future selves through memory, legacy, and time.
          </p>
          <Button as={Link} to="/new" className="btn-premium px-4 py-2 mt-2">
            Start Your Time Capsule
          </Button>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <Container className="py-5 my-5">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gradient mb-5 display-5 fw-bold brand-font"
        >
          Our Story
        </motion.h2>
        <Row className="align-items-center">
          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="lead text-white-50">
                In a fast-paced world, memories are fleeting. Digital Time Capsule
                was created to offer a secure, thoughtful way to preserve and
                share moments that matter now or in the future.
              </p>
              <p className="lead text-white-50">
                Whether it’s a message for your future self or a gift for a loved
                one, DTC is your vault of personal legacy.
              </p>
            </motion.div>
          </Col>
          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={memory}
                alt="Our Story"
                className="img-fluid rounded-4 shadow-lg glass-panel p-2 mt-4 mt-lg-0 w-100"
              />
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Core Principles Section */}
      <div className="py-5 my-5">
        <Container>
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gradient mb-5 display-5 fw-bold brand-font"
          >
            Our Core Principles
          </motion.h2>
          <Row className="text-center g-4">
            <Col md={4}>
              <motion.div 
                whileHover={{ y: -10 }}
                className="glass-card p-4 h-100"
              >
                <div className="mb-4">
                  <div className="icon-circle mx-auto" style={{ background: 'var(--primary-gradient)', boxShadow: 'var(--glass-glow)' }}>
                    <FontAwesomeIcon icon={faRocket} size="lg" />
                  </div>
                </div>
                <h5 className="fw-bold brand-font text-gradient mb-3">Our Mission</h5>
                <p className="text-white-50 mb-0">
                  To provide a secure, intuitive platform for sending digital
                  messages and memories to the future.
                </p>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div 
                whileHover={{ y: -10 }}
                className="glass-card p-4 h-100"
              >
                <div className="mb-4">
                  <div className="icon-circle mx-auto" style={{ background: 'var(--primary-gradient)', boxShadow: 'var(--glass-glow)' }}>
                    <FontAwesomeIcon icon={faEye} size="lg" />
                  </div>
                </div>
                <h5 className="fw-bold brand-font text-gradient mb-3">Our Vision</h5>
                <p className="text-white-50 mb-0">
                  To be the global leader in digital legacy tools, connecting
                  people across time through memory.
                </p>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div 
                whileHover={{ y: -10 }}
                className="glass-card p-4 h-100"
              >
                <div className="mb-4">
                  <div className="icon-circle mx-auto" style={{ background: 'var(--primary-gradient)', boxShadow: 'var(--glass-glow)' }}>
                    <FontAwesomeIcon icon={faHandshake} size="lg" />
                  </div>
                </div>
                <h5 className="fw-bold brand-font text-gradient mb-3">Our Values</h5>
                <ul className="list-unstyled text-white-50 mb-0">
                  <li className="mb-2">Security & Privacy</li>
                  <li className="mb-2">Emotional Connection</li>
                  <li className="mb-2">Simplicity & Accessibility</li>
                  <li>Innovation</li>
                </ul>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Call to Action */}
      <Container className="text-center py-5 mb-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-4 p-md-5 rounded-4 shadow-lg"
        >
          <h2 className="text-gradient mb-4 display-5 brand-font fw-bold">
            Ready to Preserve Your Moments?
          </h2>
          <p className="lead mb-5 text-white-50">
            Join a community creating meaningful messages across time. Start your
            first capsule today.
          </p>
          <Button
            as={Link}
            to="/new"
            className="btn-premium px-4 px-md-5 py-3 fs-5"
          >
            Create Your Digital Time Capsule
          </Button>
        </motion.div>
      </Container>
    </div>
  );
}

export default About;
