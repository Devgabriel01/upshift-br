"use client";

import { SERVICES } from "@/lib/constants";

export function ServicesSection() {
  return (
    <section
      id="servicos"
      style={{
        padding: "100px 5%",
        background: "var(--gun-900)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: "60px" }}>
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
            // o que fazemos
          </span>
          <h2
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(28px,4vw,44px)",
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: "16px",
            }}
          >
            Soluções que resolvem{" "}
            <span className="gradient-text">de verdade</span>
          </h2>
          <p style={{ fontSize: "17px", color: "var(--gun-300)", maxWidth: "560px", lineHeight: 1.7 }}>
            Da ideia ao deploy — entregamos sistemas, sites, automações e infraestrutura com foco em resultado.
          </p>
        </div>

        {/* Services grid */}
        <div
          className="reveal stagger"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
            gap: "1px",
            background: "var(--gun-800)",
            border: "0.5px solid var(--gun-800)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {SERVICES.map((s) => (
            <div
              key={s.title}
              style={{
                background: "var(--gun-900)",
                padding: "36px 32px",
                transition: "background 0.25s",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--gun-800)";
                const bar = e.currentTarget.querySelector(".top-bar") as HTMLElement;
                if (bar) bar.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--gun-900)";
                const bar = e.currentTarget.querySelector(".top-bar") as HTMLElement;
                if (bar) bar.style.opacity = "0";
              }}
            >
              {/* Orange top accent bar */}
              <div
                className="top-bar"
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: "2px",
                  background: "linear-gradient(90deg, var(--orange), var(--orange-bright))",
                  opacity: 0,
                  transition: "opacity 0.25s",
                }}
              />

              {/* Icon */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "rgba(255,107,0,0.1)",
                  border: "0.5px solid rgba(255,107,0,0.2)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  marginBottom: "24px",
                }}
              >
                {s.icon}
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "16px",
                  fontWeight: 700,
                  marginBottom: "12px",
                  color: "var(--gun-100)",
                }}
              >
                {s.title}
              </h3>
              <p style={{ fontSize: "14px", color: "var(--gun-300)", lineHeight: "1.7", marginBottom: "20px" }}>
                {s.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {s.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 380px) {
          section[id="servicos"] > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
