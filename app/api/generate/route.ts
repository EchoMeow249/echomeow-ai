import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt, style } = await req.json();

  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: `${style} style ${prompt}`,
      n: 3,
      size: "512x512",
    }),
  });

  const data = await res.json();

  return NextResponse.json({
    images: data.data.map((d: any) => d.url),
  });
}
