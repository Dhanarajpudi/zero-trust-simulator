const express = require("express");
const auth = require("../middleware/auth");
const policy = require("../middleware/policy");

const router = express.Router();

router.get("/user", auth, policy(), (req, res) => {
  res.json({ message: "User access granted" });
});

router.get("/admin", auth, policy("admin"), (req, res) => {
  res.json({ message: "Admin access granted" });
});

module.exports = router;
