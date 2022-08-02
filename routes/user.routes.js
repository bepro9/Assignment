const router = require("express").Router();
const {
  registerUser,
  loginUser,
  getUser,
  getAllUsers,
} = require("../controllers/user.controller");
const verifyToken = require("../utils/auth.middleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/user", verifyToken,getUser);
router.get("/users", getAllUsers);

module.exports = router;
