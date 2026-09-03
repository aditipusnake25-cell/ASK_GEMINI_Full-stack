require("dotenv").config();
const askRoutes = require("./routes/askRoutes");
const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));
const PORT = process.env.PORT || 5000;
app.use("/api", askRoutes);
app.use("/api", (req, res) => {
  res.status(404).json({
    error: "API route not found",
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
