import Logo from "./components/Logo";

export default function Home() {
  const whatsapp =
    "https://wa.me/5598992002892?text=Olá,%20quero%20um%20orçamento";

  const services = [
    {
      title: "Criação de Sites",
      description:
        "Sites modernos, rápidos e responsivos para posicionar sua empresa com autoridade.",
    },
    {
      title: "DevOps & Infraestrutura",
      description:
        "Ambientes organizados, deploy eficiente e mais estabilidade.",
    },
    {
      title: "Automação de Processos",
      description:
        "Menos trabalho manual e mais produtividade com soluções inteligentes.",
    },
    {
      title: "Soluções Personalizadas",
      description:
        "Projetos feitos sob medida para resolver problemas reais.",
    },
  ];

  const plans = [
    {
      name: "Start",
      price: "R$ 500",
      items: ["Landing page", "Responsivo", "WhatsApp"],
      featured: false,
    },
    {
      name: "Pro",
      price: "R$ 2.000",
      items: ["Site completo", "SEO básico", "Design premium"],
      featured: true,
    },
    {
      name: "Scale",
      price: "R$ 5.000+",
      items: ["Sistema", "Automação", "Integrações"],
      featured: false,
    },
  ];

  return (
    <main className="min-h-screen bg-[#0f0f10] text-white">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f0f10]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          <Logo />

          <nav className="hidden md:flex gap-8 text-sm text-gray-300">
            <a href="#servicos" className="hover:text-white transition">
              Serviços
            </a>
            <a href="#planos" className="hover:text-white transition">
              Planos
            </a>
            <a href="#contato" className="hover:text-white transition">
              Contato
            </a>
          </nav>

          <a
            href={whatsapp}
            target="_blank"
            className="btn-premium rounded-full border border-white/15 px-4 py-2 text-sm hover:border-[#FF6A00] hover:text-[#FF6A00]"
          >
            Orçamento
          </a>

        </div>
      </header>

      {/* HERO */}
      <section className="px-6 py-28 text-center">

        <h1 className="fade-up text-4xl md:text-6xl font-semibold leading-tight">
          Soluções digitais elegantes
          <br />
          <span className="text-[#FF6A00]">para problemas reais</span>
        </h1>

        <p className="fade-up delay-1 mt-6 text-gray-400 max-w-2xl mx-auto">
          Criamos sites, automações e soluções tecnológicas para empresas que querem crescer.
        </p>

        <div className="fade-up delay-2 mt-10 flex justify-center gap-4">
          <a
            href={whatsapp}
            target="_blank"
            className="btn-premium bg-white text-black px-6 py-3 rounded-full"
          >
            Solicitar orçamento
          </a>

          <a
            href="#planos"
            className="btn-premium border border-white/20 px-6 py-3 rounded-full hover:border-white"
          >
            Ver planos
          </a>
        </div>

      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="px-6 py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

          {services.map((s) => (
            <div
              key={s.title}
              className="hover-lift p-6 border border-white/10 rounded-2xl bg-white/[0.03]"
            >
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="text-gray-400 mt-3">{s.description}</p>
            </div>
          ))}

        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="px-6 py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

          {plans.map((p) => (
            <div
              key={p.name}
              className={`hover-lift p-8 rounded-2xl border ${
                p.featured
                  ? "border-[#FF6A00] bg-white/[0.05]"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <h3 className="text-2xl font-semibold">{p.name}</h3>
              <p className="text-[#FF6A00] text-3xl mt-4">{p.price}</p>

              <ul className="mt-6 text-gray-400 space-y-2">
                {p.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>

              <a
                href={whatsapp}
                target="_blank"
                className="btn-premium block text-center mt-8 bg-white text-black py-3 rounded-full"
              >
                Escolher plano
              </a>
            </div>
          ))}

        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="px-6 py-24 text-center border-t border-white/10">

        <h2 className="fade-up text-3xl md:text-5xl font-semibold">
          Vamos levar seu negócio para o próximo nível
        </h2>

        <a
          href={whatsapp}
          target="_blank"
          className="btn-premium mt-10 inline-block bg-[#FF6A00] text-black px-8 py-4 rounded-full"
        >
          Falar no WhatsApp
        </a>

      </section>

    </main>
  );
}