# UPSHIFT BR — Site Institucional

> **Next.js 15 · TypeScript · Tailwind CSS**  
> Paleta: **Laranja Neon `#FF6B00` + Chumbo `#0C0D0F`**  
> Build: **✓ Compilado e verificado**

---

## 🚀 Início rápido

```bash
npm install
npm run dev      # → http://localhost:3000
npm run build    # build de produção
npm start        # servidor de produção
```

---

## 📁 Estrutura

```
src/
├── app/
│   ├── layout.tsx              # Root layout + SEO + Schema.org
│   ├── page.tsx                # Home — monta todas as sections
│   ├── globals.css             # CSS vars, utilitários, reveal
│   └── api/
│       ├── contato/route.ts    # POST formulário de contato
│       └── newsletter/route.ts # POST captação de e-mail
├── components/
│   ├── ui/
│   │   ├── Logo.tsx            # LogoIcon + LogoFull
│   │   └── Button.tsx          # primary | secondary | ghost
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky nav + menu mobile
│   │   └── Footer.tsx          # Grid 4 colunas
│   ├── sections/
│   │   ├── HeroSection.tsx     # Hero com dot grid + stats
│   │   ├── ServicesSection.tsx # Grid 6 serviços
│   │   ├── AboutSection.tsx    # Terminal animado + valores
│   │   ├── ProcessSection.tsx  # 4 etapas
│   │   ├── ProjectsSection.tsx # 3 cases com resultado
│   │   ├── BlogSection.tsx     # Preview 3 posts
│   │   ├── CtaSection.tsx      # Banner WhatsApp + proposta
│   │   └── ContactSection.tsx  # Form com validação + links
│   ├── AIWidget.tsx            # Bot "Shift" flutuante
│   └── ScrollRevealInit.tsx    # IntersectionObserver hook
└── lib/
    ├── constants.ts            # Todos os dados do site
    └── useScrollReveal.ts      # Hook de scroll reveal
```

---

## 🎨 Design System

| CSS Var | Hex | Uso |
|---------|-----|-----|
| `--orange` | `#FF6B00` | CTA, destaques, logo |
| `--orange-bright` | `#FF8C2A` | Hover states |
| `--gun-950` | `#0C0D0F` | Background principal |
| `--gun-900` | `#111318` | Cards |
| `--gun-800` | `#181B22` | Superfície hover |
| `--gun-600` | `#2C3240` | Bordas padrão |
| `--gun-300` | `#8892A8` | Texto corpo |
| `--gun-100` | `#E0E4EE` | Texto principal |

**Fontes:** IBM Plex Mono (display) · Syne (corpo)

**Classes globais:** `.gradient-text` · `.gun-card` · `.tag` · `.reveal` · `.stagger`

---

## 🔌 Configurar integrações (`src/lib/constants.ts`)

```ts
export const SITE = {
  whatsapp: "5598999999999",  // ← Trocar pelo número real
  email:    "contato@upshiftbr.com.br",
  // ...
};
```

### Formulário de contato (`src/app/api/contato/route.ts`)

```ts
// Opção A — Resend (e-mail)
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
await resend.emails.send({ from, to, subject, html });

// Opção B — Webhook n8n / Make
await fetch(process.env.WEBHOOK_URL!, { method: "POST", body: JSON.stringify(body) });
```

### `.env.local`
```env
RESEND_API_KEY=re_xxxxxxxxxxxx
WEBHOOK_URL=https://n8n.suaempresa.com/webhook/contato
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## ☁️ Deploy — Vercel

```bash
npm i -g vercel
vercel --prod
```

Ou conecte o repositório em **vercel.com/new** e configure as env vars.

---

## ✅ Checklist pré-lançamento

- [ ] Trocar `SITE.whatsapp` pelo número real
- [ ] Configurar e-mail em `SITE.email`
- [ ] Adicionar `og-image.png` (1200×630px) em `public/`
- [ ] Ativar integração do formulário de contato
- [ ] Configurar Google Analytics 4
- [ ] Apontar domínio → Vercel
- [ ] Testar PageSpeed Insights (meta: 90+)
- [ ] Testar em mobile, tablet e desktop
- [ ] Submeter sitemap no Search Console

---

*UPSHIFT BR — SHIFT UP. SHIP FAST.*
