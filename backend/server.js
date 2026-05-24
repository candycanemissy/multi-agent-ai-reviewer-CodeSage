const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {
    reviewerAgent,
    fixerAgent,
    explainerAgent
} = require("./agents");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {
    const { code } = req.body;

    try {
        // 🔥 Run agents in parallel
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
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));