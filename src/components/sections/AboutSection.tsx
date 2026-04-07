"use client";

import { useEffect, useState } from "react";
import { VALUES } from "@/lib/constants";

const TERMINAL_LINES = [
  { type: "cmd",  text: "$ upshift init --projeto \"meu-negocio\"" },
  { type: "out",  text: "✓ Analisando requisitos..." },
  { type: "out",  text: "✓ Definindo arquitetura..." },
  { type: "out",  text: "✓ Configurando ambiente..." },
  { type: "blank", text: "" },
  { type: "cmd",  text: "$ upshift deploy --production" },
  { type: "out",  text: "✓ Build otimizado (98/100)" },
  { type: "out",  text: "✓ Testes passando (100%)" },
  { type: "out",  text: "✓ Deploy realizado! 🚀" },
  { type: "blank", text: "" },
  { type: "cmt",  text: "# negócio no ar e escalando" },
];

function TerminalLine({ type, text }: { type: string; text: string }) {
  const colors: Record<string, string> = {
    cmd:   "var(--orange-bright)",
    out:   "#00B67A",
    cmt:   "var(--gun-500)",
    blank: "transparent",
  };
  return (
    <div style={{ color: colors[type] || "var(--gun-300)", minHeight: "22px" }}>
      {text}
    </div>
  );
}

export function AboutSection() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let i = 0;
          const interval = setInterval(() => {
            i++;
            setVisibleLines(i);
            if (i >= TERMINAL_LINES.length) clearInterval(interval);
          }, 180);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    const el = document.getElementById("terminal-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="sobre"
      style={{ padding: "100px 5%", background: "var(--gun-950)" }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}
        className="about-grid"
      >
        {/* Text */}
        <div className="reveal">
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "2px",
              color: "var(--orange)",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "12px",
            }}
          >
            // sobre nós
          </span>
          <h2
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(28px,4vw,44px)",
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: "20px",
            }}
          >
            Tecnologia que{" "}
            <span className="gradient-text">muda o jogo</span>
          </h2>
          <p style={{ fontSize: "15px", color: "var(--gun-300)", lineHeight: 1.8, marginBottom: "16px" }}>
            A UPSHIFT BR nasceu da frustração com soluções genéricas que não resolvem problemas reais.
            Somos engenheiros apaixonados por construir coisas que funcionam.
          </p>
          <p style={{ fontSize: "15px", color: "var(--gun-300)", lineHeight: 1.8, marginBottom: "36px" }}>
            Nossa missão é simples: transformar o problema do seu negócio em código que funciona, escala
            e gera resultado. Sem jargão desnecessário, sem promessas vazias.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="gun-card"
                style={{ padding: "20px", cursor: "default" }}
              >
                <div style={{ fontSize: "20px", marginBottom: "8px" }}>{v.icon}</div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "var(--gun-100)",
                    marginBottom: "4px",
                  }}
                >
                  {v.title}
                </div>
                <div style={{ fontSize: "12px", color: "var(--gun-400)" }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal */}
        <div className="reveal" id="terminal-section">
          <div
            style={{
              background: "var(--gun-900)",
              border: "0.5px solid var(--gun-700)",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            {/* Title bar */}
            <div
              style={{
                background: "var(--gun-800)",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                borderBottom: "0.5px solid var(--gun-700)",
              }}
            >
              {["#FF5F57","#FEBC2E","#28C840"].map((c) => (
                <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
              ))}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "var(--gun-400)",
                  marginLeft: "8px",
                }}
              >
                upshift-cli — zsh
              </span>
            </div>

            {/* Terminal body */}
            <div style={{ padding: "24px", fontFamily: "var(--font-mono)", fontSize: "13px", lineHeight: "1.8" }}>
              {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
                <TerminalLine key={i} {...line} />
              ))}
              {/* Blinking cursor */}
              {visibleLines < TERMINAL_LINES.length && (
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "16px",
                    background: "var(--orange)",
                    animation: "blink 1s step-end infinite",
                    verticalAlign: "middle",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; } }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </section>
  );
}
