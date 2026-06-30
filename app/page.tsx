"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Kawaii");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function generate() {
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

      console.log("API RESULT:", data);

      if (data?.images && Array.isArray(data.images)) {
        setImages(data.images);
      } else {
        setImages([]);
      }
    } catch (err) {
      console.error("ERROR:", err);
      setImages([]);
    }

    setLoading(false);
  }

  return (
    <main style={{ padding: 40, textAlign: "center", fontFamily: "Arial" }}>
      <h1>🎨 EchoMeow AI Sticker Generator</h1>

      <p>Create cute AI stickers for Canva, Etsy & digital products</p>

      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt (e.g. cute cat)"
        style={{ width: "80%", padding: 12, marginTop: 20 }}
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
        onClick={generate}
        style={{
          marginTop: 20,
          padding: "12px 20px",
          background: "black",
          color: "white",
          cursor: "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate Stickers"}
      </button>

      <div style={{ marginTop: 40 }}>
        {images.length === 0 && !loading && (
          <p>No images yet</p>
        )}

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
