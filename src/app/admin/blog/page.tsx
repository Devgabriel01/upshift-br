"use client";
import { useEffect, useState } from "react";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  status: "DRAFT" | "PUBLISHED";
  createdAt: string;
};

export default function AdminBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Post | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", category: "", readTime: "5 min", status: "DRAFT" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => { fetchPosts(); }, []);

  async function fetchPosts() {
    const res = await fetch("/api/blog");
    const data = await res.json();
    setPosts(data);
  }

  function slugify(text: string) {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value, ...(name === "title" && !editing ? { slug: slugify(value) } : {}) }));
  }

  async function handleSubmit() {
    setLoading(true);
    setMsg("");
    const url = editing ? `/api/blog/${editing.id}` : "/api/blog";
    const method = editing ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) {
      setMsg(editing ? "Artigo atualizado!" : "Artigo criado!");
      setEditing(null);
      setForm({ title: "", slug: "", excerpt: "", content: "", category: "", readTime: "5 min", status: "DRAFT" });
      fetchPosts();
    } else {
      setMsg("Erro ao salvar.");
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Deletar este artigo?")) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    fetchPosts();
  }

  function handleEdit(post: Post) {
    setEditing(post);
    setForm({ title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content, category: post.category, readTime: post.readTime, status: post.status });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const inp = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "10px 14px", color: "#fff", fontSize: "14px", width: "100%", outline: "none" } as React.CSSProperties;

  return (
    <main style={{ minHeight: "100vh", background: "#0f0f10", color: "#fff", padding: "40px 4%" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "8px" }}>
          {editing ? "Editar Artigo" : "Novo Artigo"}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: "32px", fontSize: "14px" }}>Painel de gerenciamento do blog</p>

        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "32px", marginBottom: "40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "6px" }}>Titulo</label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="Titulo do artigo" style={inp} />
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "6px" }}>Slug (URL)</label>
              <input name="slug" value={form.slug} onChange={handleChange} placeholder="meu-artigo" style={inp} />
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "6px" }}>Categoria</label>
              <input name="category" value={form.category} onChange={handleChange} placeholder="DEVOPS, AUTOMACAO..." style={inp} />
            </div>
            <div>
              <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "6px" }}>Tempo de leitura</label>
              <input name="readTime" value={form.readTime} onChange={handleChange} placeholder="5 min" style={inp} />
            </div>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "6px" }}>Resumo</label>
            <textarea name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Breve descricao do artigo..." rows={2} style={{ ...inp, resize: "vertical" }} />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "6px" }}>Conteudo</label>
            <textarea name="content" value={form.content} onChange={handleChange} placeholder="Escreva o artigo completo aqui..." rows={12} style={{ ...inp, resize: "vertical", fontFamily: "monospace" }} />
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <select name="status" value={form.status} onChange={handleChange} style={{ ...inp, width: "auto" }}>
              <option value="DRAFT">Rascunho</option>
              <option value="PUBLISHED">Publicado</option>
            </select>
            <button onClick={handleSubmit} disabled={loading} style={{ background: "#FF6B00", color: "#fff", padding: "10px 28px", borderRadius: "8px", border: "none", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>
              {loading ? "Salvando..." : editing ? "Atualizar" : "Publicar"}
            </button>
            {editing && (
              <button onClick={() => { setEditing(null); setForm({ title: "", slug: "", excerpt: "", content: "", category: "", readTime: "5 min", status: "DRAFT" }); }} style={{ background: "transparent", color: "rgba(255,255,255,0.5)", padding: "10px 20px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", fontSize: "14px" }}>
                Cancelar
              </button>
            )}
            {msg && <span style={{ color: msg.includes("Erro") ? "#ef4444" : "#10b981", fontSize: "14px" }}>{msg}</span>}
          </div>
        </div>

        <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "20px" }}>Artigos ({posts.length})</h2>
        <div style={{ display: "grid", gap: "12px" }}>
          {posts.map(post => (
            <div key={post.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                  <span style={{ fontSize: "16px", fontWeight: 700 }}>{post.title}</span>
                  <span style={{ fontSize: "11px", padding: "2px 10px", borderRadius: "100px", background: post.status === "PUBLISHED" ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.08)", color: post.status === "PUBLISHED" ? "#10b981" : "rgba(255,255,255,0.4)" }}>
                    {post.status === "PUBLISHED" ? "Publicado" : "Rascunho"}
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>{post.category} · {post.readTime} · /{post.slug}</p>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => handleEdit(post)} style={{ background: "rgba(255,107,0,0.1)", color: "#FF6B00", padding: "8px 16px", borderRadius: "8px", border: "1px solid rgba(255,107,0,0.2)", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>Editar</button>
                <button onClick={() => handleDelete(post.id)} style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", padding: "8px 16px", borderRadius: "8px", border: "1px solid rgba(239,68,68,0.2)", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>Deletar</button>
              </div>
            </div>
          ))}
          {posts.length === 0 && <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>Nenhum artigo ainda.</