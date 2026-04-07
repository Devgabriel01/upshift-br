"use client";

import { SITE } from "@/lib/constants";

export function CtaSection() {
  const waUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMsg)}`;

  return (
    <section
      id="cta"
      style={{
        padding: "100px 5%",
        background: "var(--gun-950)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Orange glow orbs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 65%)",
          top: "-200px",
          left: "-100px",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 65%)",
          bottom: "-150px",
          right: "-80px",
          pointerEvents: "none",
        }}
      />

      {/* Horizontal rule accent */}
      <div
        aria-hidden
        style={{
          width: "60px",
          height: "2px",
          background: "var(--orange)",
          margin: "0 auto 32px",
          borderRadius: "1px",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "700px", margin: "0 auto" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "2px",
            color: "var(--orange)",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "20px",
          }}
        >
          // próximo passo
        </span>

        <h2
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(28px,5vw,56px)",
            fontWeight: 700,
            lineHeight: 1.08,
            marginBottom: "20px",
          }}
        >
          Pronto para dar o{" "}
          <span className="gradient-text">próximo passo?</span>
        </h2>

        <p
          style={{
            fontSize: "18px",
            color: "var(--gun-300)",
            marginBottom: "48px",
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          Conte seu projeto. Nossa equipe responde em até 24 horas
          com uma proposta personalizada e sem compromisso.
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {/* WhatsApp CTA */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "#00B67A",
              color: "#fff",
              padding: "16px 36px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "16px",
              transition: "all 0.25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#00a368";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,182,122,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#00B67A";
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <span style={{ fontSize: "20px" }}>💬</span>
            Falar no WhatsApp agora
          </a>

          {/* Proposta CTA */}
          <a
            href="#contato"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "transparent",
              color: "var(--gun-100)",
              padding: "16px 36px",
              borderRadius: "10px",
              border: "0.5px solid var(--gun-600)",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "16px",
              transition: "all 0.25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--orange-border)";
              e.currentTarget.style.background = "var(--orange-faint)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--gun-600)";
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "";
            }}
          >
            Enviar proposta →
          </a>
        </div>
      </div>
    </section>
  );
}
