"use client";

import { useState } from "react";

export default function Page() {
  const [subject, setSubject] = useState("");
  const [styleType, setStyleType] = useState("die-cut vinyl sticker");
  const [character, setCharacter] = useState("Cartoon");
  const [aesthetic, setAesthetic] = useState("cute");
  const [extras, setExtras] = useState("with sparkles");

  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);

    const finalPrompt = `
${subject},
${styleType},
${character},
${aesthetic} aesthetic,
${extras}
`;

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: finalPrompt,
          style: "sticker",
        }),
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
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <br /><br />

      <select value={styleType} onChange={(e) => setStyleType(e.target.value)}>
        <option>die-cut vinyl sticker</option>
        <option>watercolor sticker</option>
        <option>holographic sticker</option>
      </select>

      <br /><br />

      <select value={character} onChange={(e) => setCharacter(e.target.value)}>
        <option>Cartoon</option>
        <option>Anime</option>
        <option>Chibi</option>
      </select>

      <br /><br />

      <select value={aesthetic} onChange={(e) => setAesthetic(e.target.value)}>
        <option>cute</option>
        <option>kawaii</option>
        <option>cottagecore</option>
        <option>minimal</option>
      </select>

      <br /><br />

      <input
        placeholder="Extras"
        value={extras}
        onChange={(e) => setExtras(e.target.value)}
      />

      <br /><br />

      <button onClick={generate}>
        {loading ? "Generating..." : "Generate Stickers"}
      </button>

      <div style={{ marginTop: 20 }}>
        {images.map((img, i) => (
          <div key={i}>
            <img src={img} width={180} />
            <br />
            <a href={img} download target="_blank">
              Download
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
