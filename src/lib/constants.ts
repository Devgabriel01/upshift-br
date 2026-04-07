export const SITE = {
  name: "UPSHIFT BR",
  slogan: "SHIFT UP. SHIP FAST.",
  tagline: "Tecnologia com Propósito",
  phone: "+55 98 9 9999-9999",
  whatsapp: "5598999999999",
  whatsappMsg: "Olá! Vim pelo site da UPSHIFT BR e quero conversar sobre um projeto.",
  email: "contato@upshiftbr.com.br",
  linkedin: "https://linkedin.com/company/upshiftbr",
  instagram: "https://instagram.com/upshiftbr",
  github: "https://github.com/upshiftbr",
};

export const STATS = [
  { value: "+40", label: "projetos entregues" },
  { value: "98%", label: "clientes satisfeitos" },
  { value: "3x",  label: "mais rápido" },
  { value: "24h", label: "tempo de resposta" },
];

export const SERVICES = [
  { id: "sistemas",    icon: "⚙️", title: "Desenvolvimento de Sistemas",  highlight: false,
    description: "Criamos sistemas sob medida para resolver os gargalos do seu negócio. APIs robustas, painéis administrativos e automações que escalam.",
    tags: ["Python", "Node.js", "REST API", "PostgreSQL"] },
  { id: "sites",       icon: "🌐", title: "Sites & Plataformas Web",       highlight: true,
    description: "Presença digital que converte. Landing pages, plataformas completas com dashboard, autenticação e pagamentos integrados.",
    tags: ["Next.js", "React", "Tailwind", "SEO"] },
  { id: "automacao",   icon: "🤖", title: "Automação & IA",                highlight: false,
    description: "Eliminamos tarefas repetitivas com fluxos inteligentes. Bots, integrações entre sistemas, RPA e IA aplicada.",
    tags: ["n8n", "Make", "OpenAI", "Python"] },
  { id: "devops",      icon: "☁️", title: "DevOps & Cloud",                highlight: false,
    description: "Infraestrutura confiável, escalável e segura. CI/CD, containers, monitoramento e deploy automatizado.",
    tags: ["Docker", "AWS", "GitHub CI", "Linux"] },
  { id: "dashboards",  icon: "📊", title: "Dashboards & Analytics",        highlight: false,
    description: "Transformamos dados brutos em decisões inteligentes. Painéis interativos e relatórios automáticos.",
    tags: ["Metabase", "D3.js", "BigQuery", "dbt"] },
  { id: "consultoria", icon: "💡", title: "Consultoria Técnica",           highlight: false,
    description: "Analisamos seu cenário, recomendamos as melhores tecnologias e criamos o roadmap antes de gastar um real.",
    tags: ["Arquitetura", "Tech Stack", "Roadmap"] },
];

export const PROJECTS = [
  { id: "fretetrack", category: "Sistema · Logística", emoji: "🚛",
    title: "FreteTrack Pro",
    description: "Plataforma de gestão de fretes com rastreamento em tempo real e integração com 8 transportadoras.",
    result: "-60% tempo de gestão · +35% satisfação",
    tags: ["Node.js", "React", "MongoDB", "WebSocket"], color: "#FF6B00" },
  { id: "contaclara", category: "Fintech · Automação", emoji: "💰",
    title: "ContaClara ERP",
    description: "Sistema financeiro com automação de cobranças via PIX e conciliação bancária automática.",
    result: "Conciliação: 2 dias → 20 min · -40% inadimplência",
    tags: ["Python", "FastAPI", "PostgreSQL", "PIX API"], color: "#FF8C00" },
  { id: "rhdigital", category: "SaaS · RH", emoji: "👥",
    title: "RH Digital 360",
    description: "SaaS completo de gestão de pessoas com onboarding digital, ponto via app e avaliações de desempenho.",
    result: "Onboarding: 5 dias → 1 dia · zero litígios",
    tags: ["Next.js", "Prisma", "Stripe", "AWS S3"], color: "#FFB347" },
];

export const PROCESS_STEPS = [
  { num: "01", title: "Diagnóstico",  desc: "Entendemos profundamente seu negócio antes de escrever uma linha de código." },
  { num: "02", title: "Arquitetura",  desc: "Projetamos a solução ideal: stack, infraestrutura, integrações e cronograma." },
  { num: "03", title: "Desenvolvimento", desc: "Sprints ágeis, entregas incrementais e comunicação constante." },
  { num: "04", title: "Launch & Suporte", desc: "Deploy seguro, treinamento da equipe e suporte contínuo pós-entrega." },
];

export const BLOG_POSTS = [
  { slug: "deploy-rapido", category: "DEVOPS",    title: "Como reduzimos o tempo de deploy de 40 minutos para 4 com GitHub Actions",  excerpt: "Pipeline de CI/CD bem configurado faz toda a diferença. Veja o que fizemos.", date: "15 mar 2025", readTime: "8 min" },
  { slug: "automatizar",   category: "AUTOMAÇÃO", title: "5 processos que toda empresa deveria automatizar em 2025",                   excerpt: "Cobranças e relatórios manuais? Você está perdendo dinheiro todo dia.", date: "08 mar 2025", readTime: "6 min" },
  { slug: "saas-vs-proprio", category: "PRODUTO", title: "SaaS vs sistema próprio: quando faz sentido construir ao invés de assinar", excerpt: "A decisão certa pode economizar dezenas de milhares por ano.", date: "01 mar 2025", readTime: "10 min" },
];

export const VALUES = [
  { icon: "⚡", title: "Inovação prática",  desc: "Tecnologia de ponta aplicada a problemas reais" },
  { icon: "🎯", title: "Foco em resultado", desc: "Código que entrega valor, não só que funciona" },
  { icon: "🔒", title: "Eficiência total",  desc: "Máximo resultado com mínimo desperdício" },
  { icon: "🚀", title: "Impacto real",      desc: "Cada linha de código tem um propósito" },
];

export const NAV_LINKS = [
  { label: "Sobre",     href: "#sobre" },
  { label: "Serviços",  href: "#servicos" },
  { label: "Projetos", href: "#github" },
  { label: "Blog",      href: "#blog" },
];

export const AI_RESPONSES: Record<string, string> = {
  "💻 Desenvolver um sistema": "Ótimo! Precisamos entender seu projeto. Qual problema você quer resolver? Me fale sobre o fluxo atual — o que é feito hoje manualmente ou de forma ineficiente.",
  "🌐 Site profissional": "Perfeito! Um site bem feito transforma seu negócio. Você precisa de landing page, site institucional ou plataforma com área de membros e dashboard?",
  "🤖 Automatizar processos": "Automação pode economizar horas por dia! Quais tarefas você faz manualmente que deveriam ser automáticas? Ex: cobranças, e-mails, relatórios, onboarding...",
  "💰 Saber os preços": "Nossos projetos são orçados sob medida — cada solução é única. Projetos começam a partir de R$ 3.000. Posso te conectar com nosso time para uma proposta sem compromisso?",
};
