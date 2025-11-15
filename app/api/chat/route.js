import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages
      })
    });

    const data = await response.json();

    return NextResponse.json({
      reply: data.choices?.[0]?.message?.content || "لا يوجد رد"
    });

  } catch (err) {
    console.log("Server Error:", err);
    return NextResponse.json(
      { reply: "حصل خطأ في السيرفر" },
      { status: 500 }
    );
  }
}
