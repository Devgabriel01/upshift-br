import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "UPSHIFT BR | Sites e Automação",
  description:
    "Criação de sites, automação e soluções tecnológicas para empresas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-[#0f0f10] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}