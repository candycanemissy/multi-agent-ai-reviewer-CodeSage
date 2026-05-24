async function run() {
    const code = document.getElementById("code").value;

    const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
    });

    const data = await res.json();

    document.getElementById("review").innerText = data.review;
    document.getElementById("fix").innerText = data.fixed_code;
    document.getElementById("explain").innerText = data.explanation;
}