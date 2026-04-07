"use client";

import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SITE } from "@/lib/constants";
import { Bot, Loader2, Download, Send, Copy, Sparkles, Code, ArrowRight, Zap, CheckCircle2, AlertCircle, Monitor } from "lucide-react";

type SimState = "idle" | "generating" | "done" | "error";

export default function SimuladorPage() {
  const [prompt, setPrompt] = useState("");
  const [html, setHtml] = useState("");
  const [state, setState] = useState<SimState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [generationCount, setGenerationCount] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const waUrl = `https://wa.me/${encodeURIComponent(SITE.whatsapp)}?text=${encodeURIComponent("Olá! Usei o simulador da UPSHIFT BR e gostaria de um orçamento para: " + prompt)}`;

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setState("generating");
    setErrorMsg("");

    try {
      const res = await fetch("/api/simulador-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao gerar layout");
      }

      setHtml(data.html);
      setState("done");
      setGenerationCount((c) => c + 1);
    } catch (e) {
      setState("error");
      setErrorMsg(e instanceof Error ? e.message : "Erro desconhecido ao gerar");
    }
  }

  function handleDownload() {
    if (!html) return;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `previa-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleCopyCode() {
    if (!html) return;
    navigator.clipboard.writeText(html);
  }

  function handleWhatsAppOrçamento() {
    window.open(waUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: "68px" }}>

        {/* Hero Section */}
        <section
          style={{
            padding: "80px 5% 40px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Dot grid bg */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `radial-gradient(rgba(255,107,0,0.1) 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
              maskImage: "radial-gradient(ellipse 70% 50% at 50% 10%, #000 30%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 50% 10%, #000 30%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(255,107,0,0.08)", border: "0.5px solid rgba(255,107,0,0.3)",
                borderRadius: "100px", padding: "6px 18px", marginBottom: "24px",
                fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--orange-bright)",
                letterSpacing: "1.5px", textTransform: "uppercase",
              }}
            >
              <Sparkles size={12} color="var(--orange)" />
              Simulador de Projetos com IA
            </div>

            <h1
              style={{
                fontFamily: "var(--font-mono)", fontSize: "clamp(28px,5vw,56px)",
                fontWeight: 700, lineHeight: 1.08, marginBottom: "16px",
              }}
            >
              Descreva seu projeto
              <br />
              <span className="gradient-text">veja a mágica</span>
            </h1>

            <p
              style={{
                fontSize: "clamp(15px,2vw,18px)", color: "var(--gun-300)",
                maxWidth: "580px", margin: "0 auto", lineHeight: 1.7,
              }}
            >
              Conte como deseja o site do seu cliente. A IA gera um layout completo
              em HTML, CSS e JS em tempo real com design profissional.
            </p>
          </div>
        </section>

        {/* Prompt Input */}
        <section
          style={{
            maxWidth: "900px", margin: "0 auto", padding: "0 5% 40px",
          }}
        >
          <div
            style={{
              background: "var(--gun-900)",
              border: "0.5px solid var(--gun-600)",
              borderRadius: "16px",
              padding: "28px",
              boxShadow: "0 16px 48px rgba(0,0,0,0.3)",
            }}
          >
            {/* Textarea */}
            <div style={{ position: "relative" }}>
              <textarea
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  if (state === "error") setState("idle");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
                placeholder={
                  'Ex: "Quero um site moderno para uma barbearia chamada Barbearia Wolf, com cores escuras e douradas, menu com serviços, galeria de fotos, seção de barbeiros e botão de agendar via WhatsApp"'
                }
                style={{
                  width: "100%",
                  minHeight: "120px",
                  background: "var(--gun-950)",
                  border: "0.5px solid var(--gun-700)",
                  borderRadius: "12px",
                  padding: "18px 20px",
                  color: "var(--gun-100)",
                  fontSize: "15px",
                  fontFamily: "var(--font-sans)",
                  lineHeight: 1.7,
                  outline: "none",
                  resize: "vertical",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--orange)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(255,107,0,0.12)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--gun-700)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Quick suggestions */}
            <div
              style={{
                display: "flex", flexWrap: "wrap", gap: "8px",
                marginTop: "16px", marginBottom: "20px",
              }}
            >
              {[
                { label: "✂️ Barbearia", text: 'Crie um site para uma barbearia chamada "Barbearia Premium", com cores pretas e douradas, menu de serviços (corte, barba, combo), seção de barbeiros com fotos, galeria de cortes, horário de funcionamento e botão de agendar via WhatsApp.' },
                { label: "🍕 Restaurante", text: 'Faça um site para um restaurante japonês chamado "Sushi House", com tema escuro, vermelho e dourado. Seções: menu com pratos populares, galeria, horário, localização e link para delivery.' },
                { label: "💼 Escritório", text: 'Site para escritório de advocacia "Silva & Mendes Advocacia", cores azul escuro e branco, sóbrio e profissional. Seções: áreas de atuação, equipe, depoimentos de clientes, formulário de contato.' },
                { label: "🏋️ Academia", text: 'Landing page para academia "Iron Fit Gym", cores vibrantes neon no fundo escuro, planos mensais, grade de horários das aulas, fotos do espaço, CTA de matrícula.' },
              ].map((s) => (
                <button
                  key={s.label}
                  onClick={() => {
                    setPrompt(s.text);
                    setState("idle");
                    setErrorMsg("");
                  }}
                  style={{
                    background: "rgba(255,107,0,0.06)",
                    border: "0.5px solid rgba(255,107,0,0.2)",
                    borderRadius: "8px",
                    padding: "8px 14px",
                    fontSize: "13px",
                    color: "var(--gun-300)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    fontFamily: "var(--font-sans)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,107,0,0.15)";
                    e.currentTarget.style.borderColor = "rgba(255,107,0,0.4)";
                    e.currentTarget.style.color = "var(--gun-100)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,107,0,0.06)";
                    e.currentTarget.style.borderColor = "rgba(255,107,0,0.2)";
                    e.currentTarget.style.color = "var(--gun-300)";
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Generate button */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <span style={{ fontSize: "12px", color: "var(--gun-500)", fontFamily: "var(--font-mono)" }}>
                Ctrl+Enter para gerar
              </span>
              <button
                onClick={handleGenerate}
                disabled={state === "generating" || !prompt.trim()}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  background: state === "generating" || !prompt.trim() ? "var(--gun-700)" : "var(--orange)",
                  color: "#fff",
                  padding: state === "generating" ? "14px 32px" : "14px 32px",
                  borderRadius: "10px",
                  border: "none",
                  fontSize: "15px",
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                  cursor: state === "generating" || !prompt.trim() ? "not-allowed" : "pointer",
                  transition: "all 0.25s",
                  opacity: state === "generating" || !prompt.trim() ? 0.5 : 1,
                  boxShadow: "0 0 16px rgba(255,107,0,0.3)",
                }}
                onMouseEnter={(e) => {
                  if (state !== "generating" && prompt.trim()) {
                    e.currentTarget.style.background = "var(--orange-bright)";
                    e.currentTarget.style.boxShadow = "0 0 24px rgba(255,107,0,0.5)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (state !== "generating" && prompt.trim()) {
                    e.currentTarget.style.background = "var(--orange)";
                    e.currentTarget.style.boxShadow = "0 0 16px rgba(255,107,0,0.3)";
                  }
                }}
              >
                {state === "generating" ? (
                  <>
                    <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                    Gerando layout...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Gerar Prévia
                  </>
                )}
              </button>
            </div>

            {/* Error state */}
            {state === "error" && (
              <div
                style={{
                  marginTop: "16px",
                  background: "rgba(255,80,80,0.08)",
                  border: "0.5px solid rgba(255,80,80,0.25)",
                  borderRadius: "10px",
                  padding: "14px 18px",
                  display: "flex", alignItems: "center", gap: "10px",
                  color: "#ff6b6b", fontSize: "13px", fontFamily: "var(--font-sans)",
                }}
              >
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                {errorMsg}
              </div>
            )}
          </div>
        </section>

        {/* Preview Area */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 5% 100px" }}>

          {/* Loading skeleton */}
          {state === "generating" && (
            <div style={{
              background: "var(--gun-900)", border: "0.5px solid var(--gun-700)",
              borderRadius: "16px", padding: "60px 40px", textAlign: "center",
            }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
                <div style={{ position: "relative" }}>
                  <Monitor size={48} color="var(--orange)" style={{ opacity: 0.4 }} />
                  <div style={{
                    position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                    width: "20px", height: "20px", borderRadius: "50%",
                    background: "var(--orange)", opacity: 0.3,
                    animation: "pulse 1.5s ease-in-out infinite",
                  }} />
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "15px", color: "var(--gun-300)", marginBottom: "8px" }}>
                    A IA está criando seu layout...
                  </p>
                  <p style={{ fontSize: "12px", color: "var(--gun-500)" }}>
                    Gerando HTML, CSS e JavaScript com design profissional
                  </p>
                </div>
                <div style={{
                  display: "flex", gap: "8px", justifyContent: "center", marginTop: "8px",
                }}>
                  {["Analisando prompt", "Gerando estrutura", "Estilizando layout", "Finalizando"].map((step, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: "6px",
                      padding: "6px 12px", borderRadius: "6px",
                      background: "var(--gun-800)", border: "0.5px solid var(--gun-700)",
                    }}>
                      <div style={{
                        width: "8px", height: "8px", borderRadius: "50%",
                        background: "var(--orange)",
                        animation: `pulse 1s ${i * 0.3}s ease-in-out infinite`,
                      }} />
                      <span style={{ fontSize: "11px", color: "var(--gun-400)", fontFamily: "var(--font-mono)" }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Generated preview */}
          {state === "done" && html && (
            <>
              {/* Action bar */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginBottom: "20px", flexWrap: "wrap", gap: "12px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <CheckCircle2 size={18} color="#00B67A" />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--gun-200)" }}>
                    Layout gerado com sucesso
                    {generationCount > 1 && ` (${generationCount}ª geração)`}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <button
                    onClick={handleCopyCode}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      background: "var(--gun-800)", border: "0.5px solid var(--gun-600)",
                      borderRadius: "8px", padding: "8px 14px",
                      fontSize: "13px", color: "var(--gun-200)", cursor: "pointer",
                      transition: "all 0.2s", fontFamily: "var(--font-sans)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--orange-border)"; e.currentTarget.style.color = "var(--orange)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--gun-600)"; e.currentTarget.style.color = "var(--gun-200)"; }}
                  >
                    <Copy size={13} /> Copiar código
                  </button>
                  <button
                    onClick={handleDownload}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      background: "var(--gun-800)", border: "0.5px solid var(--gun-600)",
                      borderRadius: "8px", padding: "8px 14px",
                      fontSize: "13px", color: "var(--gun-200)", cursor: "pointer",
                      transition: "all 0.2s", fontFamily: "var(--font-sans)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--orange-border)"; e.currentTarget.style.color = "var(--orange)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--gun-600)"; e.currentTarget.style.color = "var(--gun-200)"; }}
                  >
                    <Download size={13} /> Baixar HTML
                  </button>
                  <button
                    onClick={handleWhatsAppOrçamento}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "8px",
                      background: "#00B67A", color: "#fff", border: "none",
                      borderRadius: "8px", padding: "9px 18px",
                      fontSize: "13px", fontWeight: 600, cursor: "pointer",
                      transition: "all 0.2s", fontFamily: "var(--font-sans)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#00a368"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#00B67A"; e.currentTarget.style.transform = ""; }}
                  >
                    <Send size={13} /> Enviar para orçamento
                  </button>
                </div>
              </div>

              {/* Preview iframe */}
              <div
                style={{
                  background: "var(--gun-900)",
                  border: "0.5px solid var(--gun-600)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 16px 64px rgba(0,0,0,0.4)",
                }}
              >
                {/* Browser-like title bar */}
                <div style={{
                  background: "var(--gun-800)", padding: "12px 16px",
                  display: "flex", alignItems: "center", gap: "8px",
                  borderBottom: "0.5px solid var(--gun-700)",
                }}>
                  {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
                    <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
                  ))}
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "12px",
                    color: "var(--gun-400)", marginLeft: "12px",
                  }}>
                    upshiftbr.com.br/simulador — preview
                  </span>
                </div>
                <iframe
                  key={generationCount}
                  ref={iframeRef}
                  srcDoc={html}
                  title="Preview do layout gerado"
                  style={{
                    width: "100%",
                    height: "700px",
                    border: "none",
                    background: "#fff",
                  }}
                />
                <div style={{
                  padding: "12px 16px", borderTop: "0.5px solid var(--gun-700)",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <span style={{ fontSize: "11px", color: "var(--gun-500)", fontFamily: "var(--font-mono)" }}>
                    {html.length.toLocaleString()} caracteres · Gerado por IA
                  </span>
                  <button
                    onClick={handleGenerate}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      background: "var(--orange)", color: "#fff", border: "none",
                      borderRadius: "6px", padding: "6px 14px",
                      fontSize: "12px", fontWeight: 600, cursor: "pointer",
                      fontFamily: "var(--font-mono)", transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--orange-bright)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "var(--orange)")}
                  >
                    <ArrowRight size={13} /> Regenerar
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Empty state */}
          {state === "idle" && (
            <div style={{
              textAlign: "center", padding: "80px 20px",
              background: "var(--gun-900)", borderRadius: "16px",
              border: "0.5px solid var(--gun-700)",
            }}>
              <Zap size={48} color="var(--orange)" style={{ opacity: 0.4, marginBottom: "16px" }} />
              <h3 style={{
                fontFamily: "var(--font-mono)", fontSize: "18px",
                color: "var(--gun-300)", marginBottom: "8px",
              }}>
                Nenhum layout gerado ainda
              </h3>
              <p style={{ fontSize: "14px", color: "var(--gun-500)", maxWidth: "400px", margin: "0 auto", lineHeight: 1.6 }}>
                Descreva o projeto desejado acima e clique em "Gerar Prévia" para visualizar o resultado.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.3); } }
      `}</style>
    </>
  );
}
