"use client";

import { useState } from "react";

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Cartoon");
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

      setImages(data.images || []);
    } catch (err) {
      console.error(err);
      setImages([]);
    }

    setLoading(false);
  }

  return (
    <main style={{ padding: 40, textAlign: "center" }}>
      <h1>EchoMeow AI Sticker Generator</h1>

      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt"
        style={{ padding: 10, width: 300 }}
      />

      <br /><br />

      <select value={style} onChange={(e) => setStyle(e.target.value)}>
        <option>Cartoon</option>
        <option>Kawaii</option>
        <option>Chibi</option>
      </select>

      <br /><br />

      <button onClick={generate}>
        {loading ? "Generating..." : "Generate"}
      </button>

      <div style={{ marginTop: 20 }}>
        {images.map((img, i) => (
          <div key={i}>
            <img src={img} width={180} />
            <br />
            <a href={img} download>
              Download
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
