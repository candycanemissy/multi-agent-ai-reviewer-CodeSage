const axios = require("axios");

const API_KEY = process.env.GEMINI_API_KEY;

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

async function callGemini(prompt) {
  try {
    const response = await axios.post(
      `${GEMINI_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    return response.data.candidates[0].content.parts[0].text;

  } catch (err) {
    console.log("❌ Gemini API Error:", err.response?.data || err.message);
    return "Error: AI service failed";
  }
}