const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.GEMINI_API_KEY;

async function listModels() {
  try {
    const res = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
    );

    console.log(JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.log("ERROR:");
    console.log(err.response?.data || err.message);
  }
}

listModels();