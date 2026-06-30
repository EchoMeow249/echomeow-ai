"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Kawaii");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function generate() {
    if (!prompt) return;

    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, style }),
      });

      const data = await res.json();
      setImages(data.images);
    } catch (err) {
      console.error("Error generating:", err);
    }

    setLoading(false);
  }

  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "Arial",
        textAlign: "center",
        background: "#fafafa",
        minHeight: "100vh",
      }}
    >
      <h1>🎨 EchoMeow AI Sticker Generator</h1>

      <p>Create cute AI stickers for Canva, Etsy & digital products</p>

      {/* INPUT */}
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt (e.g. cute cat eating ramen)"
        style={{
          width: "80%",
          padding: "12px",
          marginTop: "20px",
          fontSize: "16px",
          border: "1px solid #ccc",
        }}
      />

      {/* STYLE */}
      <div style={{ marginTop: "15px" }}>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          style={{ width: "80%", padding: "12px" }}
        >
          <option>Kawaii</option>
          <option>Cartoon</option>
          <option>Chibi</option>
          <option>Watercolor</option>
          <option>Minimal</option>
        </select>
      </div>

      {/* BUTTON */}
      <button
        onClick={generate}
        disabled={loading}
        style={{
          marginTop: "20px",
          padding: "12px 25px",
          background: "black",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate Stickers"}
      </button>

      {/* OUTPUT */}
      <div
        style={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            width={180}
            height={180}
            style={{ borderRadius: 12 }}
          />
        ))}
      </div>
    </main>
  );
}
