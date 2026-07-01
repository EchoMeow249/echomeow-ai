import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY environment variable" },
        { status: 500 }
      );
    }

    const { prompt, style } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const response = await client.images.generate({
      model: "gpt-image-1",
      prompt: `${prompt}, ${style}, kawaii cartoon cat sticker, pastel colors, bold outline, transparent background, extras like sparkles and hearts`,
      size: "512x512",
      n: 20, // generate 20 stickers
    });

    const images = response.data.map((img: any) => img.url);
    return NextResponse.json({ images });
  } catch (error: any) {
    console.error("Image generation
