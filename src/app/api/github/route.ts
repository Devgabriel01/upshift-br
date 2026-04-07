import { NextRequest, NextResponse } from "next/server";

export const revalidate = 3600; // revalida a cada 1 hora

export interface GithubRepo {
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
  fork: boolean;
  private: boolean;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username") || process.env.GITHUB_USERNAME || "upshiftbr";
  const showForks = searchParams.get("forks") === "true";

  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "UPSHIFT-BR-Site",
    };

    // Use token se disponível (aumenta rate limit de 60 para 5000 req/h)
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=50&type=public`,
      { headers, next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json({ error: "Usuário GitHub não encontrado." }, { status: 404 });
      }
      if (res.status === 403) {
        return NextResponse.json({ error: "Rate limit da API do GitHub atingido." }, { status: 429 });
      }
      return NextResponse.json({ error: "Erro ao buscar repositórios." }, { status: res.status });
    }

    const repos: GithubRepo[] = await res.json();

    // Filtra: remove forks (opcional) e repos privados
    const filtered = repos.filter((r) => {
      if (r.private) return false;
      if (!showForks && r.fork) return false;
      return true;
    });

    // Ordena: primeiro com stars, depois por data de atualização
    const sorted = filtered.sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

    return NextResponse.json({ repos: sorted, total: sorted.length }, { status: 200 });
  } catch (err) {
    console.error("[GITHUB API ERROR]", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
