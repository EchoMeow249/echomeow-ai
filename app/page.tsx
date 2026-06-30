const res = await fetch("/api/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-secret": "my-secret-123"
  },
  body: JSON.stringify({ prompt, style }),
});
