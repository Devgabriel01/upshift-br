"use client";

import { useState, useRef, useEffect } from "react";
import { AI_RESPONSES } from "@/lib/constants";
import { X, Send, Bot } from "lucide-react";

type Msg = { from: "bot" | "user"; text: string };

const QUICK_OPTIONS = Object.keys(AI_RESPONSES);

export function AIWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: "Olá! Sou o Shift, assistente da UPSHIFT BR. Como posso te ajudar hoje?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [msgs, typing]);

  function addUserMsg(text: string) {
    setShowOptions(false);
    setMsgs((prev) => [...prev, { from: "user", text }]);
    setTyping(true);

    const reply =
      AI_RESPONSES[text] ||
      "Obrigado pela mensagem! Nossa equipe vai entrar em contato em breve. Ou fale direto no WhatsApp para uma resposta mais rápida.";

    setTimeout(() => {
      setTyping(false);
      setMsgs((prev) => [...prev, { from: "bot", text: reply }]);
    }, 900);
  }

  function handleSend() {
    if (!input.trim()) return;
    addUserMsg(input.trim());
    setInput("");
  }

  return (
    <div style={{ position: "fixed", bottom: "28px", right: "28px", zIndex: 200 }}>
      {/* Panel */}
      <div
        style={{
          position: "absolute",
          bottom: "68px",
          right: 0,
          width: "320px",
          background: "var(--gun-900)",
          border: "0.5px solid var(--gun-600)",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
          transition: "opacity 0.25s, transform 0.25s",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0) scale(1)" : "translateY(12px) scale(0.97)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, var(--gun-800), var(--gun-900))",
            borderBottom: "0.5px solid var(--gun-700)",
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(255,107,0,0.15)",
              border: "0.5px solid rgba(255,107,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Bot size={18} color="var(--orange)" />
          </div>

          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                fontWeight: 700,
                color: "var(--gun-100)",
              }}
            >
              Shift — IA
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "var(--gun-400)",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#00B67A",
                  display: "inline-block",
                }}
              />
              online agora
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            style={{
              background: "none",
              border: "none",
              color: "var(--gun-400)",
              cursor: "pointer",
              padding: "2px",
              display: "flex",
              alignItems: "center",
            }}
            aria-label="Fechar"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={bodyRef}
          style={{
            padding: "16px",
            maxHeight: "280px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {msgs.map((msg, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  background:
                    msg.from === "bot"
                      ? "var(--gun-800)"
                      : "rgba(255,107,0,0.15)",
                  border:
                    msg.from === "bot"
                      ? "0.5px solid var(--gun-700)"
                      : "0.5px solid rgba(255,107,0,0.3)",
                  borderRadius:
                    msg.from === "bot" ? "12px 12px 12px 4px" : "12px 12px 4px 12px",
                  padding: "10px 14px",
                  fontSize: "13px",
                  color: msg.from === "bot" ? "var(--gun-200)" : "var(--gun-100)",
                  maxWidth: "85%",
                  lineHeight: 1.6,
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div style={{ display: "flex", gap: "4px", alignItems: "center", padding: "6px 2px" }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--orange)",
                    animation: `bounce 1s ${i * 0.15}s infinite`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Quick options */}
          {showOptions && !typing && (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "4px" }}>
              {QUICK_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => addUserMsg(opt)}
                  style={{
                    background: "rgba(255,107,0,0.06)",
                    border: "0.5px solid rgba(255,107,0,0.2)",
                    borderRadius: "8px",
                    padding: "9px 13px",
                    fontSize: "12px",
                    color: "var(--gun-300)",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                    fontFamily: "var(--font-sans)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,107,0,0.12)";
                    e.currentTarget.style.borderColor = "rgba(255,107,0,0.4)";
                    e.currentTarget.style.color = "var(--gun-100)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,107,0,0.06)";
                    e.currentTarget.style.borderColor = "rgba(255,107,0,0.2)";
                    e.currentTarget.style.color = "var(--gun-300)";
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input row */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            padding: "12px 14px",
            borderTop: "0.5px solid var(--gun-700)",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Digite sua mensagem..."
            style={{
              flex: 1,
              background: "var(--gun-950)",
              border: "0.5px solid var(--gun-700)",
              borderRadius: "8px",
              padding: "9px 13px",
              color: "var(--gun-100)",
              fontSize: "13px",
              fontFamily: "var(--font-sans)",
              outline: "none",
            }}
          />
          <button
            onClick={handleSend}
            style={{
              background: "var(--orange)",
              border: "none",
              borderRadius: "8px",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--orange-bright)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--orange)")}
            aria-label="Enviar"
          >
            <Send size={14} color="#fff" />
          </button>
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Assistente IA"
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: open ? "var(--gun-700)" : "var(--orange)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: open ? "none" : "0 8px 32px rgba(255,107,0,0.5)",
          transition: "all 0.25s",
          fontSize: "22px",
        }}
        onMouseEnter={(e) => {
          if (!open) {
            e.currentTarget.style.transform = "scale(1.08)";
            e.currentTarget.style.boxShadow = "0 12px 40px rgba(255,107,0,0.65)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = open ? "none" : "0 8px 32px rgba(255,107,0,0.5)";
        }}
      >
        {open ? <X size={20} color="#fff" /> : <Bot size={22} color="#fff" />}
      </button>

      <style>{`
        @keyframes bounce {
          0%,80%,100% { transform: translateY(0); }
          40%          { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
