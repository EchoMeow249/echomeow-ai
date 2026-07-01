"use client";

import { useState } from "react";

export default function Page() {
  const [mode, setMode] = useState("sticker");
  const [subject, setSubject] = useState("");
  const [style, setStyle] = useState("Cartoon");
  const [character, setCharacter] = useState("Cartoon");
  const [aesthetic, setAesthetic] = useState("cute");
  const [extras, setExtras] = useState("");
  const [ageGroup, setAgeGroup] = useState("all ages");
  const [packSize, setPackSize] = useState(20);

  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  }

  async function generate() {
    setLoading(true);

    let referenceImage = "";
    if (file) {
      referenceImage = await fileToBase64(file);
    }

    let prompt = "";

    if (mode === "sticker") {
      prompt = `
Create ONE high quality sticker.

Subject: ${subject}
Style: ${style}
Character: ${character}
Aesthetic: ${aesthetic}
Age group: ${ageGroup}
Extras: ${extras}

Rules:
- centered composition
- clean outline
- sticker style
- transparent background look
- print-ready quality

Reference image: ${referenceImage}
`;
    }

    if (mode === "pack") {
      prompt = `
Create a STICKER PACK of ${packSize} stickers.

Theme: ${subject}
Style: ${style}
Character: ${character}
Aesthetic: ${aesthetic}
Age group: ${ageGroup}

Rules:
- each sticker must be unique
- same visual theme
- clean printable design
- Etsy-ready quality

Reference image: ${referenceImage}
`;
    }

    if (mode === "book") {
      prompt = `
Create a FULL STICKER BOOK layout.

Theme: ${subject}
Style: ${style}
Character: ${character}
Aesthetic: ${aesthetic}
Age group: ${ageGroup}

Rules:
- cover page included
- structured pages
- clean sticker grid layout
- printable A4 quality
- professional children’s book design

Reference image: ${referenceImage}
`;
    }

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    <main style={{ padding: 30, fontFamily: "Arial", textAlign: "center" }}>
      <h1>🎨 EchoMeow AI SaaS Tool</h1>

      {/* MODE */}
      <select value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="sticker">Sticker</option>
        <option value="pack">Sticker Pack</option>
        <option value="book">Sticker Book</option>
      </select>

      <br /><br />

      {/* SUBJECT */}
      <input
        placeholder="Subject (e.g. cute cat)"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <br /><br />

      {/* IMAGE UPLOAD */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <br /><br />

      {/* STYLE */}
      <select value={style} onChange={(e) => setStyle(e.target.value)}>
        <option>Cartoon</option>
        <option>Kawaii</option>
        <option>Chibi</option>
        <option>Minimal</option>
      </select>

      <br /><br />

      {/* CHARACTER */}
      <select value={character} onChange={(e) => setCharacter(e.target.value)}>
        <option>Cartoon</option>
        <option>Anime</option>
        <option>Chibi</option>
      </select>

      <br /><br />

      {/* AESTHETIC */}
      <select value={aesthetic} onChange={(e) => setAesthetic(e.target.value)}>
        <option>cute</option>
        <option>kawaii</option>
        <option>cottagecore</option>
        <option>minimal</option>
      </select>

      <br /><br />

      {/* AGE GROUP */}
      <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}>
        <option>kids</option>
        <option>teenagers</option>
        <option>adults</option>
        <option>all ages</option>
      </select>

      <br /><br />

      {/* PACK SIZE */}
      {mode === "pack" && (
        <>
          <select
            value={packSize}
            onChange={(e) => setPackSize(Number(e.target.value))}
          >
            <option value={10}>10 stickers</option>
            <option value={20}>20 stickers</option>
            <option value={50}>50 stickers</option>
          </select>
          <br /><br />
        </>
      )}

      {/* EXTRAS */}
      <input
        placeholder="Extras (sparkles, hearts, etc)"
        value={extras}
        onChange={(e) => setExtras(e.target.value)}
      />

      <br /><br />

      {/* BUTTON */}
      <button onClick={generate}>
        {loading ? "Generating..." : "Generate"}
      </button>

      {/* OUTPUT */}
      <div style={{ marginTop: 20 }}>
        {images.map((img, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <img src={img} width={180} />
            <br />
            <a href={img} target="_blank" rel="noopener noreferrer">
              Download
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
