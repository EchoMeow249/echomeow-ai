"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");

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
        <select style={{ width: "80%", padding: "12px" }}>
          <option>Kawaii</option>
          <option>Cartoon</option>
          <option>Chibi</option>
          <option>Watercolor</option>
          <option>Minimal</option>
        </select>
      </div>

      {/* BUTTON */}
      <button
        style={{
          marginTop: "20px",
          padding: "12px 25px",
          background: "black",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Generate Stickers
      </button>

      {/* OUTPUT AREA */}
      <div style={{ marginTop: "40px" }}>
        <p>🧸 Generated stickers will appear here</p>
      </div>
    </main>
  );
}
