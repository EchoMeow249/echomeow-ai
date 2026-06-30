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
       
