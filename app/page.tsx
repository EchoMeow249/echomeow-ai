"use client";

import { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function Page() {
  // MODE
  const [mode, setMode] = useState("sticker");

  // CORE INPUTS
  const [subject, setSubject] = useState("");
  const [styleType, setStyleType] = useState("die-cut vinyl sticker");
  const [character, setCharacter] = useState("Cartoon");
  const [aesthetic, setAesthetic] = useState("cute");
  const [extras, setExtras] = useState("");

  // SAAS FEATURES
  const [ageGroup, setAgeGroup] = useState("all ages");
  const [bookSize, setBookSize] = useState("A4");
  const [packSize, setPackSize] = useState(20);
  const [includeCover, setIncludeCover] = useState(true);

  // IMAGE INPUT
  const [file, setFile] = useState<File | null>(null);

  // OUTPUT
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // FILE → BASE64
  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  }

  // GENERATE
  async function generate() {
    setLoading(true);

    let refImage = "";

    if (file) {
      refImage = await fileToBase64(file);
    }

    let finalPrompt = "";

    // 🎨 STICKER MODE
    if (mode === "sticker") {
      finalPrompt = `
You are a professional sticker designer.

Create ONE high-quality sticker.

Subject: ${subject}
Style: ${styleType}
Character: ${character}
Aesthetic: ${aesthetic}
Age Group: ${ageGroup}
Extras: ${extras}

Rules:
- clean outline
- centered composition
- sticker-ready design
- white/transparent background
- print-ready quality

Reference: ${refImage}
`;
    }

    // 📘 STICKER BOOK MODE
    if (mode === "book") {
      finalPrompt = `
You are a professional sticker book designer.

Create a COMPLETE sticker book layout.

Size: ${bookSize}
Include Cover: ${includeCover ? "Yes" : "No"}

Theme: ${subject}
Style: ${styleType}
Character: ${character}
Aesthetic: ${aesthetic}
Age Group: ${ageGroup}
Extras: ${extras}

Rules:
- cover page included if enabled
- clean grid layout
- printable A4 design
- organized sticker sheets
- high commercial quality

Reference: ${refImage}
`;
    }

    // 📦 STICKER PACK MODE
    if (mode === "pack") {
      finalPrompt = `
You are an Etsy sticker pack creator.

Generate ${packSize} UNIQUE stickers.

Theme: ${subject}
Style: ${styleType}
Character: ${character}
Aesthetic: ${aesthetic}
Age Group: ${ageGroup}

Rules:
- each sticker must be different
- consistent theme
- clean outline
- printable PNG style
- Etsy-ready quality

Reference: ${refImage}
`;
    }

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  // 📦 ZIP DOWNLOAD
  async function downloadZip() {
    const zip = new JSZip();

    for (let i = 0; i < images.length; i++) {
      const res = await fetch(images[i]);
      const blob = await res.blob();
      zip.file(`sticker-${i + 1}.png`, blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${subject || "stickers"}-pack.zip`);
  }

  // 🧾 ETSY HELPERS
  function etsyTitle() {
    return `${subject} Sticker Pack | Cute ${character} ${aesthetic} Stickers | Printable Digital Download`;
  }

  function etsyDescription() {
    return `
DIGITAL STICKER PACK

Theme: ${subject}
Style: ${styleType}
Pack Size: ${images.length}

INCLUDES:
- PNG stickers
- Transparent style
- Instant download ZIP

Perfect for journals, planners, laptops.

Digital product only.
`;
  }

  return (
    <main style={{ padding: 40, textAlign: "center", fontFamily: "Arial" }}>
      <h1>💰 EchoMeow AI SaaS Sticker Tool</h1>

      {/* MODE */}
      <select value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="sticker">🎨 Sticker</option>
        <option value="book">📘 Sticker Book</option>
        <option value="pack">📦 Sticker Pack (Etsy)</option>
      </select>

      <br /><br />

      {/* INPUTS */}
      <input
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <br /><br />

      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />

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
        <option>minimal</option>
        <option>cottagecore</option>
      </select>

      <br /><br />

      <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}>
        <option>kids</option>
        <option>teenagers</option>
        <option>adults</option>
        <option>all ages</option>
      </select>

      <br /><br />

      {mode === "pack" && (
        <>
          <select value={packSize} onChange={(e) => setPackSize(Number(e.target.value))}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <br /><br />
        </>
      )}

      {mode === "book" && (
        <>
          <select value={bookSize} onChange={(e) => setBookSize(e.target.value)}>
            <option>A4</option>
            <option>A5</option>
            <option>US Letter</option>
          </select>

          <br /><br />

          <label>
            <input
              type="checkbox"
              checked={includeCover}
              onChange={(e) => setIncludeCover(e.target.checked)}
            />
            Include Cover Page
          </label>

          <br /><br />
        </>
      )}

      <input
        placeholder="Extras"
        value={extras}
        onChange={(e) => setExtras(e.target.value)}
      />

      <br /><br />

      {/* BUTTON */}
      <button onClick={generate}>
        {loading ? "Generating..." : "Generate"}
      </button>

      {/* DOWNLOAD ZIP */}
      {images.length > 0 && (
        <button onClick={downloadZip} style={{ marginLeft: 10 }}>
          📦 Download ZIP
        </button>
      )}

      {/* OUTPUT */}
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

      {/* ETSY PREVIEW */}
      {images.length > 0 && (
        <div style={{ marginTop: 40, textAlign: "left" }}>
          <h3>🧾 Etsy Preview</h3>
          <p><b>Title:</b> {etsyTitle()}</p>
          <pre>{etsyDescription()}</pre>
        </div>
      )}
    </main>
  );
}
