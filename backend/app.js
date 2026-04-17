const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// ✅ HEALTH CHECK
app.get("/health", (req, res) => {
  res.send("Server is working");
});

// ✅ ROUTES
app.use("/auth", require("./routes/auth"));
app.use("/api", require("./routes/resource"));

// ✅ SAFE PORT
const PORT = 3001;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
