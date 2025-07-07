const bcrypt = require("bcrypt");
const User = require("../model/user.model.js");

// Get all users
const getUsers = async (req, res) => {
  const users = await User.find().select("-password"); // Exclude password field from the result

  res.status(200).json({
    message: "Users retrieved successfully",
    users,
  });

  return users;
};

// =========== Create user ===========
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Role is optional, default to "customer"
    const userRole = role || "customer";

    if (userRole !== "admin" && userRole !== "customer") {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = new User({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });

    const savedUser = await createUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =========== Update user ===========
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  if (!name && !email && !role) {
    return res
      .status(400)
      .json({ message: "At least one field is required to update" });
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== id) {
        return res.status(400).json({ message: "Email already exict" });
      }
      user.email = email;
    }
    if (role) {
      if (role !== "admin" && role !== "customer") {
        return res.status(400).json({ message: "Invalid role" });
      }
      user.role = role;
    }
    const updatedUser = await user.save();

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =========== Delete user ===========
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createUser, getUsers, updateUser, deleteUser };
