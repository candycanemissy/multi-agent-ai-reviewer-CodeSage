const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {
    reviewerAgent,
    fixerAgent,
    explainerAgent
} = require("./agents");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route (for browser test)
app.get("/", (req, res) => {
    res.send("Backend is working 🚀");
});

// Main AI route
app.post("/analyze", async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({
            error: "Code is required"
        });
    }

    try {
        // Run agents in parallel
        const [review, fix, explain] = await Promise.all([
            reviewerAgent(code),
            fixerAgent(code),
            explainerAgent(code)
        ]);

        res.json({
            review,
            fixed_code: fix,
            explanation: explain
        });

    } catch (err) {
        console.error("Error in /analyze:", err);
        res.status(500).json({
            error: err.message || "Internal Server Error"
        });
    }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});