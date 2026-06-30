import { NextResponse } from "next/server";

const SECRET_KEY = "my-secret-123"; // change this later

export async function POST(req: Request) {
  try {
    const auth = req.headers.get("x-secret");

    if (auth !== SECRET_KEY) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

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
