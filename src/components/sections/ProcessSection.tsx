"use client";

import { PROCESS_STEPS } from "@/lib/constants";

export function ProcessSection() {
  return (
    <section
      id="processo"
      style={{ padding: "100px 5%", background: "var(--gun-900)" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: "60px" }}>
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
            // como trabalhamos
          </span>
          <h2
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(28px,4vw,44px)",
              fontWeight: 700,
              lineHeight: 1.15,
            }}
          >
            Do problema ao produto{" "}
            <span className="gradient-text">em 4 etapas</span>
          </h2>
        </div>

        <div
          className="reveal stagger process-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            background: "var(--gun-800)",
            border: "0.5px solid var(--gun-800)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.num}
              style={{
                background: "var(--gun-900)",
                padding: "40px 28px",
                position: "relative",
                transition: "background 0.25s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gun-800)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--gun-900)")}
            >
              {/* Connector line between steps */}
              {idx < PROCESS_STEPS.length - 1 && (
                <div
                  aria-hidden
                  className="process-connector"
                  style={{
                    position: "absolute",
                    top: "52px",
                    right: "-1px",
                    width: "2px",
                    height: "24px",
                    background: "rgba(255,107,0,0.2)",
                  }}
                />
              )}

              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "52px",
                  fontWeight: 700,
                  color: "rgba(255,107,0,0.12)",
                  lineHeight: 1,
                  marginBottom: "20px",
                  userSelect: "none",
                }}
              >
                {step.num}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "15px",
                  fontWeight: 700,
                  marginBottom: "10px",
                  color: "var(--gun-100)",
                }}
              >
                {step.title}
              </h3>
              <p style={{ fontSize: "13px", color: "var(--gun-400)", lineHeight: 1.7 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .process-connector { display: none !important; }
        }
      `}</style>
    </section>
  );
}
