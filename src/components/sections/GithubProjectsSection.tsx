"use client";

import { useState, useEffect, useMemo } from "react";
import { Star, GitFork, ExternalLink, GitBranch, RefreshCw, Search, Code2 } from "lucide-react";

interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
}

// Cores das linguagens (baseado no github-colors)
const LANG_COLORS: Record<string, string> = {
  TypeScript:  "#3178C6",
  JavaScript:  "#F1E05A",
  Python:      "#3572A5",
  Rust:        "#DEA584",
  Go:          "#00ADD8",
  Java:        "#B07219",
  "C#":        "#178600",
  "C++":       "#F34B7D",
  C:           "#555555",
  PHP:         "#4F5D95",
  Ruby:        "#701516",
  Swift:       "#FA7343",
  Kotlin:      "#A97BFF",
  Dart:        "#00B4AB",
  HTML:        "#E34C26",
  CSS:         "#563D7C",
  Shell:       "#89E051",
  Vue:         "#41B883",
  Svelte:      "#FF3E00",
  Dockerfile:  "#384D54",
};

function LanguageDot({ lang }: { lang: string }) {
  const color = LANG_COLORS[lang] || "#8892A8";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "var(--gun-300)" }}>
      <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: color, display: "inline-block", flexShrink: 0 }} />
      {lang}
    </span>
  );
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "hoje";
  if (days === 1) return "ontem";
  if (days < 30) return `${days}d atrás`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}m atrás`;
  return `${Math.floor(months / 12)}a atrás`;
}

function RepoCard({ repo }: { repo: Repo }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "var(--gun-800)" : "var(--gun-900)",
        border: `0.5px solid ${hovered ? "rgba(255,107,0,0.3)" : "var(--gun-600)"}`,
        borderRadius: "12px",
        padding: "24px",
        transition: "all 0.25s",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? "0 8px 32px rgba(255,107,0,0.12)" : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent bar on hover */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: "linear-gradient(90deg, var(--orange), var(--orange-bright))",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.25s",
      }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
          <Code2 size={16} color="var(--orange)" style={{ flexShrink: 0 }} />
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "15px",
              fontWeight: 700,
              color: hovered ? "var(--orange)" : "var(--gun-100)",
              textDecoration: "none",
              transition: "color 0.2s",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {repo.name}
          </a>
        </div>

        {/* External links */}
        <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
            title="Ver no GitHub"
            style={{ color: "var(--gun-400)", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gun-400)")}
          >
            <GitBranch size={15} />
          </a>
          {repo.homepage && (
            <a href={repo.homepage} target="_blank" rel="noopener noreferrer"
              title="Ver deploy"
              style={{ color: "var(--gun-400)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gun-400)")}
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontSize: "13px",
        color: "var(--gun-400)",
        lineHeight: 1.6,
        flex: 1,
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        minHeight: "40px",
      }}>
        {repo.description || "Sem descrição"}
      </p>

      {/* Topics */}
      {repo.topics.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {repo.topics.slice(0, 4).map((t) => (
            <span key={t} style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              padding: "2px 8px",
              borderRadius: "100px",
              background: "rgba(255,107,0,0.08)",
              border: "0.5px solid rgba(255,107,0,0.2)",
              color: "var(--orange-bright)",
            }}>
              {t}
            </span>
          ))}
          {repo.topics.length > 4 && (
            <span style={{ fontSize: "10px", color: "var(--gun-500)", padding: "2px 4px" }}>
              +{repo.topics.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Footer: language + stars + forks + date */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        paddingTop: "12px",
        borderTop: "0.5px solid var(--gun-700)",
        flexWrap: "wrap",
      }}>
        {repo.language && <LanguageDot lang={repo.language} />}

        <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--gun-400)" }}>
          <Star size={12} />
          <span>{repo.stargazers_count}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--gun-400)" }}>
          <GitFork size={12} />
          <span>{repo.forks_count}</span>
        </div>

        <span style={{ fontSize: "11px", color: "var(--gun-500)", marginLeft: "auto" }}>
          {timeAgo(repo.updated_at)}
        </span>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div style={{
      background: "var(--gun-900)",
      border: "0.5px solid var(--gun-700)",
      borderRadius: "12px",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    }}>
      {[70, 100, 50, 40].map((w, i) => (
        <div key={i} style={{
          height: i === 0 ? "16px" : i === 1 ? "36px" : "12px",
          width: `${w}%`,
          background: "var(--gun-800)",
          borderRadius: "4px",
          animation: "shimmer 1.5s infinite",
        }} />
      ))}
      <style>{`
        @keyframes shimmer {
          0%,100% { opacity: 0.5; }
          50%      { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

const ALL_LANGS = "Todas";

export function GithubProjectsSection({ username }: { username: string }) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeLang, setActiveLang] = useState(ALL_LANGS);
  const [showForks, setShowForks] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 9;

  async function fetchRepos() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/github?username=${username}&forks=${showForks}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao buscar repositórios");
      setRepos(data.repos);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchRepos(); }, [username, showForks]);

  // Collect unique languages
  const languages = useMemo(() => {
    const langs = repos
      .map((r) => r.language)
      .filter((l): l is string => !!l);
    return [ALL_LANGS, ...Array.from(new Set(langs))];
  }, [repos]);

  // Filter
  const filtered = useMemo(() => {
    return repos.filter((r) => {
      const matchSearch =
        !search ||
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        (r.description || "").toLowerCase().includes(search.toLowerCase()) ||
        r.topics.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchLang = activeLang === ALL_LANGS || r.language === activeLang;
      return matchSearch && matchLang;
    });
  }, [repos, search, activeLang]);

  const paginated = filtered.slice(0, page * PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  // Reset page on filter change
  useEffect(() => setPage(1), [search, activeLang]);

  return (
    <section id="github" style={{ padding: "100px 5%", background: "var(--gun-950)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <div className="reveal" style={{ marginBottom: "48px" }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "2px",
            color: "var(--orange)", textTransform: "uppercase", display: "block", marginBottom: "12px",
          }}>
            // open source
          </span>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, lineHeight: 1.15, marginBottom: "12px" }}>
                Projetos no <span className="gradient-text">GitHub</span>
              </h2>
              <p style={{ fontSize: "16px", color: "var(--gun-300)", lineHeight: 1.7 }}>
                Repositórios públicos em tempo real via{" "}
                <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer"
                  style={{ color: "var(--orange)", textDecoration: "none" }}>
                  @{username}
                </a>
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {/* Forks toggle */}
              <button
                onClick={() => setShowForks(!showForks)}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  background: showForks ? "rgba(255,107,0,0.12)" : "var(--gun-900)",
                  border: `0.5px solid ${showForks ? "rgba(255,107,0,0.4)" : "var(--gun-600)"}`,
                  borderRadius: "8px", padding: "8px 14px",
                  fontSize: "13px", color: showForks ? "var(--orange)" : "var(--gun-300)",
                  cursor: "pointer", transition: "all 0.2s", fontFamily: "var(--font-sans)",
                }}
              >
                <GitFork size={13} />
                Forks
              </button>

              {/* Refresh */}
              <button
                onClick={fetchRepos}
                disabled={loading}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  background: "var(--gun-900)", border: "0.5px solid var(--gun-600)",
                  borderRadius: "8px", padding: "8px 14px",
                  fontSize: "13px", color: "var(--gun-300)", cursor: "pointer",
                  transition: "all 0.2s", fontFamily: "var(--font-sans)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--orange-border)"; e.currentTarget.style.color = "var(--orange)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--gun-600)"; e.currentTarget.style.color = "var(--gun-300)"; }}
              >
                <RefreshCw size={13} style={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
                Atualizar
              </button>

              {/* GitHub profile link */}
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  background: "var(--orange)", color: "#fff",
                  borderRadius: "8px", padding: "8px 16px",
                  fontSize: "13px", fontWeight: 600, textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--orange-bright)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--orange)")}
              >
                <GitBranch size={14} />
                Ver perfil
              </a>
            </div>
          </div>
        </div>

        {/* Search + language filters */}
        <div className="reveal" style={{ marginBottom: "32px", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          {/* Search */}
          <div style={{ position: "relative", flex: "1", minWidth: "200px" }}>
            <Search size={14} style={{
              position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)",
              color: "var(--gun-400)", pointerEvents: "none",
            }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar repositório..."
              style={{
                width: "100%",
                background: "var(--gun-900)",
                border: "0.5px solid var(--gun-700)",
                borderRadius: "8px",
                padding: "10px 16px 10px 36px",
                color: "var(--gun-100)",
                fontSize: "13px",
                fontFamily: "var(--font-sans)",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => { e.target.style.borderColor = "var(--orange)"; e.target.style.boxShadow = "0 0 0 3px rgba(255,107,0,0.1)"; }}
              onBlur={(e) => { e.target.style.borderColor = "var(--gun-700)"; e.target.style.boxShadow = "none"; }}
            />
          </div>

          {/* Language pills */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {languages.map((lang) => {
              const active = activeLang === lang;
              const color = lang !== ALL_LANGS ? LANG_COLORS[lang] || "#8892A8" : "var(--orange)";
              return (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    background: active ? "rgba(255,107,0,0.12)" : "var(--gun-900)",
                    border: `0.5px solid ${active ? "rgba(255,107,0,0.4)" : "var(--gun-700)"}`,
                    borderRadius: "100px", padding: "5px 12px",
                    fontSize: "12px", fontFamily: "var(--font-mono)",
                    color: active ? "var(--orange)" : "var(--gun-300)",
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                >
                  {lang !== ALL_LANGS && (
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, display: "inline-block" }} />
                  )}
                  {lang}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stats bar */}
        {!loading && !error && (
          <div className="reveal" style={{
            display: "flex", gap: "24px", marginBottom: "28px",
            fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--gun-400)",
          }}>
            <span>{repos.length} repositórios</span>
            {filtered.length !== repos.length && <span>· {filtered.length} filtrados</span>}
            <span style={{ marginLeft: "auto" }}>
              {repos.filter((r) => r.stargazers_count > 0).reduce((s, r) => s + r.stargazers_count, 0)} ★ total
            </span>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div style={{
            background: "rgba(255,80,80,0.08)", border: "0.5px solid rgba(255,80,80,0.25)",
            borderRadius: "10px", padding: "24px", textAlign: "center", color: "#ff6b6b",
            fontFamily: "var(--font-mono)", fontSize: "14px",
          }}>
            ⚠ {error}
            <button onClick={fetchRepos} style={{
              display: "block", margin: "12px auto 0",
              background: "none", border: "0.5px solid rgba(255,80,80,0.4)",
              borderRadius: "6px", padding: "6px 16px",
              color: "#ff6b6b", cursor: "pointer", fontSize: "12px", fontFamily: "var(--font-mono)",
            }}>
              Tentar novamente
            </button>
          </div>
        )}

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "16px",
        }}>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : paginated.map((repo) => <RepoCard key={repo.id} repo={repo} />)
          }
        </div>

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--gun-500)" }}>
            <GitBranch size={40} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "14px" }}>
              Nenhum repositório encontrado{search ? ` para "${search}"` : ""}.
            </p>
          </div>
        )}

        {/* Load more */}
        {!loading && hasMore && (
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <button
              onClick={() => setPage((p) => p + 1)}
              style={{
                background: "var(--gun-900)", border: "0.5px solid var(--gun-600)",
                borderRadius: "10px", padding: "12px 32px",
                fontSize: "14px", color: "var(--gun-200)", cursor: "pointer",
                fontFamily: "var(--font-sans)", fontWeight: 500, transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--orange-border)"; e.currentTarget.style.color = "var(--orange)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--gun-600)"; e.currentTarget.style.color = "var(--gun-200)"; }}
            >
              Carregar mais ({filtered.length - paginated.length} restantes)
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
