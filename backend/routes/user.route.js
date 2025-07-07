const express = require("express");
// const cors = require("cors"); Haaaada
// router.use(cors()); 
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller.js");

const authenticate = require("../middleware/auth.js");
const checkRole = require("../middleware/roles.js");

const router = express.Router();


router.get("/all", authenticate, getUsers);
router.post("/create", authenticate, checkRole('admin'), createUser);
router.put("/update/:id", authenticate, checkRole('admin'), updateUser);
router.delete("/delete/:id", authenticate, checkRole('admin'), deleteUser);
module.exports = router;
