import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/time-capsule.png";

function CustomNavbar({ isLoggedIn, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path ? "text-primary fw-bold" : "text-white px-3 fw-semibold";

  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      className="py-3 sticky-top shadow-sm"
    >
      <Container fluid className="px-lg-5">
        {/* DTC title and Logo */}
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            width="32"
            height="32"
            className="d-inline-block align-top me-2"
            alt="DTC Logo"
          />
          <span className="fw-bold fs-4 text-primary mx-2">DTC</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Nav Links */}
          <Nav className="mx-auto text-center flex-grow-1 justify-content-center">
            <Nav.Link as={Link} to="/" className={isActive("/")}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className={isActive("/about")}>
              About
            </Nav.Link>

            <NavDropdown
              title="Capsule"
              id="capsule-dropdown"
              className="px-3 fw-semibold"
              menuVariant="dark"
            >
              <NavDropdown.Item 
              as={Link}
              to="/new" 
               className={isActive("/new")}
              >
                Create Capsule
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/capsule"
                className={isActive("/capsule")}
              >
                List Capsules
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Log In / Log Out */}
          <Nav className="ms-auto d-flex align-items-center gap-2">
            {isLoggedIn ? (
              <Button
                variant="outline-light"
                onClick={onLogout}
                className="rounded-pill px-4 py-2 fw-semibold"
              >
                Log Out
              </Button>
            ) : (
              <Nav.Link as={Link} to="/login" className={isActive("/login")}>
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
