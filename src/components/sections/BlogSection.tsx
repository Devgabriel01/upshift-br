"use client";

import { BLOG_POSTS } from "@/lib/constants";

export function BlogSection() {
  return (
    <section
      id="blog"
      style={{ padding: "100px 5%", background: "var(--gun-900)" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header row */}
        <div
          className="reveal"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "48px",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "2px",
                color: "var(--orange)",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "12px",
              }}
            >
              // conteúdo
            </span>
            <h2
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(28px,4vw,44px)",
                fontWeight: 700,
                lineHeight: 1.15,
              }}
            >
              Conhecimento{" "}
              <span className="gradient-text">sem filtro</span>
            </h2>
          </div>
          <a
            href="#blog"
            style={{
              fontSize: "14px",
              color: "var(--gun-300)",
              textDecoration: "none",
              border: "0.5px solid var(--gun-600)",
              borderRadius: "8px",
              padding: "10px 20px",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--orange-border)";
              e.currentTarget.style.color = "var(--orange)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--gun-600)";
              e.currentTarget.style.color = "var(--gun-300)";
            }}
          >
            Ver todos os posts →
          </a>
        </div>

        {/* Cards */}
        <div
          className="reveal stagger"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {BLOG_POSTS.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="gun-card"
              style={{
                padding: "32px",
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
              {/* Category */}
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "2px",
                  color: "var(--orange)",
                  marginBottom: "14px",
                  textTransform: "uppercase",
                }}
              >
                {post.category}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "16px",
                  fontWeight: 700,
                  marginBottom: "12px",
                  lineHeight: 1.45,
                  color: "var(--gun-100)",
                }}
              >
                {post.title}
              </h3>

              {/* Excerpt */}
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--gun-400)",
                  marginBottom: "24px",
                  lineHeight: 1.7,
                }}
              >
                {post.excerpt}
              </p>

              {/* Meta */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--gun-500)",
                  }}
                >
                  {post.date}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--gun-500)",
                  }}
                >
                  {post.readTime} leitura
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
