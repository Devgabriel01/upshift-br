"use client";
import { Button } from "@/components/ui/Button";
import { STATS } from "@/lib/constants";

export function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 5% 80px",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Dot grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(rgba(255,107,0,0.12) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Orange radial glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: "700px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(255,107,0,0.12) 0%, transparent 65%)",
          top: "-160px",
          left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }}
      />

      {/* Badge */}
      <div
        className="animate-fade-up"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(255,107,0,0.08)",
          border: "0.5px solid rgba(255,107,0,0.3)",
          borderRadius: "100px",
          padding: "6px 18px",
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          color: "var(--orange-bright)",
          letterSpacing: "1.5px",
          marginBottom: "28px",
          textTransform: "uppercase",
          animationDelay: "0s",
        }}
      >
        <span
          style={{
            display: "block",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "var(--orange)",
            animation: "pulse 2.5s infinite",
            flexShrink: 0,
          }}
        />
        Tecnologia com propósito
      </div>

      {/* H1 */}
      <h1
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(30px,6vw,70px)",
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: "-1px",
          marginBottom: "24px",
          animation: "fadeUp 0.7s 0.1s ease both",
          padding: "0 4px",
        }}
      >
        Seu negócio merece<br />
        <span className="gradient-text">tecnologia de verdade</span>
      </h1>

      {/* Sub */}
      <p
        style={{
          fontSize: "clamp(15px,2vw,20px)",
          color: "var(--gun-300)",
          maxWidth: "600px",
          margin: "0 auto 44px",
          fontWeight: 400,
          lineHeight: 1.7,
          animation: "fadeUp 0.7s 0.2s ease both",
        }}
      >
        Transformamos problemas reais em sistemas, plataformas e automações
        que fazem seu negócio crescer — com eficiência e sem enrolação.
      </p>

      {/* CTAs */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          flexWrap: "wrap",
          animation: "fadeUp 0.7s 0.3s ease both",
        }}
      >
        <Button href="#contato" size="lg">
          ▸&nbsp; Iniciar projeto
        </Button>
        <Button href="#servicos" variant="secondary" size="lg">
          Ver serviços →
        </Button>
        <Button href="/simulador" variant="ghost" size="lg" style={{ gap: "6px" }}>
          ✦ Simulador IA
        </Button>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "48px",
          marginTop: "80px",
          paddingTop: "48px",
          borderTop: "0.5px solid var(--gun-800)",
          flexWrap: "wrap",
          width: "100%",
          animation: "fadeUp 0.7s 0.5s ease both",
        }}
        className="hero-stats"
      >
        {STATS.map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(24px,3vw,32px)",
                fontWeight: 700,
                color: "var(--orange)",
                display: "block",
                lineHeight: 1,
                marginBottom: "6px",
              }}
            >
              {s.value}
            </span>
            <span style={{ fontSize: "13px", color: "var(--gun-400)" }}>{s.label}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.4; transform: scale(0.75); }
        }
        @media (max-width: 480px) {
          .hero-stats { gap: 24px !important; }
        }
      `}</style>
    </section>
  );
}
