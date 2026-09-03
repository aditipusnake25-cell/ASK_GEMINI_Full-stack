require("dotenv").config();

const express = require("express");
const path = require("path");
const askRoutes = require("./routes/askRoutes");

const app = express();

app.use(express.json());

// Frontend
const frontendPath = path.join(__dirname, "../frontend");

app.use(express.static(frontendPath));

// API routes
app.use("/api", askRoutes);

// Frontend fallback
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// API 404
app.use("/api", (req, res) => {
  res.status(404).json({
    error: "API route not found"
  });
});

module.exports = app;

// Local development
if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}