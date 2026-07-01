import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt, style, provider = "openai" } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    let images: string[] = [];

    if (provider === "openai") {
      if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json(
          { error: "Missing OPENAI_API_KEY" },
          { status: 500 }
        );
      }

      const response = await openai.images.generate({
        model: "gpt-image-1",
        prompt: `${prompt}, ${style}, kawaii cartoon cat sticker, pastel colors, bold outline, transparent background, extras like sparkles and hearts`,
        size: "512x512",
        n: 20,
      });

      images = response.data.map((img: any) => img.url);
    }

    if (provider === "gemini") {
      if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json(
          { error: "Missing GEMINI_API_KEY" },
          { status: 500 }
        );
      }

      // Gemini REST API call (example)
      const geminiResponse = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
          process.env.GEMINI_API_KEY,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `${prompt}, ${style}, kawaii cartoon cat sticker, pastel colors, bold outline, transparent background, extras like sparkles and hearts`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await geminiResponse.json();
      // Gemini returns base64 images → convert to data URLs
      images = data.candidates?.map(
        (c: any) => `data:image/png;base64,${c.content.parts[0].inline_data.data}`
      ) || [];
    }

    return NextResponse.json({ images });
  } catch (error: any) {
    console.error("Image generation error:", error);
    return NextResponse.json({ error: "Failed to generate images" }, { status: 500 });
  }
}
