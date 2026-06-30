import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, style } = await req.json();

    const fullPrompt = encodeURIComponent(`${style} sticker, cute, clean outline, white background, ${prompt}`);

    const images = Array.from({ length: 6 }).map(() =>
      `https://image.pollinations.ai/prompt/${fullPrompt}`
    );

    return NextResponse.json({ images });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
