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
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetchContent().then(setContent);
  }, []);

  const hero = content.institucional.hero;
  const banners = hero.banners || [];
  
  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, hero.interval || 5000);
    return () => clearInterval(timer);
  }, [banners.length, hero.interval]);

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

  const currentVariant = variants[hero.animation || "fade"];

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
      <section className="py-32 bg-white overflow-hidden" id="historia">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative animate-in fade-in slide-in-from-left-12 duration-1000">
              <img 
                src={data.historia.image} 
                alt="História" 
                className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl"
              />
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#F5F7FA] -z-10" />
            </div>
            <div className="space-y-10 animate-in fade-in slide-in-from-right-12 duration-1000">
              <div className="w-16 h-px bg-[#0B3EA9]" />
              <h2 className="font-['Playfair_Display'] text-5xl text-[#041A3B]">
                {data.historia.title}
              </h2>
              <div className="space-y-8 text-[#041A3B]/80 leading-relaxed text-xl font-light whitespace-pre-line">
                {data.historia.text}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 03 — O PREMIATTO HOJE */}
      <section className="py-32 bg-[#F5F7FA]">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 space-y-10 animate-in fade-in slide-in-from-left-12 duration-1000">
              <h2 className="font-['Playfair_Display'] text-5xl text-[#041A3B] leading-tight">
                {data.hoje.title}
              </h2>
              <p className="text-[#041A3B]/80 leading-relaxed text-xl font-light">
                {data.hoje.text}
              </p>
            </div>
            <div className="order-1 lg:order-2 animate-in fade-in slide-in-from-right-12 duration-1000">
              <img 
                src={data.hoje.image} 
                alt="Hoje" 
                className="w-full aspect-video object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 04 — O QUE NOS ORIENTA */}
      <section className="py-40 bg-white">
        <div className="mx-auto max-w-[1280px] px-6">
          <h2 className="font-['Playfair_Display'] text-5xl text-[#041A3B] text-center mb-24">
            {data.orientacao.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-20">
            <div className="space-y-6">
              <h3 className="font-bold text-[#0B3EA9] uppercase tracking-[0.2em] text-[10px]">
                {data.orientacao.proposito.title}
              </h3>
              <p className="text-2xl text-[#041A3B] font-light leading-snug">
                {data.orientacao.proposito.text}
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="font-bold text-[#0B3EA9] uppercase tracking-[0.2em] text-[10px]">
                {data.orientacao.visao.title}
              </h3>
              <p className="text-2xl text-[#041A3B] font-light leading-snug">
                {data.orientacao.visao.text}
              </p>
            </div>
            <div className="space-y-8">
              <h3 className="font-bold text-[#0B3EA9] uppercase tracking-[0.2em] text-[10px]">
                {data.orientacao.principios.title}
              </h3>
              <ul className="grid grid-cols-1 gap-4">
                {data.orientacao.principios.items.map((item, i) => (
                  <li key={i} className="text-[#041A3B] flex items-center gap-3 text-lg font-light group">
                    <span className="w-1 h-1 bg-[#0B3EA9] group-hover:w-4 transition-all duration-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 05 — NOSSA FORMA DE PENSAR */}
      <section className="relative py-56 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={data.pensamento.image} 
            alt="Pensamento" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#041A3B]/85" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center text-white">
          <h2 className="font-['Playfair_Display'] text-4xl md:text-6xl mb-12 max-w-4xl mx-auto leading-tight">
            {data.pensamento.title}
          </h2>
          <p className="text-2xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
            {data.pensamento.text}
          </p>
        </div>
      </section>

      {/* SEÇÃO 06 — ESTRUTURA ORGANIZACIONAL */}
      <section className="py-40 bg-white overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
          <h2 className="font-['Playfair_Display'] text-5xl text-[#041A3B] mb-24">Estrutura Organizacional</h2>
          
          <div className="relative max-w-4xl mx-auto py-16">
            <div className="bg-[#041A3B] text-white p-8 inline-block rounded-sm mb-20 relative z-10 min-w-[280px] shadow-xl">
              <span className="font-bold tracking-[0.3em] uppercase text-[9px] block mb-2 text-white/50">Liderança</span>
              <span className="text-2xl font-['Playfair_Display']">{data.organizacional.items[0].label}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
              <div className="hidden md:block absolute top-[-80px] left-1/2 w-px h-20 bg-[#0B3EA9]/20" />
              <div className="hidden md:block absolute top-0 left-[10%] right-[10%] h-px bg-[#0B3EA9]/20" />
              
              {data.organizacional.items[0].children?.map((child, i) => (
                <div key={i} className="bg-[#F5F7FA] p-6 border border-[#041A3B]/5 hover:border-[#0B3EA9]/40 transition-all duration-500 group relative">
                  <div className="hidden md:block absolute top-[-24px] left-1/2 w-px h-6 bg-[#0B3EA9]/20" />
                  <span className="text-sm font-semibold tracking-wider text-[#041A3B] group-hover:text-[#0B3EA9] transition-colors uppercase">{child.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          <p className="mt-24 text-[#041A3B]/60 max-w-3xl mx-auto text-lg font-light leading-relaxed italic">
            "{data.organizacional.text}"
          </p>
        </div>
      </section>

      {/* SEÇÃO 07 — LIDERANÇA */}
      <section className="py-40 bg-[#F5F7FA]">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="animate-in fade-in slide-in-from-left-12 duration-1000">
              <div className="relative">
                <img 
                  src={data.lideranca.photo} 
                  alt={data.lideranca.name} 
                  className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-1000 shadow-[0_50px_100px_-20px_rgba(4,26,59,0.3)]"
                />
                <div className="absolute -bottom-8 -left-8 w-40 h-40 border border-[#0B3EA9]/20 -z-10" />
              </div>
            </div>
            <div className="space-y-12 animate-in fade-in slide-in-from-right-12 duration-1000">
              <div>
                <h2 className="font-['Playfair_Display'] text-6xl text-[#041A3B] mb-4">{data.lideranca.name}</h2>
                <p className="text-[#0B3EA9] font-bold tracking-[0.3em] uppercase text-xs">{data.lideranca.role}</p>
              </div>
              
              <p className="text-[#041A3B]/80 leading-relaxed text-xl font-light whitespace-pre-line">
                {data.lideranca.bio}
              </p>
              
              <div className="space-y-5 pt-10 border-t border-[#041A3B]/10">
                {data.lideranca.positions.map((pos, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0B3EA9] mt-2.5 flex-shrink-0" />
                    <span className="text-[#041A3B] font-medium text-lg">{pos}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 08 — DIFERENCIAIS INSTITUCIONAIS */}
      <section className="py-40 bg-white">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
          <h2 className="font-['Playfair_Display'] text-5xl text-[#041A3B] mb-24 uppercase tracking-widest">Diferenciais</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12">
            {data.diferenciais.map((diff, i) => (
              <div key={i} className="group cursor-default">
                <div className="w-px h-16 bg-[#0B3EA9]/20 mx-auto mb-8 group-hover:h-24 transition-all duration-700" />
                <span className="text-xs font-bold text-[#041A3B] uppercase tracking-[0.25em] group-hover:text-[#0B3EA9] transition-colors">{diff}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 09 — MANIFESTO */}
      <section className="py-56 bg-[#041A3B] relative overflow-hidden">
        {/* Marca d'água discreta */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none flex items-center justify-center">
           <Logo src={content.branding.logoUrl} height={800} />
        </div>
        
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="font-['Playfair_Display'] text-3xl md:text-5xl lg:text-6xl text-white/90 leading-[1.3] space-y-8 italic font-light">
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
      <section className="relative py-64 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={data.ctaFinal.image} 
            alt="CTA Background" 
            className="w-full h-full object-cover grayscale opacity-30"
          />
          <div className="absolute inset-0 bg-[#F5F7FA]/95" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center">
          <h2 className="font-['Playfair_Display'] text-6xl md:text-8xl text-[#041A3B] mb-12 opacity-90">{data.ctaFinal.title}</h2>
          <p className="text-2xl text-[#041A3B]/70 max-w-3xl mx-auto mb-16 font-light leading-relaxed">
            {data.ctaFinal.text}
          </p>
          <button className="bg-[#0B3EA9] text-white px-16 py-6 rounded-sm font-bold tracking-[0.3em] uppercase text-xs hover:bg-[#041A3B] transition-all duration-500 shadow-2xl group">
            {data.ctaFinal.ctaLabel}
            <ArrowRight className="inline-block ml-3 w-4 h-4 transition-transform group-hover:translate-x-3" />
          </button>
        </div>
      </section>

      <Footer content={content} />
    </div>
  );
}