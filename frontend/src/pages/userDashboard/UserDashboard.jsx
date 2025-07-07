import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import "./Dashboard.css";
import useSWR from "swr";
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

const UserDashboard = () => {
  const { data, error, isLoading } = useSWR(
    "http://localhost:5000/api/user/all",
    fetcher
  );
  // console.log(data);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="centered-form">
      <h1>User Dashboard</h1>
      <Table bordered hover responsive className="mt-3">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data.users.length > 0 ? (
            data.users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
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

export default UserDashboard;
