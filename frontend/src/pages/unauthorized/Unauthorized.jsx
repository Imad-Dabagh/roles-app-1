import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Unauthorized.css"; // Optional for extra styles

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center unauthorized-page d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="display-4 text-danger">403 - Unauthorized</h1>
      <p className="lead">You do not have permission to access this page.</p>
      <Button variant="dark" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </Container>
  );
};

export default Unauthorized;
