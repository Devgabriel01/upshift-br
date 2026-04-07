"use client";

import { PROJECTS } from "@/lib/constants";

export function ProjectsSection() {
  return (
    <section id="projetos" style={{ padding: "100px 5%", background: "var(--gun-950)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: "60px" }}>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:"11px", letterSpacing:"2px", color:"var(--orange)", textTransform:"uppercase", display:"block", marginBottom:"12px" }}>
            // portfólio
          </span>
          <h2 style={{ fontFamily:"var(--font-mono)", fontSize:"clamp(28px,4vw,44px)", fontWeight:700, lineHeight:1.15, marginBottom:"16px" }}>
            Projetos que <span className="gradient-text">falam por si</span>
          </h2>
          <p style={{ fontSize:"17px", color:"var(--gun-300)", maxWidth:"560px", lineHeight:1.7 }}>
            Soluções reais para negócios reais — cada projeto com desafios únicos e resultados mensuráveis.
          </p>
        </div>

        <div className="reveal stagger" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(340px, 1fr))", gap:"20px" }}>
          {PROJECTS.map((p) => (
            <div key={p.id} className="gun-card" style={{ overflow:"hidden", cursor:"pointer" }}>
              {/* Thumb */}
              <div style={{
                height:"160px",
                display:"flex", alignItems:"center", justifyContent:"center",
                position:"relative", overflow:"hidden",
                background: `linear-gradient(135deg, color-mix(in srgb, ${p.color} 20%, #0C0D0F), color-mix(in srgb, ${p.color} 8%, #0C0D0F))`,
              }}>
                <div aria-hidden style={{
                  position:"absolute", inset:0,
                  backgroundImage:"repeating-linear-gradient(45deg, rgba(255,107,0,0.03) 0px, rgba(255,107,0,0.03) 1px, transparent 1px, transparent 20px)",
                }} />
                <span style={{ fontSize:"36px", position:"relative", zIndex:1 }}>{p.emoji}</span>
              </div>

              {/* Body */}
              <div style={{ padding:"28px" }}>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"11px", color:"var(--orange)", letterSpacing:"1px", textTransform:"uppercase", marginBottom:"10px" }}>
                  {p.category}
                </div>
                <h3 style={{ fontFamily:"var(--font-mono)", fontSize:"18px", fontWeight:700, marginBottom:"10px", color:"var(--gun-100)" }}>
                  {p.title}
                </h3>
                <p style={{ fontSize:"14px", color:"var(--gun-300)", marginBottom:"16px", lineHeight:1.7 }}>
                  {p.description}
                </p>
                <div style={{
                  display:"inline-flex", alignItems:"center", gap:"6px",
                  background:"rgba(0,182,122,0.08)", border:"0.5px solid rgba(0,182,122,0.2)",
                  borderRadius:"100px", padding:"5px 12px",
                  fontSize:"12px", color:"#00B67A", fontFamily:"var(--font-mono)", marginBottom:"16px",
                }}>
                  ↑ {p.result}
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
                  {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ textAlign:"center", marginTop:"48px" }}>
          <a href="#contato" style={{
            fontFamily:"var(--font-mono)", fontSize:"14px", color:"var(--orange)",
            textDecoration:"none", display:"inline-flex", alignItems:"center", gap:"8px", transition:"gap 0.2s",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.gap = "14px")}
            onMouseLeave={(e) => (e.currentTarget.style.gap = "8px")}
          >
            Quer um projeto assim? Fale conosco →
          </a>
        </div>
      </div>
    </section>
  );
}
