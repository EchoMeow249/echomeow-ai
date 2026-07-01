"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("");
  const [provider, setProvider] = useState("openai"); // default
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setImages([]);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, style, provider }),
    });

    const data = await res.json();
    setImages(data.images || []);
    setLoading(false);
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>EchoMeow AI Sticker Generator</h1>

      <input
        type="text"
        placeholder="Enter prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Enter style"
        value={style}
        onChange={(e) => setStyle(e.target.value)}
      />
      <br />

      {/* Provider toggle */}
      <div style={{ marginTop: 10 }}>
        <label>
          <input
            type="radio"
            value="openai"
            checked={provider === "openai"}
            onChange={(e) => setProvider(e.target.value)}
          />
          OpenAI (DALL·E)
        </label>
        <label style={{ marginLeft: 15 }}>
          <input
            type="radio"
            value="gemini"
            checked={provider === "gemini"}
            onChange={(e) => setProvider(e.target.value)}
          />
          Google
