import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "UPSHIFT BR — Desenvolvimento de Sistemas e Automação | São Luís, MA", template: "%s | UPSHIFT BR" },
  description: "Empresa de tecnologia especializada em desenvolvimento de sistemas, automação de processos e criação de sites profissionais. Atendemos empresas em todo o Brasil.",
  keywords: ["desenvolvimento de sistemas","software","automaÃ§Ã£o","devops","sites","tecnologia","brasil"],
  authors: [{ name: "UPSHIFT BR", url: "https://upshiftbr.com.br" }],
  metadataBase: new URL("https://upshiftbr.com.br"),
  openGraph: {
    type: "website", locale: "pt_BR", url: "https://upshiftbr.com.br",
    title: "UPSHIFT BR â€” Tecnologia com PropÃ³sito",
    description: "Empresa de tecnologia especializada em desenvolvimento de sistemas, automação de processos e criação de sites profissionais. Atendemos empresas em todo o Brasil.",
    siteName: "UPSHIFT BR",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#FF6B00", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

