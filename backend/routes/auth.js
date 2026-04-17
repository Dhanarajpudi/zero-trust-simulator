const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = require("../data");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ msg: "Invalid user" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ msg: "Wrong password" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    "secretkey",
    { expiresIn: "1h" }
  );

  res.json({ token });
});

module.exports = router;
