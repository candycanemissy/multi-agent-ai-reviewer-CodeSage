const axios = require("axios");

const API_KEY = process.env.GEMINI_API_KEY;

// ✅ Correct Gemini endpoint
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

// 🔥 Core function to call Gemini
async function callGemini(prompt) {
  try {
    const response = await axios.post(
      `${GEMINI_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      }
    );

    return response.data.candidates[0].content.parts[0].text;

  } catch (err) {
    console.error(
      "❌ Gemini API Error:",
      err.response?.data || err.message
    );

    return "Error: AI service failed";
  }
}

// 🧠 Agent 1: Code Reviewer
async function reviewerAgent(code) {
  const prompt = `
You are a senior software engineer.
Review the following code and list bugs, issues, and improvements:

CODE:
${code}
`;

  return await callGemini(prompt);
}

// 🛠 Agent 2: Code Fixer
async function fixerAgent(code) {
  const prompt = `
You are a senior software engineer.
Fix the following code and return ONLY corrected code:

CODE:
${code}
`;

  return await callGemini(prompt);
}

// 📖 Agent 3: Explainer
async function explainerAgent(code) {
  const prompt = `
You are a programming teacher.
Explain this code in simple terms step by step:

CODE:
${code}
`;

  return await callGemini(prompt);
}

module.exports = {
  reviewerAgent,
  fixerAgent,
  explainerAgent
};