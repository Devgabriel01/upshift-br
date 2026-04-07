"use client";
import { SERVICES } from "@/lib/constants";

export default function Services() {
  return (
    <section id="servicos" style={{ background:"var(--gun-900)", padding:"100px 5%" }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
        <div className="reveal" style={{ marginBottom:"60px" }}>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:"11px", letterSpacing:"2px", color:"var(--orange)", display:"block", marginBottom:"12px" }}>
            // o que fazemos
          </span>
          <h2 style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:700, marginBottom:"16px" }}>
            Soluções que resolvem<br/>de verdade
          </h2>
          <p style={{ fontSize:"17px", color:"var(--gun-300)", maxWidth:"520px", fontWeight:300 }}>
            Da ideia ao deploy — entregamos sistemas, sites, automações e infraestrutura com foco em resultado.
          </p>
        </div>

        <div className="reveal" style={{
          display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",
          gap:"1px", background:"var(--gun-700)",
          border:"0.5px solid var(--gun-700)", borderRadius:"12px", overflow:"hidden",
        }}>
          {SERVICES.map((s) => (
            <div key={s.id}
              style={{
                background: s.highlight ? "rgba(255,107,0,0.04)" : "var(--gun-900)",
                padding:"36px 32px", position:"relative", overflow:"hidden",
                transition:"background 0.25s",
                cursor:"default",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "var(--gun-800)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = s.highlight ? "rgba(255,107,0,0.04)" : "var(--gun-900)"; }}
            >
              {s.highlight && (
                <div style={{
                  position:"absolute", top:0, left:0, right:0, height:"2px",
                  background:"linear-gradient(90deg, var(--orange), var(--orange-bright))",
                  boxShadow:"0 0 12px rgba(255,107,0,0.5)",
                }}/>
              )}
              <div style={{
                width:"44px", height:"44px",
                background:"rgba(255,107,0,0.08)", border:"0.5px solid rgba(255,107,0,0.2)",
                borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center",
                marginBottom:"20px", fontSize:"20px",
              }}>{s.icon}</div>
              <h3 style={{ fontFamily:"var(--font-mono)", fontSize:"16px", fontWeight:700, marginBottom:"10px" }}>{s.title}</h3>
              <p style={{ fontSize:"14px", color:"var(--gun-300)", lineHeight:1.7, marginBottom:"20px" }}>{s.description}</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
                {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
