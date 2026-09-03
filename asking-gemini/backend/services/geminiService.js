async function callGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API key is missing");
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 15000);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Answer the user's question and it should be clear, professional format. and use bullet point ${prompt}`,
              },
            ],
          },
        ],
      }),
      signal: controller.signal,
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("Gemini API error: ", data);
      throw new Error(data?.error?.message || "Gemini API request failed");
    }
    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!answer) {
      throw new Error("Gemini returned an empty response");
    }
    return answer;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Gemini request timed out .please try again");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
module.exports = {
  callGemini,
};
