const axios = require("axios");

const API_KEY = process.env.GEMINI_API_KEY;

const GEMINI_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

async function callGemini(prompt) {
    try {
        const response = await axios.post(GEMINI_URL, {
            contents: [
                {
                    parts: [{ text: prompt }]
                }
            ]
        });

        return response.data.candidates[0].content.parts[0].text;
    } catch (err) {
        console.error("Gemini error:", err.response?.data || err.message);
        return "Error calling Gemini API";
    }
}

// 🧠 Reviewer Agent
async function reviewerAgent(code) {
    return await callGemini(
        `Review this code and list bugs:\n\n${code}`
    );
}

// 🛠 Fixer Agent
async function fixerAgent(code) {
    return await callGemini(
        `Fix this code and return corrected version:\n\n${code}`
    );
}

// 📖 Explainer Agent
async function explainerAgent(code) {
    return await callGemini(
        `Explain this code in simple terms:\n\n${code}`
    );
}

module.exports = {
    reviewerAgent,
    fixerAgent,
    explainerAgent
};