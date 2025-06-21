import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CustomNavbar({ isLoggedIn, onLogout }) {
  return (
    
    <Navbar expand="lg" bg="dark" variant="dark" className="py-3 sticky-top shadow-sm">
      <Container fluid className="px-lg-5">
        {/* DTC title */}
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-primary">
          DTC
        </Navbar.Brand>

        {/* Navbar Toggle: for mobile  */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/*  Nav Links  */}
          <Nav className="mx-auto text-center flex-grow-1 justify-content-center">
           
            <Nav.Link as={Link} to="/" className="text-white px-3 fw-semibold">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="text-white px-3 fw-semibold">About</Nav.Link>

            
            <NavDropdown
              title="Capsule"
              id="capsule-dropdown"
              className="px-3 fw-semibold"
              menuVariant="dark" 
            >
              <NavDropdown.Item as={Link} to="/new" className="text-white-50">Create Capsule</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/capsules" className="text-white-50">List Capsules</NavDropdown.Item>
              <NavDropdown.Divider /> 
              <NavDropdown.Item href="#action/3.4" className="text-muted small">More Info</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Log In / Log Out */}
          <Nav className="ms-auto d-flex align-items-center gap-2">
            {isLoggedIn ? (
              
              <Button variant="outline-light" onClick={onLogout} className="rounded-pill px-4 py-2 fw-semibold">
                Log Out
              </Button>
            ) : (
              
              <Nav.Link as={Link} to="/login" className="btn btn-primary rounded-pill px-4 py-2 text-white fw-semibold">
                Log In
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;