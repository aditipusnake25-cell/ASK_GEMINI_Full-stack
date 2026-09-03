const express = require("express");
const { callGemini } = require("../services/geminiService");
const router = express.Router();
router.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || question.trim()) {
      return res.status(400).json({
        error: "Question is required",
      });
    }
    if (question.length > 500) {
      return res.status(400).json({
        error: "Question must be 500 characters or less than it!",
      });
    }

    const answer = await callGemini(question);

    res.json({
      answer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to get response from Gemini",
    });
  }
});

module.exports = router;
