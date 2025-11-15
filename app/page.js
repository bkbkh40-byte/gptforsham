"use client";

import { useState } from "react";
import { Send, User } from "lucide-react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const newMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, newMsg] })
      });

      const data = await res.json();
      const assistantMsg = { role: "assistant", content: data.reply || "لا يوجد رد" };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("API error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "حصل خطأ، حاول مرة أخرى لاحقًا." }
      ]);
    }
  }

  return (
    <main className="h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => {
          const isAssistant = msg.role === "assistant";
          return (
            <div
              key={i}
              className={`flex items-start gap-2 ${isAssistant ? "flex-row" : "flex-row-reverse"}`}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                {!isAssistant ? <User size={18} /> : <span style={{fontSize:18}}>🤖</span>}
              </div>

              <div
                className={`chat-bubble ${isAssistant ? "bg-gray-800 text-white" : "bg-blue-600 text-white"}`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-800 flex gap-2">
        <input
          className="flex-1 p-3 rounded-xl bg-gray-900 outline-none"
          placeholder="اكتب رسالتك هنا…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="p-3 bg-blue-600 rounded-xl">
          <Send size={20} />
        </button>
      </div>
    </main>
  );
}
