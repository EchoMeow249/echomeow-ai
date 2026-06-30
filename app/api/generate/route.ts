import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt, style } = await req.json();

  return NextResponse.json({
    images: [
      `https://placehold.co/512x512?text=${encodeURIComponent(style + " " + prompt)}`,
      `https://placehold.co/512x512?text=Sticker+2`,
      `https://placehold.co/512x512?text=Sticker+3`,
    ],
  });
}
