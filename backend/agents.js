const axios = require("axios");

const GEMINI_URL =
"https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";

const API_KEY = process.env.GEMINI_API_KEY;

// 🔍 Reviewer Agent
async function reviewerAgent(code) {
    const prompt = `
You are a Senior Code Reviewer.
Find bugs, bad practices, and issues.

Code:
${code}
`;

    return callGemini(prompt);
}

// 🛠 Fixer Agent
async function fixerAgent(code) {
    const prompt = `
You are a Senior Developer.
Fix and optimize this code.

Code:
${code}
`;

    return callGemini(prompt);
}

// 📖 Explainer Agent
async function explainerAgent(code) {
    const prompt = `
Explain this code in simple terms for beginners.

Code:
${code}
`;

    return callGemini(prompt);
}

// 🔥 Gemini Call
async function callGemini(prompt) {
    const response = await axios.post(
        `${GEMINI_URL}?key=${API_KEY}`,
        {
            contents: [{ parts: [{ text: prompt }] }]
        }
    );

    return response.data.candidates[0].content.parts[0].text;
}

module.exports = {
    reviewerAgent,
    fixerAgent,
    explainerAgent
};