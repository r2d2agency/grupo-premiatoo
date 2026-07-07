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
      <section className="bg-background py-24 relative overflow-hidden">
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent hidden lg:block" />
        <div className="mx-auto max-w-[1280px] px-6 relative">
          <div className="text-center text-[11px] tracking-[0.25em] text-brand-blue font-semibold mb-3">
            {g.processo.badge}
          </div>
          <div className="h-px w-16 bg-gold mx-auto mb-14" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-10 items-stretch">
            {g.processo.steps.map((s, i) => (
              <div key={i} className="relative group">
                <div
                  className={`relative h-full bg-white border border-navy/10 p-6 transition-all duration-500 ease-out
                    hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(10,25,60,0.25)]
                    hover:border-brand-blue/40 ${alignCls(g.processo.itemAlign)}`}
                >
                  <div className="absolute -top-4 left-6 flex items-center justify-center w-10 h-10 bg-navy text-gold font-display text-sm rounded-full shadow-md transition-all duration-500 group-hover:bg-brand-blue group-hover:scale-110 group-hover:rotate-[8deg]">
                    {s.number}
                  </div>
                  <div className="mt-4">
                    <h3
                      className="font-display text-navy mb-3 transition-colors duration-300 group-hover:text-brand-blue"
                      style={sz(g.processo.titleSize, 16)}
                    >
                      {s.title}
                    </h3>
                    <p
                      className="text-muted-foreground leading-relaxed"
                      style={sz(g.processo.descriptionSize, 13)}
                    >
                      {s.description}
                    </p>
                  </div>
                  <div className="absolute left-0 bottom-0 h-[2px] w-0 bg-gold transition-all duration-500 ease-out group-hover:w-full" />
                </div>

                {i < g.processo.steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 items-center justify-center pointer-events-none">
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      <span className="absolute inset-0 rounded-full bg-brand-blue/0 group-hover:bg-brand-blue/10 transition-colors duration-500" />
                      <ArrowRight
                        className="w-5 h-5 text-navy/30 transition-all duration-500 ease-out
                          group-hover:text-brand-blue group-hover:translate-x-2 group-hover:scale-125"
                      />
                      <ArrowRight
                        className="absolute w-5 h-5 text-brand-blue opacity-0 -translate-x-2
                          group-hover:opacity-60 group-hover:translate-x-4 transition-all duration-700 ease-out"
                      />
                    </div>
                  </div>
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
