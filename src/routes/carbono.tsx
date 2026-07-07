import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Leaf, Sprout, Trees, Sun, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { fetchContent, type SiteContent } from "@/lib/api";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/carbono")({
  head: () => ({
    meta: [
      { title: "Crédito de Carbono e CPR Verde — Premiatto" },
      { name: "description", content: "Estruturas ambientais para empresas: crédito de carbono, CPR Verde, quotas ambientais e projetos sustentáveis com governança Premiatto." },
      { property: "og:title", content: "Crédito de Carbono e CPR Verde — Premiatto" },
      { property: "og:description", content: "Sustentabilidade como ativo estratégico. Comercialização de quotas de carbono e CPR Verde." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CarbonoPage,
});

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  leaf: Leaf, sprout: Sprout, trees: Trees, sun: Sun,
};

function CarbonoPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  useEffect(() => { fetchContent().then(setContent); }, []);

  if (!content) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const p = content.carbono.page;

  return (
    <div className="min-h-screen bg-background">
      <Header content={content} />

      <PageHero
        title={p.hero.title}
        subtitle={p.hero.subtitle}
        backgroundImage={p.hero.image}
      />

      {/* Intro */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-[1280px] px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-[11px] tracking-[0.25em] text-brand-blue font-semibold mb-4">
              {p.intro.badge}
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-navy leading-tight mb-6">
              {p.intro.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {p.intro.text}
            </p>
          </div>
          <div className="relative rounded-md overflow-hidden aspect-[4/3]">
            <img src={p.intro.image} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Soluções */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-[11px] tracking-[0.25em] text-brand-blue font-semibold mb-4">
              {p.solucoes.badge}
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-navy leading-tight max-w-2xl mx-auto">
              {p.solucoes.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {p.solucoes.items.map((item, i) => {
              const Icon = iconMap[item.icon] || Leaf;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group bg-white rounded-md p-7 border border-navy/5 hover:border-brand-blue/30 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded bg-brand-blue/10 flex items-center justify-center mb-5 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="mx-auto max-w-[1280px] px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-md overflow-hidden aspect-[4/3] order-2 lg:order-1">
            <img src={p.diferenciais.image} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="order-1 lg:order-2">
            <span className="inline-block text-[11px] tracking-[0.25em] text-brand-blue font-semibold mb-4">
              {p.diferenciais.badge}
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-navy leading-tight mb-6">
              {p.diferenciais.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {p.diferenciais.text}
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {p.diferenciais.items.map((it) => (
                <div key={it} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-blue shrink-0" />
                  <span className="text-sm text-navy">{it}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 z-0">
          <img src={p.ctaFinal.image} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-navy/70" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 py-20 lg:py-28 text-center">
          <h2 className="font-display text-3xl md:text-5xl leading-tight mb-6 max-w-3xl mx-auto">
            {p.ctaFinal.title}
          </h2>
          <p className="text-white/75 max-w-2xl mx-auto mb-8">{p.ctaFinal.text}</p>
          <Link
            to={p.ctaFinal.ctaHref}
            className="inline-flex items-center gap-3 bg-brand-blue text-brand-blue-foreground px-7 py-4 text-[12px] font-semibold tracking-wider rounded-sm hover:opacity-90 transition-opacity"
          >
            {p.ctaFinal.ctaLabel} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer content={content} />
    </div>
  );
}
