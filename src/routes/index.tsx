import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchContent, defaultContent, type SiteContent } from "@/lib/api";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { BrandCards } from "@/components/site/BrandCards";
import { Stats } from "@/components/site/Stats";
import { Garantias } from "@/components/site/Garantias";
import { Capital } from "@/components/site/Capital";
import { Governanca } from "@/components/site/Governanca";
import { NewsArea } from "@/components/site/NewsArea";
import { Parceiros } from "@/components/site/Parceiros";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Garantidora Premiatto – Garantias e Soluções Financeiras" },
      {
        name: "description",
        content:
          "Estrutura, capital e segurança para operações que exigem critério e continuidade. Garantias e Premiatto Capital.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  useEffect(() => {
    fetchContent().then(setContent);
  }, []);

  return (
    <div className="min-h-screen bg-background" style={{ 
      //@ts-ignore
      "--brand-primary": content.branding.primaryColor, 
      "--brand-secondary": content.branding.secondaryColor 
    }}>
      {content.modules.header && (
        <Header 
          content={content} 
          sticky={content.modules.headerSticky} 
        />
      )}
      {content.modules.hero && <Hero hero={content.hero} />}
      {content.modules.brandCards && <BrandCards cards={content.brandCards} />}
      {content.modules.stats && <Stats stats={content.stats} />}
      {content.modules.garantias && <Garantias items={content.garantias} />}
      {content.modules.capital && <Capital data={content.capital} />}
      {content.modules.governanca && <Governanca data={content.governanca} />}
      {content.modules.news && <NewsArea news={content.news} />}
      {content.modules.parceiros && <Parceiros items={content.parceiros} />}
      {content.modules.footer && <Footer content={content} />}
    </div>
  );
}

