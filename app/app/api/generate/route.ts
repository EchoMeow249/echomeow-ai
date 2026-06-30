import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt, style } = await req.json();

  const text = `${style} sticker: ${prompt}`;

  return NextResponse.json({
    images: [
      `https://placehold.co/512x512/png?text=${encodeURIComponent(text)}`,
      `https://placehold.co/512x512/png?text=${encodeURIComponent(text + " 2")}`,
      `https://placehold.co/512x512/png?text=${encodeURIComponent(text + " 3")}`,
    ],
  });
}
