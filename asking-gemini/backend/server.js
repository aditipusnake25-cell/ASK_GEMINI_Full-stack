require("dotenv").config();

const express = require("express");
const path = require("path");
const askRoutes = require("./routes/askRoutes");

const app = express();

app.use(express.json());

// Frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// API routes
app.use("/api", askRoutes);

// API 404
app.use("/api", (req, res) => {
  res.status(404).json({
    error: "API route not found",
  });
});

// For Vercel
module.exports = app;

// For local development
if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}