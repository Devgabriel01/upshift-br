import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";

const SYSTEM_PROMPT = `Você é um designer web especialista em criar sites únicos e personalizados.

REGRAS ABSOLUTAS:
1. Gere SEMPRE um HTML COMPLETO e AUTÔNOMO com estilos inline e JS inline.
2. O design deve ser 100% baseado no que o cliente descreveu — negócio, setor, público.
3. NUNCA use laranja como cor principal a menos que o cliente peça explicitamente.
4. NUNCA mencione "UPSHIFT BR" em nenhuma parte do HTML gerado.
5. Crie uma identidade visual ÚNICA para o negócio do cliente:
   - Restaurante/Comida: cores quentes, fontes elegantes, imagens de comida
   - Tech/SaaS: azul, roxo, futurista, clean
   - Barbearia: escuro, dourado, masculino
   - Saúde/Clínica: verde, branco, clean, confiança
   - Moda/Beleza: rosa, moderno, elegante
   - Jurídico/Contábil: azul escuro, sério, profissional
   - Academia/Fitness: vermelho, energético, bold
6. Use fontes do Google Fonts adequadas ao setor.
7. Crie seções relevantes para o tipo de negócio (não use seções genéricas).
8. Conteúdo realista em português-BR para o negócio descrito.
9. Mobile-first e totalmente responsivo.
10. Inclua animações CSS suaves.
11. NÃO use frameworks externos. Tudo inline.
12. Responda APENAS com HTML puro. Sem markdown, sem \`\`\`html, sem texto extra.
13. O HTML deve ter DOCTYPE, html, head e body completos.
14. Crie nome fictício adequado ao negócio se o cliente não informar.`;

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
      const fallbackHtml = generateFallbackHtml(prompt);
      return NextResponse.json({ html: fallbackHtml });
    }

    const userPrompt = `Crie um site HTML completo e único para o seguinte projeto. Adapte cores, fontes, seções e conteúdo ao tipo de negócio descrito:\n\n${prompt}`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://upshiftbr.com.br",
        "X-Title": "Project Simulator",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.9,
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

function generateFallbackHtml(prompt: string): string {
  const lower = prompt.toLowerCase();

  let accentColor = "#6366f1";
  let bgDark = "#0f0f1a";
  let fontUrl = "Inter";

  if (lower.includes("restaurante") || lower.includes("pizza") || lower.includes("comida") || lower.includes("burger")) {
    accentColor = "#e85d04"; bgDark = "#1a0a00"; fontUrl = "Playfair+Display";
  } else if (lower.includes("barbear") || lower.includes("barbearia")) {
    accentColor = "#d4af37"; bgDark = "#0d0d0d"; fontUrl = "Oswald";
  } else if (lower.includes("saude") || lower.includes("saúde") || lower.includes("clinic") || lower.includes("medic")) {
    accentColor = "#10b981"; bgDark = "#f0fdf4"; fontUrl = "Inter";
  } else if (lower.includes("acade") || lower.includes("fitness") || lower.includes("gym")) {
    accentColor = "#ef4444"; bgDark = "#0a0a0a"; fontUrl = "Oswald";
  } else if (lower.includes("moda") || lower.includes("beleza") || lower.includes("estetic")) {
    accentColor = "#ec4899"; bgDark = "#1a0010"; fontUrl = "Cormorant+Garamond";
  } else if (lower.includes("tech") || lower.includes("saas") || lower.includes("software") || lower.includes("sistema")) {
    accentColor = "#6366f1"; bgDark = "#0f0f1a"; fontUrl = "Inter";
  } else if (lower.includes("advocac") || lower.includes("jur") || lower.includes("contab")) {
    accentColor = "#1e40af"; bgDark = "#0a0f1a"; fontUrl = "Merriweather";
  }

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prévia do Projeto</title>
  <link href="https://fonts.googleapis.com/css2?family=${fontUrl}:wght@300;400;600;700;800&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:'${fontUrl.replace("+", " ")}',sans-serif; background:${bgDark}; color:#fff; overflow-x:hidden; }
    :root { --accent:${accentColor}; }
    nav { position:fixed; top:0; left:0; right:0; z-index:100; padding:0 6%; height:68px; display:flex; align-items:center; justify-content:space-between; background:rgba(0,0,0,0.8); backdrop-filter:blur(12px); border-bottom:1px solid rgba(255,255,255,0.05); }
    .logo { font-weight:800; font-size:22px; color:#fff; letter-spacing:1px; }
    .logo span { color:var(--accent); }
    .nav-links { display:flex; gap:28px; list-style:none; }
    .nav-links a { color:rgba(255,255,255,0.65); text-decoration:none; font-size:14px; font-weight:500; transition:color 0.2s; }
    .nav-links a:hover { color:#fff; }
    .btn { background:var(--accent); color:#fff; padding:10px 24px; border-radius:8px; text-decoration:none; font-weight:700; font-size:14px; transition:all 0.2s; }
    .btn:hover { opacity:0.85; transform:translateY(-1px); }
    .hero { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:120px 6% 80px; background:radial-gradient(ellipse at 50% 30%, rgba(99,102,241,0.15) 0%, transparent 70%); }
    .badge { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:100px; padding:6px 18px; font-size:12px; color:rgba(255,255,255,0.6); letter-spacing:2px; text-transform:uppercase; margin-bottom:28px; }
    .hero h1 { font-size:clamp(36px,7vw,72px); font-weight:800; line-height:1.08; margin-bottom:24px; }
    .hero h1 em { color:var(--accent); font-style:normal; }
    .hero p { font-size:clamp(16px,2vw,20px); color:rgba(255,255,255,0.55); max-width:580px; line-height:1.75; margin-bottom:44px; }
    .hero-btns { display:flex; gap:16px; flex-wrap:wrap; justify-content:center; }
    .btn-outline { background:transparent; color:#fff; padding:12px 28px; border-radius:8px; text-decoration:none; font-weight:600; border:1px solid rgba(255,255,255,0.2); transition:all 0.2s; }
    .btn-outline:hover { border-color:rgba(255,255,255,0.5); }
    .btn-hero { padding:14px 36px; font-size:16px; border-radius:10px; }
    section { padding:100px 6%; }
    .section-label { font-size:11px; letter-spacing:3px; text-transform:uppercase; color:var(--accent); font-weight:700; margin-bottom:12px; }
    .section-title { font-size:clamp(28px,4vw,48px); font-weight:800; margin-bottom:16px; line-height:1.12; }
    .section-title em { color:var(--accent); font-style:normal; }
    .section-desc { font-size:16px; color:rgba(255,255,255,0.5); max-width:500px; line-height:1.75; margin-bottom:56px; }
    .grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:24px; }
    .card { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:16px; padding:36px 28px; transition:all 0.3s; }
    .card:hover { background:rgba(255,255,255,0.07); border-color:rgba(99,102,241,0.4); transform:translateY(-4px); }
    .card-icon { font-size:32px; margin-bottom:20px; }
    .card h3 { font-size:18px; font-weight:700; margin-bottom:10px; }
    .card p { font-size:14px; color:rgba(255,255,255,0.5); line-height:1.7; }
    .cta { text-align:center; background:rgba(255,255,255,0.03); border-radius:24px; padding:80px 40px; border:1px solid rgba(255,255,255,0.06); }
    .cta h2 { font-size:clamp(28px,4vw,48px); font-weight:800; margin-bottom:16px; }
    .cta p { color:rgba(255,255,255,0.5); margin-bottom:36px; font-size:16px; }
    footer { text-align:center; padding:32px 6%; border-top:1px solid rgba(255,255,255,0.05); font-size:13px; color:rgba(255,255,255,0.3); }
    @media(max-width:768px){ .nav-links,.btn{display:none;} }
  </style>
</head>
<body>
<nav>
  <div class="logo">Seu<span>Projeto</span></div>
  <ul class="nav-links">
    <li><a href="#servicos">Serviços</a></li>
    <li><a href="#sobre">Sobre</a></li>
    <li><a href="#contato">Contato</a></li>
  </ul>
  <a href="#contato" class="btn">Fale Conosco</a>
</nav>

<section class="hero">
  <div class="badge">✦ Prévia gerada por IA</div>
  <h1>Seu negócio merece<br><em>um site incrível</em></h1>
  <p>Esta é uma prévia personalizada com base no que você descreveu. O projeto final terá seu conteúdo real, cores da sua marca e todas as funcionalidades necessárias.</p>
  <div class="hero-btns">
    <a href="#contato" class="btn btn-hero">▸ Quero este projeto</a>
    <a href="#servicos" class="btn-outline btn-hero">Ver detalhes</a>
  </div>
</section>

<section id="servicos">
  <div class="section-label">// o que entregamos</div>
  <div class="section-title">Soluções <em>sob medida</em></div>
  <div class="section-desc">Cada detalhe pensado para o seu negócio e seu público.</div>
  <div class="grid">
    <div class="card"><div class="card-icon">⚡</div><h3>Design Único</h3><p>Interface criada do zero com a identidade visual do seu negócio.</p></div>
    <div class="card"><div class="card-icon">📱</div><h3>Mobile First</h3><p>Perfeito em qualquer dispositivo — celular, tablet ou desktop.</p></div>
    <div class="card"><div class="card-icon">🚀</div><h3>Alta Performance</h3><p>Carregamento rápido e bem posicionado nos buscadores.</p></div>
    <div class="card"><div class="card-icon">🔧</div><h3>Suporte Contínuo</h3><p>Acompanhamento e manutenção após o lançamento.</p></div>
  </div>
</section>

<section id="sobre">
  <div class="section-label">// sobre o projeto</div>
  <div class="section-title">Tecnologia <em>real</em><br>para seu negócio</div>
  <div class="section-desc">Desenvolvemos com as melhores tecnologias do mercado, garantindo qualidade, segurança e escalabilidade.</div>
  <div class="grid">
    <div class="card"><div class="card-icon">🎯</div><h3>Foco no Resultado</h3><p>Cada decisão de design e desenvolvimento é orientada a conversão e resultado real.</p></div>
    <div class="card"><div class="card-icon">🔒</div><h3>Segurança</h3><p>Infraestrutura moderna com HTTPS, backups automáticos e proteção de dados.</p></div>
    <div class="card"><div class="card-icon">📊</div><h3>Analytics</h3><p>Acompanhe visitantes, conversões e performance em tempo real.</p></div>
  </div>
</section>

<section id="contato">
  <div class="cta">
    <h2>Gostou da <em>prévia</em>?</h2>
    <p>Entre em contato e receba uma proposta personalizada para o seu projeto.</p>
    <a href="https://wa.me/5598999999999" class="btn btn-hero">💬 Falar no WhatsApp</a>
  </div>
</section>

<footer>© 2025 · Prévia gerada por IA · upshiftbr.com.br</footer>
</body>
</html>`;
}