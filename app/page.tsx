"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Kawaii");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function generate() {
    console.log("BUTTON CLICKED"); // DEBUG

    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, style }),
      });

      const data = await res.json();
      console.log("API RESPONSE:", data);

      setImages(data.images);
    } catch (err) {
      console.error("ERROR:", err);
    }

    setLoading(false);
  }

  return (
    <main style={{ padding: 40, textAlign: "center" }}>
      <h1>🎨 EchoMeow AI Sticker Generator</h1>

      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt"
        style={{ width: "80%", padding: 12 }}
      />

      <br />

      <select
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        style={{ width: "80%", padding: 12, marginTop: 10 }}
      >
        <option>Kawaii</option>
        <option>Cartoon</option>
        <option>Chibi</option>
        <option>Watercolor</option>
      </select>

      <br />

      <button
        onClick={() => generate()}
        style={{
          marginTop: 20,
          padding: "12px 25px",
          background: "black",
          color: "white",
        }}
      >
        {loading ? "Generating..." : "Generate Stickers"}
      </button>

      <div style={{ marginTop: 40 }}>
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            width={180}
            style={{ margin: 10, borderRadius: 10 }}
          />
        ))}
      </div>
    </main>
  );
}
