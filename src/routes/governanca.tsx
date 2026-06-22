import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { defaultContent, fetchContent, type SiteContent } from "@/lib/api";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/governanca")({
  head: () => ({
    meta: [
      { title: "Governança — Premiatto" },
      { name: "description", content: "Governança que sustenta decisões consistentes." },
      { property: "og:title", content: "Governança — Premiatto" },
      { property: "og:description", content: "Governança que sustenta decisões consistentes." },
    ],
  }),
  component: GovernancaPage,
});

type Align = "left" | "center" | "right" | "justify";
const alignCls = (a?: Align) =>
  a === "center" ? "text-center" : a === "right" ? "text-right" : a === "justify" ? "text-justify" : "text-left";
const sz = (n?: number, fb = 16) => ({ fontSize: `${n ?? fb}px` } as const);

function GovernancaPage() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  useEffect(() => { fetchContent().then(setContent); }, []);
  const g = content.governancaPage;

  return (
    <div className="min-h-screen bg-background">
      <Header content={content} sticky={content.modules.headerSticky} />

      {/* HERO */}
      <section className="relative bg-navy text-white pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={g.hero.image} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/30" />
        </div>
        <div className="relative mx-auto max-w-[1280px] px-6">
          <h1
            className={`font-display leading-[1.05] max-w-2xl ${alignCls(g.hero.titleAlign)}`}
            style={sz(g.hero.titleSize, 56)}
          >
            {g.hero.title}
          </h1>
          <div className="h-px w-16 bg-gold my-8" />
          <p
            className={`max-w-xl text-white/80 leading-relaxed ${alignCls(g.hero.subtitleAlign)}`}
            style={sz(g.hero.subtitleSize, 14)}
          >
            {g.hero.subtitle}
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-surface">
        <div className="mx-auto max-w-[1280px] grid lg:grid-cols-2 gap-12 px-6 py-20 items-center">
          <div>
            <div className="text-[11px] tracking-[0.25em] text-brand-blue font-semibold mb-4">
              {g.intro.badge}
            </div>
            <h2
              className={`font-display text-navy leading-tight ${alignCls(g.intro.titleAlign)}`}
              style={sz(g.intro.titleSize, 32)}
            >
              {g.intro.title}
            </h2>
            <div className="h-px w-16 bg-gold my-6" />
            <p
              className={`text-muted-foreground leading-relaxed ${alignCls(g.intro.textAlign)}`}
              style={sz(g.intro.textSize, 14)}
            >
              {g.intro.text}
            </p>
          </div>
          <div className="h-[420px]">
            <img src={g.intro.image} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="text-center text-[11px] tracking-[0.25em] text-brand-blue font-semibold mb-12">
            {g.processo.badge}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-start">
            {g.processo.steps.map((s, i) => (
              <div key={i} className={`relative ${alignCls(g.processo.itemAlign)}`}>
                <div className="text-brand-blue font-display mb-4" style={sz(28)}>{s.number}</div>
                <h3 className="font-display text-navy mb-3" style={sz(g.processo.titleSize, 16)}>{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed" style={sz(g.processo.descriptionSize, 13)}>
                  {s.description}
                </p>
                {i < g.processo.steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-2 -right-6 w-5 h-5 text-muted-foreground/40" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RISCOS */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={g.riscos.image} alt="" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-[1280px] px-6 py-24 grid lg:grid-cols-2">
          <div>
            <div className="text-[11px] tracking-[0.25em] text-brand-blue-foreground font-semibold mb-4 text-gold">
              {g.riscos.badge}
            </div>
            <h2
              className={`font-display leading-tight ${alignCls(g.riscos.titleAlign)}`}
              style={sz(g.riscos.titleSize, 36)}
            >
              {g.riscos.title}
            </h2>
            <div className="h-px w-16 bg-gold my-6" />
            <p
              className={`text-white/80 leading-relaxed max-w-xl ${alignCls(g.riscos.textAlign)}`}
              style={sz(g.riscos.textSize, 14)}
            >
              {g.riscos.text}
            </p>
          </div>
        </div>
      </section>

      {/* PRINCÍPIOS */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-[1280px] px-6 grid lg:grid-cols-[1fr_2fr] gap-12">
          <div>
            <div className="text-[11px] tracking-[0.25em] text-brand-blue font-semibold mb-4">
              {g.principios.badge}
            </div>
            {g.principios.title && (
              <h2 className={`font-display text-navy ${alignCls(g.principios.titleAlign)}`} style={sz(g.principios.titleSize, 28)}>
                {g.principios.title}
              </h2>
            )}
            <p
              className={`text-muted-foreground mt-4 ${alignCls(g.principios.textAlign)}`}
              style={sz(g.principios.textSize, 13)}
            >
              {g.principios.text}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 items-center">
            {g.principios.items.map((it, i) => (
              <div key={i} className="text-navy font-display text-center py-2 border-b border-navy/10">
                {it}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={g.ctaFinal.image} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/40" />
        </div>
        <div className="relative mx-auto max-w-[1280px] px-6 py-20">
          <h2
            className={`font-display leading-tight max-w-2xl ${alignCls(g.ctaFinal.titleAlign)}`}
            style={sz(g.ctaFinal.titleSize, 36)}
          >
            {g.ctaFinal.title}
          </h2>
          <div className="h-px w-16 bg-gold my-6" />
          <p
            className={`text-white/80 max-w-xl mb-8 ${alignCls(g.ctaFinal.textAlign)}`}
            style={sz(g.ctaFinal.textSize, 14)}
          >
            {g.ctaFinal.text}
          </p>
          <a
            href={g.ctaFinal.ctaHref}
            className="inline-flex items-center gap-3 bg-gold text-navy px-8 py-4 text-[12px] tracking-widest font-semibold hover:opacity-90 transition-opacity"
          >
            {g.ctaFinal.ctaLabel}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer content={content} />
    </div>
  );
}
