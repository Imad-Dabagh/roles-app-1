import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { useAuth } from "../../../context/AuthContext"; // Import useAuth to access authentication context

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function
  const { login, user } = useAuth(); // Use the login function from AuthContext

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
      const loggedUser = await login(formData); // Call the login function from AuthContext with form data

      if (loggedUser?.role === "admin") {
        navigate("/adminDashboard");
      } else if (loggedUser?.role === "customer") {
        navigate("/userDashboard");
      }

      setFormData({
        email: "",
        password: "",
      }); // Reset form data after successful login
    } catch (error) {
      setError(error?.response?.data?.message || "Login failed");
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

  return (
    <div className="centered-form">
      <Form onSubmit={handleSubmit}>
        <h1>Login</h1>
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
          Login
        </Button>
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
      </Form>
    </div>
  );
};

export default Login;
