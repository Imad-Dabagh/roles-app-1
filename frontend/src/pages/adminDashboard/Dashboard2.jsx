import React, { useEffect, useState } from "react";
import { Table, Button, Form, Collapse } from "react-bootstrap";
import "./Dashboard.css";
import useSWR, { mutate } from "swr";
import axios from "axios";



const fetcher = (url) => {
  const accessToken = localStorage.getItem("accessToken");
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data);
};

const Dashboard = () => {
  const { data, error, isLoading } = useSWR(
    "http://localhost:5000/api/user/all",
    fetcher
  );

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [editingId, setEditingId] = useState(null);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.post(`http://localhost:5000/api/user/create`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      mutate("http://localhost:5000/api/user/all");
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "customer",
      });
      setShowForm(false);
      alert("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:5000/api/user/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      mutate("http://localhost:5000/api/user/all");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (!editingId) return;

    try {
      const accessToken = localStorage.getItem("accessToken");
      axios
        .put(`http://localhost:5000/api/user/update/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(() => {
          mutate("http://localhost:5000/api/user/all");
          setFormData({
            name: "",
            email: "",
            password: "",
            role: "customer",
          });
          setIsEditing(false);
          setEditingId(null);
          alert("User updated successfully!");
        });
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    }
  };


  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="centered-form">
      <h1>Admin Dashboard</h1>

      <Button
        variant={showForm || isEditing ? "secondary" : "success"}
        className="mb-3"
        // onClick={ isEditing ? () => { setFormData({ name: "", email: "", password: "", role: "customer" }) && setIsEditing(!isEditing)} : () => {setShowForm(!showForm)}  }
        onClick={() => {
          if (isEditing) {
            setIsEditing(false);
            setFormData({
              name: "",
              email: "",
              password: "",
              role: "customer",
            });
            setEditingId(null);
          } else {
            setShowForm((prevState) => !prevState);
          }
        }}
      >
        {showForm || isEditing ? "Cancel" : "Create User"}
      </Button>

      <Collapse in={showForm || isEditing}>
        <div>
          <Form
            onSubmit={isEditing ? handleEdit : handleCreateUser}
            className="mb-4"
          >
            <Form.Group className="mb-2">
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required={!isEditing}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              {isEditing ? "Update User" : "Create User"}
            </Button>
          </Form>
        </div>
      </Collapse>

      <Table bordered hover responsive className="mt-3">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.users.length > 0 ? (
            data.users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setFormData({
                        name: user.name,
                        email: user.email,
                        password: "",
                        role: user.role,
                      });
                      setEditingId(user._id);
                      setIsEditing(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Dashboard;
