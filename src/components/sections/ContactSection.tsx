"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

const SERVICE_OPTIONS = [
  "Sistema / Plataforma Web",
  "Site Institucional / Landing Page",
  "Automação de Processos",
  "DevOps / Infraestrutura",
  "App Mobile",
  "Consultoria Técnica",
];

const CONTACT_LINKS = [
  {
    icon: "💬",
    label: "WhatsApp",
    sub: "+55 (98) 9 9999-9999",
    href: `https://wa.me/${SITE.whatsapp}`,
  },
  {
    icon: "📧",
    label: "E-mail",
    sub: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: "💼",
    label: "LinkedIn",
    sub: "/company/upshiftbr",
    href: SITE.linkedin,
  },
];

type FormState = "idle" | "sending" | "sent" | "error";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState<FormState>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit() {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");

    // POST to /api/contato
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", service: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputStyle = {
    width: "100%",
    background: "var(--gun-950)",
    border: "0.5px solid var(--gun-700)",
    borderRadius: "8px",
    padding: "12px 16px",
    color: "var(--gun-100)",
    fontSize: "14px",
    fontFamily: "var(--font-sans)",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <section
      id="contato"
      style={{ padding: "100px 5%", background: "var(--gun-800)" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "80px",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Left info */}
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
              // contato
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
              Vamos construir{" "}
              <span className="gradient-text">algo juntos?</span>
            </h2>
            <p style={{ fontSize: "16px", color: "var(--gun-300)", lineHeight: 1.8, marginBottom: "40px" }}>
              Você chegou até aqui porque quer resolver algo. É exatamente isso que a gente faz.
              Sem templates, sem enrolação — só conversa e solução.
            </p>

            {/* Contact links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {CONTACT_LINKS.map((cl) => (
                <a
                  key={cl.label}
                  href={cl.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "18px 22px",
                    background: "var(--gun-900)",
                    border: "0.5px solid var(--gun-700)",
                    borderRadius: "10px",
                    textDecoration: "none",
                    color: "var(--gun-100)",
                    transition: "all 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--orange-border)";
                    e.currentTarget.style.transform = "translateX(4px)";
                    e.currentTarget.style.background = "var(--gun-800)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--gun-700)";
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.background = "var(--gun-900)";
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      background: "rgba(255,107,0,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      flexShrink: 0,
                    }}
                  >
                    {cl.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600 }}>{cl.label}</div>
                    <div style={{ fontSize: "12px", color: "var(--gun-400)", marginTop: "2px" }}>{cl.sub}</div>
                  </div>
                  <span style={{ marginLeft: "auto", color: "var(--gun-600)", fontSize: "16px" }}>→</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div
            className="reveal"
            style={{
              background: "var(--gun-900)",
              border: "0.5px solid var(--gun-700)",
              borderRadius: "14px",
              padding: "40px",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "16px",
                fontWeight: 700,
                marginBottom: "32px",
                color: "var(--gun-100)",
              }}
            >
              Solicitar proposta
            </h3>

            {/* Name */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--gun-300)", marginBottom: "8px" }}>
                Seu nome *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="João Silva"
                style={inputStyle}
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

            {/* Email */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--gun-300)", marginBottom: "8px" }}>
                E-mail *
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="joao@empresa.com"
                style={inputStyle}
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

            {/* Service select */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--gun-300)", marginBottom: "8px" }}>
                Tipo de projeto
              </label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--orange)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(255,107,0,0.12)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--gun-700)";
                  e.target.style.boxShadow = "none";
                }}
              >
                <option value="">Selecione...</option>
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} style={{ background: "var(--gun-900)" }}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div style={{ marginBottom: "28px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--gun-300)", marginBottom: "8px" }}>
                Descreva seu projeto *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Explique o problema que quer resolver, o que já existe hoje e o resultado esperado..."
                rows={5}
                style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
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

            {/* Submit */}
            <Button
              onClick={handleSubmit}
              disabled={status === "sending" || status === "sent"}
              style={{ width: "100%", justifyContent: "center" }}
            >
              {status === "idle" && "Enviar proposta →"}
              {status === "sending" && "Enviando..."}
              {status === "sent" && "✓ Proposta enviada com sucesso!"}
              {status === "error" && "Erro ao enviar — tente novamente"}
            </Button>

            {status === "sent" && (
              <p style={{ fontSize: "13px", color: "#00B67A", textAlign: "center", marginTop: "12px" }}>
                Entraremos em contato em até 24 horas 🚀
              </p>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid { grid-template-columns: 1fr 1.2fr; }
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
