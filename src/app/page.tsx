import { Navbar }                 from "@/components/layout/Navbar";
import { Footer }                 from "@/components/layout/Footer";
import { HeroSection }            from "@/components/sections/HeroSection";
import { ServicesSection }        from "@/components/sections/ServicesSection";
import { AboutSection }           from "@/components/sections/AboutSection";
import { ProcessSection }         from "@/components/sections/ProcessSection";
import { GithubProjectsSection }  from "@/components/sections/GithubProjectsSection";
import { BlogSection }            from "@/components/sections/BlogSection";
import { CtaSection }             from "@/components/sections/CtaSection";
import { ContactSection }         from "@/components/sections/ContactSection";
import { AIWidget }               from "@/components/AIWidget";
import { ScrollRevealInit }       from "@/components/ScrollRevealInit";
import { SITE }                   from "@/lib/constants";

// Extrai username do link do GitHub definido em constants.ts
const GITHUB_USERNAME = SITE.github.replace("https://github.com/", "");

export default function Home() {
  return (
    <>
      <ScrollRevealInit />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ProcessSection />
        <GithubProjectsSection username={GITHUB_USERNAME} />
        <BlogSection />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
      <AIWidget />
    </>
  );
}
