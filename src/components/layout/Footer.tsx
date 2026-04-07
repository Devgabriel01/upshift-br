"use client";

import { SITE } from "@/lib/constants";

const links = {
  Serviços: ["Sistemas & APIs","Sites & Plataformas","Automação & IA","DevOps & Cloud","Consultoria"],
  Empresa:  ["Sobre nós","Portfólio","Como trabalhamos","Blog","Contato"],
  Ferramentas: ["Simulador de Projetos"],
  Social:   ["LinkedIn","Instagram","GitHub","YouTube"],
};

export function Footer() {
  return (
    <footer style={{ background:"#080A0C", borderTop:"0.5px solid var(--gun-700)", padding:"60px 5% 32px" }}>
      <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:"48px", marginBottom:"48px" }}
             className="footer-grid">
          {/* Brand */}
          <div>
            <a href="#hero" style={{ display:"inline-flex", alignItems:"center", gap:"10px", textDecoration:"none", marginBottom:"16px" }}>
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                <polygon points="20,2 38,12 38,30 20,40 2,30 2,12" fill="none" stroke="#FF6B00" strokeWidth="1.5"/>
                <polyline points="20,31 20,15" fill="none" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round"/>
                <polyline points="12,23 20,15 28,23" fill="none" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="13" y1="34" x2="27" y2="34" stroke="#FF8C00" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span style={{ fontFamily:"var(--font-mono)", fontSize:"15px", fontWeight:700, letterSpacing:"2px", color:"#fff" }}>
                UPSHIFT<span style={{ color:"#FF6B00" }}> BR</span>
              </span>
            </a>
            <p style={{ fontSize:"14px", color:"var(--gun-400)", lineHeight:1.7, maxWidth:"260px" }}>
              Transformamos problemas reais em soluções tecnológicas que fazem negócios crescerem.
            </p>
            <p style={{ marginTop:"16px", fontFamily:"var(--font-mono)", fontSize:"11px", color:"var(--orange)", letterSpacing:"2px" }}>
              SHIFT UP. SHIP FAST.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <p style={{ fontFamily:"var(--font-mono)", fontSize:"11px", fontWeight:700, letterSpacing:"1.5px",
                color:"var(--gun-200)", marginBottom:"20px", textTransform:"uppercase" }}>{title}</p>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"12px" }}>
                {items.map((item) => {
                  const href = item === "Simulador de Projetos" ? "/simulador" : "#";
                  return (
                  <li key={item}>
                    <a href={href} style={{ fontSize:"14px", color: href === "/simulador" ? "var(--orange)" : "var(--gun-400)", textDecoration:"none", transition:"color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = href === "/simulador" ? "var(--orange-bright)" : "#fff")}
                      onMouseLeave={e => (e.currentTarget.style.color = href === "/simulador" ? "var(--orange)" : "var(--gun-400)")}>{item}</a>
                  </li>
                );})}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
          paddingTop:"28px", borderTop:"0.5px solid var(--gun-700)", flexWrap:"wrap", gap:"12px" }}>
          <p style={{ fontSize:"13px", color:"var(--gun-500)" }}>
            © 2025 <span style={{ color:"var(--orange)" }}>UPSHIFT BR</span>. Todos os direitos reservados.
          </p>
          <p style={{ fontSize:"13px", color:"var(--gun-500)" }}>
            Feito com fogo no Brasil · {SITE.email}
          </p>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media(max-width:480px){
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
