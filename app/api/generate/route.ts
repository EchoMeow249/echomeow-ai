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

      images = response.data.map((img: any
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
