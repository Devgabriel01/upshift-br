"use client";
import { useState, useEffect, useRef } from "react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { Menu, X, Sparkles } from "lucide-react";

const SIM_LINKS = [...NAV_LINKS, { label: "Simulador", href: "/simulador" }];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open || !menuRef.current) return;
    const handler = (e: Event) => {
      e.stopPropagation();
      setOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 5%", height: "68px",
        background: scrolled ? "rgba(12,13,15,0.92)" : "rgba(12,13,15,0.6)",
        backdropFilter: "blur(16px)",
        borderBottom: `0.5px solid ${scrolled ? "rgba(255,107,0,0.2)" : "rgba(255,107,0,0.08)"}`,
        transition: "all 0.3s ease",
      }}
    >
      {/* Logo */}
      <a href="#hero" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
        <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
          <polygon points="20,2 38,12 38,30 20,40 2,30 2,12" fill="none" stroke="#FF6B00" strokeWidth="1.5"/>
          <polyline points="20,31 20,15" fill="none" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round"/>
          <polyline points="12,23 20,15 28,23" fill="none" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="13" y1="34" x2="27" y2="34" stroke="#FF8C00" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "15px", fontWeight: 700, letterSpacing: "2px", color: "#fff" }}>
          UPSHIFT<span style={{ color: "#FF6B00" }}> BR</span>
        </span>
      </a>

      {/* Desktop links */}
      <ul style={{ display: "flex", alignItems: "center", gap: "28px", listStyle: "none" }}
          className="hidden md:flex">
        {SIM_LINKS.map((l) => (
          <li key={l.href}>
            <a href={l.href} style={{
              color: l.href === "/simulador" ? "#FF6B00" : "var(--gun-300)",
              textDecoration: "none", fontSize: "14px", fontWeight: 500,
              transition: "color 0.2s",
              display: "inline-flex", alignItems: "center", gap: "4px",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = l.href === "/simulador" ? "#FF6B00" : "var(--gun-300)")}>
              {l.href === "/simulador" && <Sparkles size={12} />}
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a href="#contato" style={{
            background: "var(--orange)", color: "#fff", padding: "9px 22px", borderRadius: "8px",
            textDecoration: "none", fontSize: "14px", fontWeight: 600,
            transition: "all 0.2s", display: "inline-block",
            boxShadow: "0 0 16px rgba(255,107,0,0.3)",
          }}
          onMouseEnter={e => { e.currentTarget.style.background="#FF8C00"; e.currentTarget.style.boxShadow="0 0 24px rgba(255,107,0,0.5)"; }}
          onMouseLeave={e => { e.currentTarget.style.background="var(--orange)"; e.currentTarget.style.boxShadow="0 0 16px rgba(255,107,0,0.3)"; }}>
            Iniciar projeto
          </a>
        </li>
      </ul>

      {/* Mobile burger */}
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        style={{ background:"none", border:"none", color:"#fff", cursor:"pointer", padding:"4px", zIndex: 110 }}
        className="md:hidden"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
      >
        {open ? <X size={22}/> : <Menu size={22}/>}
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          ref={menuRef}
          style={{
            position:"fixed", top:"68px", left:0, right:0, bottom:0,
            background:"rgba(12,13,15,0.98)",
            padding:"32px 5%",
            display:"flex", flexDirection:"column", gap:"24px",
            animation: "slideDown 0.25s ease",
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--orange)", letterSpacing: "2px", textTransform: "uppercase" }}>
            menu
          </span>
          {SIM_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={closeMenu}
              style={{
                color: l.href === "/simulador" ? "#FF6B00" : "var(--gun-100)",
                textDecoration: "none", fontSize: "24px", fontWeight: 700,
                fontFamily: "var(--font-mono)",
                display: "inline-flex", alignItems: "center", gap: "8px",
              }}
            >
              {l.href === "/simulador" && <Sparkles size={16} />}
              {l.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={closeMenu}
            style={{
              background: "var(--orange)", color: "#fff", padding: "16px 24px",
              borderRadius: "10px", textDecoration: "none", fontWeight: 700, textAlign: "center",
              fontSize: "16px", marginTop: "16px",
              boxShadow: "0 8px 32px rgba(255,107,0,0.4)",
            }}
          >
            Iniciar projeto
          </a>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}
