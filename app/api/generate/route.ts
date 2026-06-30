import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, style } = await req.json();

    const fullPrompt = encodeURIComponent(`${style} style ${prompt}`);

    const imageUrl = `https://image.pollinations.ai/prompt/${fullPrompt}`;

    return NextResponse.json({
      images: [imageUrl],
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
