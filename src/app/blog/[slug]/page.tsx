import { BLOG_POSTS } from "@/lib/constants";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <main style={{ minHeight: "100vh", background: "#0f0f10", color: "#fff", padding: "120px 6% 80px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <Link href="/blog" style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "40px" }}>
          ← Voltar ao blog
        </Link>
        <p style={{ color: "#FF6B00", fontSize: "11px", letterSpacing: "2px", fontWeight: 700, marginBottom: "16px" }}>{post.category}</p>
        <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, lineHeight: 1.15, marginBottom: "20px" }}>{post.title}</h1>
        <div style={{ display: "flex", gap: "16px", fontSize: "13px", color: "rgba(255,255,255,0.35)", marginBottom: "48px", paddingBottom: "32px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime} de leitura</span>
        </div>
        <div style={{ fontSize: "17px", lineHeight: 1.85, color: "rgba(255,255,255,0.75)" }}>
          <p style={{ marginBottom: "24px" }}>{post.excerpt}</p>
          <p style={{ marginBottom: "24px" }}>Este artigo aborda em profundidade os principais conceitos e práticas relacionadas ao tema. A UPSHIFT BR aplica essas técnicas em projetos reais para entregar resultados concretos aos clientes.</p>
          <p style={{ marginBottom: "24px" }}>Se você quer implementar essas soluções no seu negócio, entre em contato com nossa equipe para uma conversa sem compromisso.</p>
        </div>
        <div style={{ marginTop: "56px", background: "rgba(255,107,0,0.08)", border: "1px solid rgba(255,107,0,0.2)", borderRadius: "16px", padding: "32px", textAlign: "center" }}>
          <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "10px" }}>Quer aplicar isso no seu negócio?</h3>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "24px", fontSize: "15px" }}>Converse com nossa equipe e descubra como podemos ajudar.</p>
          <a href="https://wa.me/5598999999999" style={{ background: "#FF6B00", color: "#fff", padding: "12px 28px", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "15px" }}>
            💬 Falar no WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}