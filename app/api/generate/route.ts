import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { prompt, style } = await req.json();

  const response = await client.images.generate({
    model: "gpt-image-1",
    prompt: `${prompt}, ${style}, kawaii cartoon cat sticker, pastel colors, bold outline, transparent background, extras like sparkles and hearts`,
    size: "512x512",
    n: 20, // generate 20 stickers
  });

  const urls = response.data.map((img: any) => img.url);
  return NextResponse.json({ urls });
}
