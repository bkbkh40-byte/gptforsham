import { NextResponse } from "next/server";

export async function POST(req) {
  const { messages } = await req.json();

  const apiKey = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL || "gpt-4o-mini";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: \`Bearer \${apiKey}\`
    },
    body: JSON.stringify({
      model,
      messages
    })
  });

  const data = await response.json();

  return NextResponse.json({
    reply: data.choices?.[0]?.message?.content || "Error: no response"
  });
}
