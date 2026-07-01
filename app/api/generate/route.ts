import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // Check if API key is set
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY environment variable" },
        { status: 500 }
      );
    }

    const { prompt, style } = await req.json();

    // Validate inputs
    if (!prompt || !style) {
      return NextResponse.json(
        { error: "Prompt and style are required" },
        { status: 400 }
      );
    }

    // Call OpenAI Images API
    const response = await client.images.generate({
      model: "gpt-image-1",
      prompt: `${prompt}, ${style}, kawaii cartoon cat sticker, pastel colors, bold outline, transparent background, extras like sparkles and hearts`,
      size: "512x512",
      n: 20, // generate 20 stickers
    });

    const urls = response.data.map((img: any) => img.url);
    return NextResponse.json({ urls });
  } catch (error: any) {
    console.error("Image generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate images" },
      { status: 500 }
    );
  }
}
