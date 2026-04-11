import { BLOG_POSTS } from "@/lib/constants";
import Link from "next/link";

export default function BlogPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0f0f10", color: "#fff", padding: "120px 6% 80px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <p style={{ color: "#FF6B00", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700, marginBottom: "12px" }}>// blog</p>
        <h1 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 800, marginBottom: "16px" }}>Artigos & <span style={{ color: "#FF6B00" }}>Insights</span></h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px", marginBottom: "56px", lineHeight: 1.7 }}>Conteúdo técnico sobre desenvolvimento, automação e tecnologia.</p>
        <div style={{ display: "grid", gap: "24px" }}>
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "32px", transition: "all 0.3s", cursor: "pointer" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,107,0,0.4)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}>
                <p style={{ color: "#FF6B00", fontSize: "11px", letterSpacing: "2px", fontWeight: 700, marginBottom: "10px" }}>{post.category}</p>
                <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, marginBottom: "10px", lineHeight: 1.3 }}>{post.title}</h2>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: 1.7, marginBottom: "16px" }}>{post.excerpt}</p>
                <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime} de leitura</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}S