import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";
const DEFAULT_MODEL = process.env.OPENROUTER_MODEL || "google/gemini-2.0-flash-exp";

const SYSTEM_PROMPT = `Você é um gerador de layouts HTML profissional da UPSHIFT BR.

REGRAS:
1. Gere SEMPRE um arquivo HTML COMPLETO e AUTÔNOMO (com estilos inline e JavaScript inline se necessário).
2. O HTML deve ser moderno, responsivo e profissional.
3. Use gradientes, sombras, animações CSS e bom design visual.
4. O layout deve ser mobile-first e responsivo.
5. Inclua seções típicas: hero, sobre, serviços, contato, footer.
6. Use fontes do Google Fonts (Inter ou similar).
7. NÃO use frameworks CSS externos nem bibliotecas JS externas. Tudo inline.
8. NÃO inclua comentários no código.
9. Responda APENAS com o HTML puro. Nada mais. Sem markdown, sem \`\`\`html, sem texto antes ou depois.
10. Use cores e temas que combinem com o contexto descrito pelo cliente.
11. Inclua CTAs funcionais (botões com hover effects).
12. Crie conteúdo fictício (lorem ipsum não — use texto realista em português-BR para o tipo de negócio descrito).
13. O HTML deve ter DOCTYPE, html, head e body completos.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 10) {
      return NextResponse.json(
        { error: "Descreva o projeto com pelo menos 10 caracteres." },
        { status: 400 }
      );
    }

    if (!OPENROUTER_API_KEY) {
      // Fallback: generate a good static HTML template locally when no API key
      const fallbackHtml = generateFallbackHtml(prompt);
      return NextResponse.json({ html: fallbackHtml });
    }

    const userPrompt = `Crie um site HTML completo para o seguinte projeto:\n\n${prompt}`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://upshiftbr.com.br",
        "X-Title": "UPSHIFT BR Simulator",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.8,
        max_tokens: 8000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error?.message || "Erro na API do OpenRouter" },
        { status: response.status }
      );
    }

    const data = await response.json();
    let generatedHtml = data.choices?.[0]?.message?.content || "";

    // Strip markdown code fences if present
    generatedHtml = generatedHtml
      .replace(/^```html\n?/, "")
      .replace(/^```\n?/, "")
      .replace(/\n?```$/, "")
      .trim();

    return NextResponse.json({ html: generatedHtml });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno ao gerar layout. Tente novamente." },
      { status: 500 }
    );
  }
}

// Fallback generator — creates a professional HTML when no API key is configured
function generateFallbackHtml(prompt: string): string {
  const lower = prompt.toLowerCase();

  // Extract business-like info from prompt
  const extractName = (): string => {
    const patterns = [
      /["'](.*?)["']/,
      /chamad[oa]\s+(?:uma\s+)?["']?(.*?)["']?/i,
      /chamad[oa]\s+(?:de\s+)?["']?(.*?)["']?/i,
    ];
    for (const p of patterns) {
      const m = prompt.match(p);
      if (m) return m[1].trim();
    }
    return "Seu Projeto";
  };

  const name = extractName();

  let accentColor = "#FF6B00";
  let accentBg = "#FF8C00";
  if (lower.includes("azul") || lower.includes("tech") || lower.includes("advogac") || lower.includes("juri")) {
    accentColor = "#3B82F6";
    accentBg = "#60A5FA";
  } else if (lower.includes("vermell") || lower.includes("vermelho")) {
    accentColor = "#EF4444";
    accentBg = "#F87171";
  } else if (lower.includes("verde")) {
    accentColor = "#10B981";
    accentBg = "#34D399";
  } else if (lower.includes("roxo") || lower.includes("purple") || lower.includes("púrpura")) {
    accentColor = "#8B5CF6";
    accentBg = "#A78BFA";
  } else if (lower.includes("rosa") || lower.includes("pink")) {
    accentColor = "#EC4899";
    accentBg = "#F472B6";
  } else if (lower.includes("dourad") || lower.includes("gold") || lower.includes("amarelo")) {
    accentColor = "#F59E0B";
    accentBg = "#FBBF24";
  }

  const sections: string[] = [];

  if (lower.includes("barbear") || lower.includes("salão") || lower.includes("salao") || lower.includes("estetica")) {
    sections.push("Serviços", "Equipe", "Galeria", "Agendamento");
  } else if (lower.includes("restaurante") || lower.includes("pizza") || lower.includes("sushi") || lower.includes("comida") || lower.includes("aliment")) {
    sections.push("Cardápio", "Especiais", "Galeria", "Delivery");
  } else if (lower.includes("academ") || lower.includes("fit") || lower.includes("esport") || lower.includes("cross")) {
    sections.push("Planos", "Aulas", "Instrutores", "Horários");
  } else if (lower.includes("advogac") || lower.includes("jur") || lower.includes("escritório") || lower.includes("contábil")) {
    sections.push("Áreas de Atuação", "Equipe", "Depoimentos", "Contato");
  } else {
    sections.push("Serviços", "Sobre", "Depoimentos", "Contato");
  }

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — UPSHIFT BR</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    body { font-family:'Inter',system-ui,sans-serif; color:#1a1a2e; background:#fdfdfd; overflow-x:hidden; }
    :root { --accent:${accentColor}; --accent-light:${accentBg}; --dark:#0f0f10; }

    /* NAV */
    nav { position:fixed; top:0; left:0; right:0; z-index:100; background:rgba(15,15,16,0.95); backdrop-filter:blur(12px); padding:0 5%; height:64px; display:flex; align-items:center; justify-content:space-between; transition:all 0.3s; }
    .logo { font-weight:800; font-size:20px; color:#fff; text-decoration:none; letter-spacing:1px; }
    .logo span { color:var(--accent); }
    .nav-links { display:flex; gap:24px; list-style:none; }
    .nav-links a { color:rgba(255,255,255,0.7); text-decoration:none; font-size:14px; font-weight:500; transition:color 0.2s; }
    .nav-links a:hover { color:#fff; }
    .nav-cta { background:var(--accent); color:#fff; padding:9px 20px; border-radius:8px; text-decoration:none; font-size:14px; font-weight:600; transition:all 0.2s; }
    .nav-cta:hover { opacity:0.9; transform:translateY(-1px); }
    .burger { display:none; background:none; border:none; color:#fff; cursor:pointer; }
    .mobile-menu { display:none; position:fixed; top:64px; left:0; right:0; background:rgba(15,15,16,0.98); padding:24px 5%; flex-direction:column; gap:16px; border-bottom:1px solid rgba(255,107,0,0.2); }
    .mobile-menu.open { display:flex; }
    .mobile-menu a { color:rgba(255,255,255,0.7); text-decoration:none; font-size:16px; }

    /* HERO */
    .hero { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:100px 5% 60px; background:var(--dark); color:#fff; position:relative; overflow:hidden; }
    .hero::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 50% 0%, rgba(107,107,255,0.08) 0%, transparent 60%); pointer-events:none; }
    .hero-badge { display:inline-flex; align-items:center; gap:8px; background:rgba(255,107,0,0.1); border:1px solid rgba(255,107,0,0.3); border-radius:100px; padding:6px 16px; font-size:12px; color:var(--accent-light); letter-spacing:1px; text-transform:uppercase; margin-bottom:24px; }
    .hero-badge::before { content:''; width:6px; height:6px; border-radius:50%; background:var(--accent); animation:pulse 2s infinite; }
    .hero h1 { font-size:clamp(32px,6vw,64px); font-weight:800; line-height:1.1; margin-bottom:20px; }
    .hero h1 .highlight { color:var(--accent); }
    .hero p { font-size:clamp(16px,2vw,20px); color:rgba(255,255,255,0.6); max-width:560px; line-height:1.7; margin-bottom:40px; }
    .hero-btns { display:flex; gap:14px; flex-wrap:wrap; justify-content:center; }
    .btn-primary { background:var(--accent); color:#fff; padding:14px 32px; border-radius:10px; text-decoration:none; font-weight:700; font-size:16px; transition:all 0.25s; display:inline-flex; align-items:center; gap:8px; }
    .btn-primary:hover { opacity:0.9; transform:translateY(-2px); box-shadow:0 12px 40px rgba(107,107,255,0.3); }
    .btn-secondary { background:transparent; color:#fff; padding:14px 32px; border-radius:10px; text-decoration:none; font-weight:600; font-size:16px; border:1px solid rgba(255,255,255,0.2); transition:all 0.25s; }
    .btn-secondary:hover { border-color:rgba(255,255,255,0.5); background:rgba(255,255,255,0.05); }

    /* SECTIONS */
    section { padding:100px 5%; }
    section:nth-child(even) { background:#f8f8f8; }
    .section-tag { font-size:11px; letter-spacing:2px; text-transform:uppercase; color:var(--accent); font-weight:700; margin-bottom:8px; }
    .section-title { font-size:clamp(24px,4vw,42px); font-weight:800; margin-bottom:16px; line-height:1.15; }
    .section-sub { font-size:16px; color:#666; max-width:520px; line-height:1.7; margin-bottom:48px; }

    /* CARDS GRID */
    .cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:24px; }
    .card { background:#fff; border-radius:14px; padding:32px 28px; box-shadow:0 4px 24px rgba(0,0,0,0.06); transition:all 0.3s; border:1px solid #eee; }
    .card:hover { transform:translateY(-4px); box-shadow:0 12px 40px rgba(107,107,255,0.12); border-color:rgba(107,107,255,0.3); }
    .card-icon { width:48px; height:48px; border-radius:12px; background:rgba(107,107,255,0.1); display:flex; align-items:center; justify-content:center; font-size:22px; margin-bottom:20px; }
    .card h3 { font-size:18px; font-weight:700; margin-bottom:8px; color:var(--dark); }
    .card p { font-size:14px; color:#666; line-height:1.7; }

    /* STATS */
    .stats { display:flex; justify-content:center; gap:48px; flex-wrap:wrap; padding:60px 5%; background:var(--dark); color:#fff; }
    .stat { text-align:center; }
    .stat-value { font-size:40px; font-weight:800; color:var(--accent); }
    .stat-label { font-size:13px; color:rgba(255,255,255,0.5); margin-top:4px; }

    /* CTA SECTION */
    .cta-section { background:var(--dark); text-align:center; color:#fff; padding:100px 5%; }
    .cta-section h2 { font-size:clamp(24px,4vw,48px); font-weight:800; margin-bottom:16px; }
    .cta-section h2 .highlight { color:var(--accent); }
    .cta-section p { font-size:16px; color:rgba(255,255,255,0.5); margin-bottom:32px; }

    /* FOOTER */
    footer { background:#080810; color:rgba(255,255,255,0.5); text-align:center; padding:32px 5%; font-size:13px; border-top:1px solid rgba(255,255,255,0.05); }
    footer span { color:var(--accent); font-weight:600; }

    /* DARK SECTION */
    .dark-section { background:var(--dark); color:#fff; }
    .dark-section .section-sub { color:rgba(255,255,255,0.5); }
    .dark-card { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; }
    .dark-card:hover { background:rgba(255,255,255,0.08); border-color:rgba(107,107,255,0.4); }
    .dark-card h3 { color:#fff; }
    .dark-card p { color:rgba(255,255,255,0.5); }

    /* RESPONSIVE */
    @media (max-width:768px) {
      .nav-links, .desktop-cta { display:none !important; }
      .burger { display:block !important; }
      .stats { gap:24px; }
      .stat-value { font-size:28px; }
    }

    @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(1.5); } }
    @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    .fade-up { animation:fadeUp 0.6s ease both; }
  </style>
</head>
<body>

<!-- NAV -->
<nav id="navbar">
  <a href="#hero" class="logo">UP<span>SHIFT</span></a>
  <ul class="nav-links">
    <li><a href="#servicos">Serviços</a></li>
    <li><a href="#sobre">Sobre</a></li>
    <li><a href="#contato">Contato</a></li>
  </ul>
  <a href="#contato" class="nav-cta desktop-cta">Fale Conosco</a>
  <button class="burger" onclick="document.getElementById('mm').classList.toggle('open')" aria-label="Menu">☰</button>
</nav>
<div class="mobile-menu" id="mm">
  <a href="#servicos">Serviços</a>
  <a href="#sobre">Sobre</a>
  <a href="#contato">Contato</a>
  <a href="#contato" class="nav-cta" style="text-align:center;">Fale Conosco</a>
</div>

<!-- HERO -->
<section class="hero" id="hero">
  <div class="hero-badge">Prévia gerada por IA</div>
  <h1 class="fade-up">
    ${name.slice(0,30)}<br><span class="highlight">Design Profissional</span>
  </h1>
  <p class="fade-up" style="animation-delay:0.15s">
    Layout pré-visualizado pela UPSHIFT BR. Este é um modelo inicial — o produto final terá conteúdo, funcionalidades e integrações reais sob medida para seu negócio.
  </p>
  <div class="hero-btns fade-up" style="animation-delay:0.3s">
    <a href="#contato" class="btn-primary">▸ Solicitar orçamento</a>
    <a href="#servicos" class="btn-secondary">Ver serviços</a>
  </div>
</section>

<!-- STATS -->
<div class="stats">
  <div class="stat"><div class="stat-value">+40</div><div class="stat-label">projetos entregues</div></div>
  <div class="stat"><div class="stat-value">98%</div><div class="stat-label">satisfação</div></div>
  <div class="stat"><div class="stat-value">3x</div><div class="stat-label">mais rápido</div></div>
  <div class="stat"><div class="stat-value">24h</div><div class="stat-label">tempo resposta</div></div>
</div>

<!-- SERVICES -->
<section id="servicos">
  <div class="section-tag">// o que oferecemos</div>
  <div class="section-title">${sections.slice(0,2).join(" & ")} para você</div>
  <div class="section-sub">Soluções pensadas para transformar a presença digital do seu negócio com design e funcionalidade de alto nível.</div>
  <div class="cards">
    ${sections.map((s, i) => `
    <div class="card fade-up" style="animation-delay:${i * 0.1}s">
      <div class="card-icon">${['⚡','🎯','🚀','💡'][i] || '✨'}</div>
      <h3>${s}</h3>
      <p>Serviço customizado para atender as necessidades específicas do seu negócio com qualidade e dedicação.</p>
    </div>`).join("\n")}
  </div>
</section>

<!-- ABOUT -->
<section id="sobre" class="dark-section">
  <div class="section-tag">// sobre o projeto</div>
  <div class="section-title">Feito com <span class="highlight">tecnologia real</span></div>
  <div class="section-sub">Cada projeto é construído do zero com as melhores tecnologias do mercado — Next.js, React, Node.js, PostgreSQL e infraestrutura cloud.</div>
  <div class="cards">
    <div class="dark-card card"><h3>Design Responsivo</h3><p>Funciona perfeitamente em desktop, tablet e celular.</p></div>
    <div class="dark-card card"><h3>Performance</h3><p>Otimizado para carregar rápido e bem posicionado no Google.</p></div>
    <div class="dark-card card"><h3>Manutenção</h3><p>Suporte e atualizações contínuas para manter tudo em dia.</p></div>
  </div>
</section>

<!-- CTA -->
<section class="cta-section">
  <h2>Gostou da <span class="highlight">pré-visualização</span>?</h2>
  <p>Este é apenas o começo. Converse com nossa equipe e receba uma proposta personalizada.</p>
  <a href="#contato" class="btn-primary">▸ Quero um orçamento</a>
</section>

<!-- CONTACT -->
<section id="contato">
  <div style="max-width:600px;margin:0 auto;text-align:center;">
    <div class="section-tag">// contato</div>
    <div class="section-title">Vamos <span style="color:var(--accent)">conversar</span>?</div>
    <div class="section-sub" style="margin:0 auto 32px;">Entre em contato via WhatsApp ou preencha o formulário abaixo.</div>
    <a href="https://wa.me/5598999999999" target="_blank" class="btn-primary" style="margin-bottom:24px;">💬 WhatsApp</a>
  </div>
</section>

<!-- FOOTER -->
<footer>
  © 2025 <span>UPSHIFT BR</span>. Layout gerado por IA como pré-visualização · upshiftbr.com.br
</footer>

</body>
</html>`;
}
