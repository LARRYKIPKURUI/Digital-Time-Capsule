import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../home.css";
import memoryImage from "../assets/memoryImage.jpeg";
import unlockingDay from "../assets/unlocked.jpeg";

function Home() {
  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <section className="hero-section text-white d-flex align-items-center justify-content-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hero-content p-5 rounded-3 glass-panel"
        >
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="display-3 brand-font mb-4 text-gradient fw-bold"
          >
            Preserve Your Future Self
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="lead mb-5 text-white fs-5"
            style={{ minHeight: '60px' }}
          >
            <Typewriter
              words={[
                "Create a digital time capsule with messages and memories, locked away until a date you choose. A unique way to connect with your future self or share a surprise with loved ones.",
              ]}
              typeSpeed={40}
              deleteSpeed={0}
              delaySpeed={1000}
              cursor
            />
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="d-grid gap-3 d-sm-flex justify-content-sm-center mt-4"
          >
            <Link to="/new" className="btn-premium text-decoration-none d-flex align-items-center justify-content-center">
              Create Your Capsule
            </Link>
            <Link to="/about" className="btn-premium-outline text-decoration-none d-flex align-items-center justify-content-center px-5 py-2">
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* What is a Digital Time Capsule? Section */}
      <Container className="my-5 py-5 text-center text-white position-relative z-1">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="display-5 brand-font mb-4 text-gradient fw-bold"
        >
          What is a Digital Time Capsule?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="fs-5 mx-auto text-white-50 p-4 glass-panel mb-5" 
          style={{ maxWidth: "800px" }}
        >
          It's more than just a message in a bottle; it's a secure digital vault
          for your thoughts, hopes, and memories. Whether it's a letter to your
          future self or a photo album for your children's graduation DTC ensures your sentiments are
          delivered exactly when they matter most.
        </motion.p>
        
        <Row className="mt-1 justify-content-center">
          {/* Text Messages */}
          <Col md={4} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="h-100"
            >
              <Card className="h-100 text-white p-3 glass-card">
                <Card.Body>
                  <Card.Title className="h4 brand-font text-gradient mb-3">
                    Text Messages
                  </Card.Title>
                  <Card.Text className="text-white-50">
                    Write heartfelt letters, reflective notes, or even just simple
                    reminders to be opened years from now.
                  </Card.Text>
                  <div className="bg-dark bg-opacity-50 text-start p-3 rounded mt-3 border border-secondary border-opacity-25 shadow-inner">
                    <p className="mb-0 fst-italic text-white-50 fs-6" style={{ fontSize: '0.9rem' }}>
                      "Dear future me, I hope this message reaches you at a time
                      when you're calm, grounded, and proud of how far you've
                      come. Right now, life feels like a whirlwind full of
                      questions, growth, and a quiet hope that everything will
                      make sense someday..."
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          {/* Image  Memories */}
          <Col md={4} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="h-100"
            >
              <Card className="h-100 text-white p-3 glass-card">
                <Card.Body>
                  <Card.Title className="h4 brand-font text-gradient mb-3">
                    Image Memories
                  </Card.Title>
                  <Card.Text className="text-white-50">
                    Upload cherished photos of all kinds and times preserving
                    moments exactly as they are today.
                  </Card.Text>
                  <div className="mt-3 rounded overflow-hidden border border-secondary border-opacity-25 shadow-lg">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      src={memoryImage}
                      alt="Sample memory"
                      className="img-fluid rounded"
                    />
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          {/* Future Delivery */}
          <Col md={4} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="h-100"
            >
              <Card className="h-100 text-white p-3 glass-card">
                <Card.Body>
                  <Card.Title className="h4 brand-font text-gradient mb-3">
                    Future Delivery
                  </Card.Title>
                  <Card.Text className="text-white-50">
                    Set a specific future date for your capsule to be unlocked and
                    delivered, creating a delightful surprise.
                  </Card.Text>
                  <div className="mt-3 text-center overflow-hidden border border-secondary border-opacity-25 rounded shadow-lg">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      src={unlockingDay}
                      alt="Calendar or delivery visual"
                      className="img-fluid rounded"
                    />
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* How It Works Section */}
      <section className="py-5 text-white position-relative">
        <Container className="py-5 glass-panel">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="display-5 brand-font mb-5 text-center text-gradient fw-bold"
          >
            How It Works
          </motion.h2>
          <Row className="justify-content-center">
            <Col md={4} className="text-center mb-4">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="icon-circle mb-4 mx-auto"
                style={{ background: 'var(--primary-gradient)', boxShadow: 'var(--glass-glow)' }}
              >
                1
              </motion.div>
              <h4 className="fw-bold text-white mb-3 brand-font">Create Your Capsule</h4>
              <p className="text-white-50 px-3">
                Craft your message, upload your media, and select your
                recipients. It's quick and easy to start.
              </p>
            </Col>
            <Col md={4} className="text-center mb-4">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="icon-circle mb-4 mx-auto"
                style={{ background: 'var(--primary-gradient)', boxShadow: 'var(--glass-glow)' }}
              >
                2
              </motion.div>
              <h4 className="fw-bold text-white mb-3 brand-font">Set the Unlock Date</h4>
              <p className="text-white-50 px-3">
                Choose any date in the future next month, next year, or even
                decades from now. Your capsule stays secure until then.
              </p>
            </Col>
            <Col md={4} className="text-center mb-4">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="icon-circle mb-4 mx-auto"
                style={{ background: 'var(--primary-gradient)', boxShadow: 'var(--glass-glow)' }}
              >
                3
              </motion.div>
              <h4 className="fw-bold text-white mb-3 brand-font">Anticipate the Reveal</h4>
              <p className="text-white-50 px-3">
                On the chosen date, your capsule will be unlocked and
                accessible, bringing a smile to faces.
              </p>
            </Col>
          </Row>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-5"
          >
            <Link to="/new" className="btn-premium d-inline-block text-decoration-none">
              Start Your Journey
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* Why Choose DTC Section */}
      <Container className="my-5 py-5 text-center text-white">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="display-5 brand-font mb-5 text-gradient fw-bold"
        >
          Why Choose Digital Time Capsule?
        </motion.h2>
        <Row className="justify-content-center mt-4">
          <Col md={6} lg={4} className="mb-4">
            <motion.div
              whileHover={{ y: -10 }}
              className="h-100"
            >
              <Card className="h-100 glass-card p-4">
                <Card.Body>
                  <Card.Title className="h5 brand-font text-gradient fw-bold mb-3">
                    Personal Reflection
                  </Card.Title>
                  <Card.Text className="text-white-50">
                    A unique opportunity for self-discovery and growth by
                    revisiting past thoughts and goals.
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          <Col md={6} lg={4} className="mb-4">
            <motion.div
              whileHover={{ y: -10 }}
              className="h-100"
            >
              <Card className="h-100 glass-card p-4">
                <Card.Body>
                  <Card.Title className="h5 brand-font text-gradient fw-bold mb-3">
                    Memorable Surprises
                  </Card.Title>
                  <Card.Text className="text-white-50">
                    Delight friends and family with unexpected messages and gifts
                    from the past.
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          <Col md={6} lg={4} className="mb-4">
            <motion.div
              whileHover={{ y: -10 }}
              className="h-100"
            >
              <Card className="h-100 glass-card p-4">
                <Card.Body>
                  <Card.Title className="h5 brand-font text-gradient fw-bold mb-3">
                    Digital Legacy
                  </Card.Title>
                  <Card.Text className="text-white-50">
                    Securely pass on stories, advice, and family history to future
                    generations.
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
      
    </div>
  );
}

export default Home;
