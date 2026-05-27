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
    <div className="min-h-screen bg-background">
      <Header />
      <Hero hero={content.hero} />
      <BrandCards cards={content.brandCards} />
      <Stats stats={content.stats} />
      <Garantias items={content.garantias} />
      <Capital data={content.capital} />
      <Governanca />
      <Parceiros />
      <Footer />
    </div>
  );
}
