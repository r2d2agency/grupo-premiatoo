import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchContent, defaultContent, type SiteContent } from "@/lib/api";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Logo } from "@/components/site/Logo";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/institucional")({
  head: () => ({
    meta: [
      { title: "Institucional – Garantidora Premiatto" },
      {
        name: "description",
        content: "Uma instituição construída sobre governança, responsabilidade e visão de longo prazo.",
      },
    ],
  }),
  component: InstitucionalPage,
});

function InstitucionalPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetchContent().then(setContent);
  }, []);


  const hero = content?.institucional.hero;
  const banners = hero?.banners || [];
  
  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, hero?.interval || 5000);
    return () => clearInterval(timer);
  }, [banners.length, hero?.interval]);

  if (!content) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const banner = banners[current] || (banners.length > 0 ? banners[0] : null);

  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { x: "100%", opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: "-100%", opacity: 0 },
    },
    zoom: {
      initial: { scale: 1.2, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.8, opacity: 0 },
    },
  };

  const currentVariant = variants[hero!.animation || "fade"];

  const data = content.institucional;


  if (!content.modules.institucional) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-navy mb-4">Módulo Institucional Desativado</h2>
          <p className="text-muted-foreground mb-8">Esta página não está disponível no momento.</p>
          <button 
            onClick={() => window.location.href = "/"}
            className="bg-navy text-white px-6 py-2 rounded-sm"
          >
            Voltar para Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]" style={{ 
      //@ts-ignore
      "--brand-primary": "#041A3B",
      "--brand-secondary": "#C5A059" 
    }}>
      <Header content={content} />

      {/* SEÇÃO 01 — HERO (Ajustada para suportar múltiplos banners como na Home) */}
      <section className="relative bg-navy text-navy-foreground h-auto min-h-[550px] md:h-[600px] lg:h-[700px] overflow-hidden">
        <AnimatePresence mode="wait">
          {banner && (
            <motion.div
              key={banner.id + current}
              initial={currentVariant.initial}
              animate={currentVariant.animate}
              exit={currentVariant.exit}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="relative md:absolute inset-0"
            >
              <div className="absolute inset-0 z-0">
                <picture className="w-full h-full">
                  {banner.imageMobile && <source media="(max-width: 767px)" srcSet={banner.imageMobile} />}
                  {banner.imageTablet && <source media="(max-width: 1023px)" srcSet={banner.imageTablet} />}
                  <img
                    src={banner.imageDesktop || banner.image}
                    alt=""
                    className="w-full h-full object-cover opacity-90"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-transparent" />
              </div>
              
              <div className="relative mx-auto max-w-[1280px] px-6 h-full flex items-center z-10 pt-24 pb-16 md:pt-0 md:pb-0">
                <div className="max-w-xl w-full text-white">
                  <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="font-display text-4xl lg:text-5xl leading-[1.1]"
                  >
                    {banner.title}
                  </motion.h1>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-6 text-sm leading-relaxed text-white/80 max-w-md font-light"
                  >
                    {banner.subtitle}
                  </motion.p>
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-12 md:mt-10"
                  >
                    <button className="inline-flex items-center justify-center gap-3 bg-brand-blue text-brand-blue-foreground px-6 py-4 md:py-3.5 text-[12px] font-semibold tracking-wider rounded-sm hover:opacity-90 w-full sm:w-auto uppercase">
                      {banner.ctaLabel} <ArrowRight className="h-4 w-4" />
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {banners.length > 1 && (
          <>
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-12 h-1 transition-all ${
                    i === current ? "bg-[#C5A059]" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + banners.length) % banners.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors z-20 hidden lg:block"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={() => setCurrent((prev) => (prev + 1) % banners.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors z-20 hidden lg:block"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </>
        )}
      </section>

      {/* SEÇÃO 02 — NOSSA HISTÓRIA */}
      <section className="bg-white overflow-hidden" id="historia">
        <div className="grid lg:grid-cols-2 items-stretch">
          <div className="relative animate-in fade-in slide-in-from-left-12 duration-1000">
            <img
              src={data.historia.image}
              alt="História"
              className="w-full h-full min-h-[400px] object-cover"
            />
          </div>
          <div className="flex items-center px-6 lg:px-16 py-16 animate-in fade-in slide-in-from-right-12 duration-1000">
            <div className="max-w-xl space-y-5">
              <h2 className="font-display text-3xl lg:text-4xl text-navy leading-tight">
                {data.historia.title}
              </h2>
              <div className="w-12 h-px bg-brand-blue" />
              <div className="text-muted-foreground leading-relaxed text-sm whitespace-pre-line">
                {data.historia.text}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 03 — O PREMIATTO HOJE */}
      <section className="bg-surface overflow-hidden">
        <div className="grid lg:grid-cols-2 items-stretch">
          <div className="order-2 lg:order-1 flex items-center justify-end px-6 lg:px-16 py-16 animate-in fade-in slide-in-from-left-12 duration-1000">
            <div className="max-w-xl space-y-5">
              <h2 className="font-display text-3xl lg:text-4xl text-navy leading-tight">
                {data.hoje.title}
              </h2>
              <div className="w-12 h-px bg-brand-blue" />
              <p className="text-muted-foreground leading-relaxed text-sm">
                {data.hoje.text}
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2 animate-in fade-in slide-in-from-right-12 duration-1000">
            <img
              src={data.hoje.image}
              alt="Hoje"
              className="w-full h-full min-h-[360px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* SEÇÃO 04 — O QUE NOS ORIENTA */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="text-[11px] tracking-[0.25em] text-brand-blue font-semibold mb-3 text-center">DIRECIONAMENTO</div>
          <h2 className="font-display text-3xl lg:text-4xl text-navy text-center mb-12 leading-tight">
            {data.orientacao.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="font-bold text-brand-blue uppercase tracking-[0.2em] text-[10px]">
                {data.orientacao.proposito.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {data.orientacao.proposito.text}
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-brand-blue uppercase tracking-[0.2em] text-[10px]">
                {data.orientacao.visao.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {data.orientacao.visao.text}
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-brand-blue uppercase tracking-[0.2em] text-[10px]">
                {data.orientacao.principios.title}
              </h3>
              <ul className="grid grid-cols-1 gap-3">
                {data.orientacao.principios.items.map((item, i) => (
                  <li key={i} className="text-muted-foreground flex items-center gap-3 text-sm group">
                    <span className="w-1 h-1 bg-brand-blue group-hover:w-4 transition-all duration-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO 05 — NOSSA FORMA DE PENSAR */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={data.pensamento.image}
            alt="Pensamento"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/30" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-white">
          <div className="max-w-xl space-y-5">
            <h2 className="font-display text-3xl lg:text-4xl leading-tight">
              {data.pensamento.title}
            </h2>
            <div className="w-12 h-px bg-brand-blue" />
            <p className="text-sm text-white/70 leading-relaxed">
              {data.pensamento.text}
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 06 — ESTRUTURA ORGANIZACIONAL */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-center">
            <div className="space-y-5">
              <h2 className="font-display text-3xl lg:text-4xl text-navy leading-tight">
                Uma estrutura construída sobre especialização.
              </h2>
              <div className="w-12 h-px bg-brand-blue" />
              <p className="text-muted-foreground text-sm leading-relaxed">
                {data.organizacional.text}
              </p>
            </div>

            <div className="relative py-8">
              <div className="bg-navy text-white px-6 py-3 inline-block rounded-sm mb-12 relative z-10 min-w-[200px] text-center shadow-xl mx-auto block w-fit">
                <span className="font-semibold tracking-[0.2em] uppercase text-[11px]">{data.organizacional.items[0].label}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 relative">
                <div className="hidden md:block absolute top-[-48px] left-1/2 w-px h-12 bg-navy/20" />
                <div className="hidden md:block absolute top-0 left-[10%] right-[10%] h-px bg-navy/20" />

                {data.organizacional.items[0].children?.map((child, i) => (
                  <div key={i} className="bg-white border border-navy/20 px-3 py-3 text-center hover:border-brand-blue transition-all duration-500 group relative">
                    <div className="hidden md:block absolute top-[-12px] left-1/2 w-px h-3 bg-navy/20" />
                    <span className="text-[10px] font-semibold tracking-wider text-navy group-hover:text-brand-blue transition-colors uppercase">{child.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 07 — LIDERANÇA */}
      <section className="bg-surface overflow-hidden">
        <div className="grid lg:grid-cols-[1fr_1fr_1fr] items-stretch">
          <div className="animate-in fade-in slide-in-from-left-12 duration-1000">
            <img
              src={data.lideranca.photo}
              alt={data.lideranca.name}
              className="w-full h-full min-h-[400px] object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-6 lg:px-12 py-12 space-y-5 animate-in fade-in duration-1000">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl text-navy mb-2 leading-tight">{data.lideranca.name}</h2>
              <p className="text-brand-blue font-semibold tracking-wider text-[12px]">{data.lideranca.role}</p>
            </div>
            <div className="w-12 h-px bg-brand-blue" />
            <p className="text-muted-foreground leading-relaxed text-sm whitespace-pre-line">
              {data.lideranca.bio}
            </p>
          </div>
          <div className="flex flex-col justify-center px-6 lg:px-12 py-12 space-y-5 animate-in fade-in slide-in-from-right-12 duration-1000">
            {data.lideranca.positions.map((pos, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-px bg-brand-blue mt-2 flex-shrink-0" />
                <span className="text-navy text-[11px] font-semibold tracking-[0.15em] uppercase leading-relaxed">{pos}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 08 — DIFERENCIAIS INSTITUCIONAIS */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
          <div className="text-[11px] tracking-[0.25em] text-brand-blue font-semibold mb-3">DIFERENCIAIS</div>
          <h2 className="font-display text-3xl lg:text-4xl text-navy mb-12 leading-tight">Diferenciais Institucionais</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {data.diferenciais.map((diff, i) => (
              <div key={i} className="group cursor-default">
                <div className="w-px h-12 bg-brand-blue/20 mx-auto mb-6 group-hover:h-20 transition-all duration-700" />
                <span className="text-[11px] font-bold text-navy uppercase tracking-[0.25em] group-hover:text-brand-blue transition-colors">{diff}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 09 — MANIFESTO */}
      <section className="py-16 bg-navy-deep relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none flex items-center justify-center">
           <Logo src={content.branding.logoUrl} height={500} />
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="font-display text-lg md:text-xl lg:text-2xl text-white/90 leading-[1.5] space-y-4 italic font-light">
              {data.manifesto.text.split('. ').map((sentence, i) => (
                <p key={i} className="animate-in fade-in slide-in-from-bottom-8 duration-1000" style={{ animationDelay: `${i * 400}ms` }}>
                  {sentence}{i < data.manifesto.text.split('. ').length - 1 ? '.' : ''}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 10 — CTA FINAL */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={data.ctaFinal.image}
            alt="CTA Background"
            className="w-full h-full object-cover grayscale opacity-30"
          />
          <div className="absolute inset-0 bg-surface/95" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center">
          <h2 className="font-display text-2xl lg:text-3xl text-navy mb-4 leading-tight">{data.ctaFinal.title}</h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6 leading-relaxed">
            {data.ctaFinal.text}
          </p>
          <button className="bg-brand-blue text-brand-blue-foreground px-8 py-3 rounded-sm font-semibold tracking-wider uppercase text-[12px] hover:opacity-90 transition-all duration-500 shadow-xl group">
            {data.ctaFinal.ctaLabel}
            <ArrowRight className="inline-block ml-3 w-4 h-4 transition-transform group-hover:translate-x-2" />
          </button>
        </div>
      </section>

      <Footer content={content} />
    </div>
  );
}