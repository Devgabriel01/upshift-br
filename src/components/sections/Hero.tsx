"use client";
import { useEffect, useRef } from "react";
import { STATS } from "@/lib/constants";

export default function Hero() {
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Staggered entrance
    const els = document.querySelectorAll(".hero-enter");
    els.forEach((el, i) => {
      (el as HTMLElement).style.animationDelay = `${i * 0.12}s`;
      el.classList.add("hero-animate");
    });
  }, []);

  return (
    <section id="hero" style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "120px 5% 80px",
      position: "relative", overflow: "hidden",
      textAlign: "center",
    }}>
      {/* Grid BG */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(255,107,0,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,107,0,0.05) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
        WebkitMaskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, #000 60%, transparent 100%)",
        maskImage: "radial-gradient(ellipse 80% 65% at 50% 0%, #000 60%, transparent 100%)",
      }}/>

      {/* Glow orb */}
      <div style={{
        position: "absolute", width: "700px", height: "700px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 70%)",
        top: "-300px", left: "50%", transform: "translateX(-50%)", pointerEvents: "none",
      }}/>

      {/* Orange bottom glow */}
      <div style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "400px", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(255,107,0,0.4), transparent)",
        pointerEvents: "none",
      }}/>

      {/* Badge */}
      <div className="hero-enter" style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        background: "rgba(255,107,0,0.06)", border: "0.5px solid rgba(255,107,0,0.25)",
        borderRadius: "100px", padding: "6px 18px", marginBottom: "28px",
        fontFamily: "var(--font-mono)", fontSize: "11px", color: "#FF6B00", letterSpacing: "1.5px",
        opacity: 0,
      }}>
        <span style={{
          display: "inline-block", width: "6px", height: "6px", borderRadius: "50%",
          background: "#FF6B00",
          boxShadow: "0 0 8px rgba(255,107,0,0.8)",
          animation: "pulse 2s infinite",
        }}/>
        TECNOLOGIA COM PROPÓSITO
      </div>

      {/* H1 */}
      <h1 className="hero-enter" style={{
        fontFamily: "var(--font-mono)",
        fontSize: "clamp(2.2rem, 6vw, 5rem)",
        fontWeight: 700, lineHeight: 1.06,
        letterSpacing: "-0.02em",
        marginBottom: "24px",
        opacity: 0,
      }}>
        Seu negócio merece<br/>
        <span className="gradient-text text-glow">tecnologia de verdade</span>
      </h1>

      {/* Sub */}
      <p className="hero-enter" style={{
        fontSize: "clamp(15px, 2vw, 19px)", color: "var(--gun-300)",
        maxWidth: "580px", fontWeight: 300, lineHeight: 1.7,
        marginBottom: "44px", opacity: 0,
      }}>
        Transformamos problemas reais em sistemas, plataformas e automações que fazem seu negócio crescer — com eficiência e sem enrolação.
      </p>

      {/* CTAs */}
      <div className="hero-enter" style={{ display:"flex", gap:"14px", flexWrap:"wrap", justifyContent:"center", marginBottom:"80px", opacity:0 }}>
        <a href="#contato" style={{
          display:"inline-flex", alignItems:"center", gap:"8px",
          background:"var(--orange)", color:"#fff",
          padding:"14px 32px", borderRadius:"10px",
          textDecoration:"none", fontWeight:600, fontSize:"15px",
          boxShadow:"0 0 24px rgba(255,107,0,0.4)",
          transition:"all 0.25s",
        }}
        onMouseEnter={e=>{ e.currentTarget.style.background="#FF8C00"; e.currentTarget.style.boxShadow="0 0 40px rgba(255,107,0,0.6)"; e.currentTarget.style.transform="translateY(-2px)"; }}
        onMouseLeave={e=>{ e.currentTarget.style.background="var(--orange)"; e.currentTarget.style.boxShadow="0 0 24px rgba(255,107,0,0.4)"; e.currentTarget.style.transform="translateY(0)"; }}>
          ▸ &nbsp;Iniciar projeto
        </a>
        <a href="#servicos" style={{
          display:"inline-flex", alignItems:"center", gap:"8px",
          background:"transparent", color:"var(--gun-200)",
          padding:"14px 32px", borderRadius:"10px",
          textDecoration:"none", fontWeight:500, fontSize:"15px",
          border:"0.5px solid var(--gun-600)", transition:"all 0.25s",
        }}
        onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(255,107,0,0.4)"; e.currentTarget.style.color="#fff"; e.currentTarget.style.background="rgba(255,107,0,0.05)"; }}
        onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--gun-600)"; e.currentTarget.style.color="var(--gun-200)"; e.currentTarget.style.background="transparent"; }}>
          Ver serviços →
        </a>
      </div>

      {/* Stats */}
      <div className="hero-enter" style={{
        display:"flex", alignItems:"center", justifyContent:"center", gap:"48px",
        paddingTop:"40px", borderTop:"0.5px solid var(--gun-700)",
        flexWrap:"wrap", opacity:0,
      }}>
        {STATS.map((s) => (
          <div key={s.label} style={{ textAlign:"center" }}>
            <span style={{
              fontFamily:"var(--font-mono)", fontSize:"30px", fontWeight:700,
              color:"var(--orange)", display:"block",
              textShadow:"0 0 16px rgba(255,107,0,0.4)",
            }}>{s.value}</span>
            <span style={{ fontSize:"13px", color:"var(--gun-400)", marginTop:"4px", display:"block" }}>{s.label}</span>
          </div>
        ))}
      </div>

      <style>{`
        .hero-animate {
          animation: heroFadeUp 0.7s ease both;
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.5; transform:scale(0.8); }
        }
      `}</style>
    </section>
  );
}
