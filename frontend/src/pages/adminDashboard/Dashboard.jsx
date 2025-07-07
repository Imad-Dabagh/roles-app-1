import React, { useState } from "react";
import { Table, Button, Form, Collapse } from "react-bootstrap";
import "./Dashboard.css";
import useSWR, { mutate } from "swr";
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

const fetcher = (url) => api.get(url).then((res) => res.data);

const Dashboard = () => {
  const { user: authUser, isLoading: authLoading } = useAuth();

  console.log("Auth User:", authUser);

  // Fetch all users (only if authenticated)
  const { data, error, isLoading } = useSWR(
    authUser ? "/user/all" : null,
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
      await api.post("/user/create", formData);
      mutate("/user/all");
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
      await api.delete(`/user/delete/${id}`);
      mutate("/user/all");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editingId) return;

    try {
      await api.put(`/user/update/${editingId}`, formData);
      mutate("/user/all");
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "customer",
      });
      setIsEditing(false);
      setEditingId(null);
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  if (authLoading) return <div>Authenticating...</div>;
  if (error) {
    console.error("❌ Error loading users:", error);
    return <div>Failed to load users.</div>;
  }
  if (isLoading) return <div>Loading users...</div>;

  return (
    <div className="centered-form">
      <h1>Admin Dashboard</h1>

      <Button
        variant={showForm || isEditing ? "secondary" : "success"}
        className="mb-3"
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
            setShowForm((prev) => !prev);
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
          {data?.users?.length > 0 ? (
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
                      setShowForm(false);
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
              <td colSpan={4} className="text-center">
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
