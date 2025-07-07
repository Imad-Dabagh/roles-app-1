import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      // setSuccess(response.data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
      });

     
      
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      setError(error.response.data.message);
      console.error(error);
    }
  };

  useEffect(() => {
    // Clear error message after 3 seconds
    const timer = setTimeout(() => {
      setError(null);
    }, 3000);
    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [error]);

  // useEffect(() => {
  //   // Clear success message after 3 seconds
  //   const timer = setTimeout(() => {
  //     setSuccess(null);
  //   }, 3000);
  //   return () => clearTimeout(timer); // Cleanup the timer on component unmount
  // }, [success]);

  return (
    <div className="centered-form">
      <Form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <Form.Group controlId="formBasicUsername">
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="dark" type="submit" className="w-100">
          Register
        </Button>
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}

        {/* {success && (
          <div className="alert alert-success mt-3" role="alert">
            {success}
          </div>
        )} */}
      </Form>
    </div>
  );
};

export default Register;
