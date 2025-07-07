import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Assuming you have a CSS file for custom styles
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useAuth } from "../../context/AuthContext";

const Navbarr = () => {
  const { user, logout, isLoading } = useAuth();

  
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  if (isLoading) return null;
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>{user ? `Hello, ${user.name} -- ${user.role}` : "Not Logged"}</Navbar.Brand>
          <Nav className="ml-auto">
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login" className="nav-link">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="nav-link">
                  Register
                </Nav.Link>
              </>
              
            ) : (
              <>
                <Nav.Link as={Link} to="/profile" className="nav-link">
                  Profile
                </Nav.Link>
                <Nav.Link className="nav-link" onClick={handleLogout}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Navbarr;
