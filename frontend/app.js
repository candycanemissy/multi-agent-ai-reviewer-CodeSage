const chat = document.getElementById("chat");

function addMessage(text, className) {
    const div = document.createElement("div");
    div.className = className;
    div.innerText = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

async function analyze() {

    const code = document.getElementById("code").value;

    addMessage(code, "user");

    addMessage("AI is analyzing code...", "ai");

    try {

        const API_URL =
          "https://multi-agent-ai-reviewer-codesage.onrender.com/analyze";

        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code })
        });

        console.log("Status:", res.status);

        const data = await res.json();

        console.log("Response:", data);

        if (!res.ok) {
            throw new Error(JSON.stringify(data));
        }

        chat.lastChild.remove();

        addMessage("🔍 REVIEW:\n" + data.review, "ai");
        addMessage("🛠 FIXED CODE:\n" + data.fixed_code, "ai");
        addMessage("📖 EXPLANATION:\n" + data.explanation, "ai");

    } catch (err) {

        console.error("Frontend Error:", err);

        chat.lastChild.remove();

        addMessage("❌ Error: " + err.message, "ai");
    }
}