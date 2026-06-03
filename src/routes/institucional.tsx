import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchContent, defaultContent, type SiteContent } from "@/lib/api";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { cn } from "@/lib/utils";
import { ChevronRight, ArrowRight, Shield, CheckCircle2, User, Landmark, Scale, ShieldCheck, FileSearch, History, Users, Award } from "lucide-react";

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
  useEffect(() => {
    fetchContent().then(setContent);
  }, []);

  const data = content.institucional;

  return (
    <div className="min-h-screen bg-[#F5F7FA]" style={{ 
      //@ts-ignore
      "--brand-primary": "#041A3B",
      "--brand-secondary": "#C5A059" 
    }}>
      <Header content={content} />

      {/* SEÇÃO 01 — HERO */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={data.hero.image} 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#041A3B]/70" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 w-full">
          <div className="max-w-2xl text-white">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8 animate-in fade-in slide-in-from-left-8 duration-1000">
              {data.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed mb-10 max-w-xl animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
              {data.hero.subtitle}
            </p>
            <button className="bg-white text-[#041A3B] px-8 py-4 rounded-sm font-medium hover:bg-white/90 transition-all animate-in fade-in slide-in-from-left-8 duration-1000 delay-400">
              {data.hero.ctaLabel}
            </button>
          </div>
        </div>
      </section>

      {/* SEÇÃO 02 — NOSSA HISTÓRIA */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative animate-in fade-in slide-in-from-left-12 duration-1000">
              <img 
                src={data.historia.image} 
                alt="História" 
                className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#F5F7FA] -z-10" />
            </div>
            <div className="space-y-8 animate-in fade-in slide-in-from-right-12 duration-1000">
              <div className="w-12 h-0.5 bg-[#0B3EA9]" />
              <h2 className="font-serif text-4xl text-[#041A3B]">
                {data.historia.title}
              </h2>
              <div className="space-y-6 text-[#041A3B]/70 leading-relaxed text-lg whitespace-pre-line">
                {data.historia.text}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 03 — O PREMIATTO HOJE */}
      <section className="py-24 bg-[#F5F7FA]">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-8 animate-in fade-in slide-in-from-left-12 duration-1000">
              <h2 className="font-serif text-4xl text-[#041A3B] leading-tight">
                {data.hoje.title}
              </h2>
              <p className="text-[#041A3B]/70 leading-relaxed text-lg">
                {data.hoje.text}
              </p>
            </div>
            <div className="order-1 lg:order-2 animate-in fade-in slide-in-from-right-12 duration-1000">
              <img 
                src={data.hoje.image} 
                alt="Hoje" 
                className="w-full aspect-video object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 04 — O QUE NOS ORIENTA */}
      <section className="py-32 bg-white">
        <div className="mx-auto max-w-[1280px] px-6">
          <h2 className="font-serif text-4xl text-[#041A3B] text-center mb-20">
            {data.orientacao.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="font-bold text-[#0B3EA9] uppercase tracking-widest text-xs">
                {data.orientacao.proposito.title}
              </h3>
              <p className="text-xl text-[#041A3B] font-light leading-snug">
                {data.orientacao.proposito.text}
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-[#0B3EA9] uppercase tracking-widest text-xs">
                {data.orientacao.visao.title}
              </h3>
              <p className="text-xl text-[#041A3B] font-light leading-snug">
                {data.orientacao.visao.text}
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="font-bold text-[#0B3EA9] uppercase tracking-widest text-xs">
                {data.orientacao.principios.title}
              </h3>
              <ul className="grid grid-cols-1 gap-3">
                {data.orientacao.principios.items.map((item, i) => (
                  <li key={i} className="text-[#041A3B] flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-[#0B3EA9] group-hover:scale-150 transition-transform" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 05 — NOSSA FORMA DE PENSAR */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={data.pensamento.image} 
            alt="Pensamento" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#041A3B]/80" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center text-white">
          <h2 className="font-serif text-3xl md:text-5xl mb-8 max-w-3xl mx-auto leading-tight">
            {data.pensamento.title}
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            {data.pensamento.text}
          </p>
        </div>
      </section>

      {/* SEÇÃO 06 — ESTRUTURA ORGANIZACIONAL */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
          <h2 className="font-serif text-4xl text-[#041A3B] mb-16">Estrutura Organizacional</h2>
          
          <div className="relative max-w-3xl mx-auto py-12">
            <div className="bg-[#041A3B] text-white p-6 inline-block rounded-sm mb-16 relative z-10 min-w-[240px]">
              <span className="font-bold tracking-widest uppercase text-xs block mb-1 text-white/60">Liderança</span>
              <span className="text-xl font-serif">{data.organizacional.items[0].label}</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative">
              <div className="absolute top-[-64px] left-1/2 w-px h-16 bg-[#0B3EA9]/30" />
              <div className="hidden md:block absolute top-0 left-[10%] right-[10%] h-px bg-[#0B3EA9]/30" />
              
              {data.organizacional.items[0].children?.map((child, i) => (
                <div key={i} className="bg-[#F5F7FA] p-4 border border-[#041A3B]/5 hover:border-[#0B3EA9]/30 transition-all group relative">
                  <div className="hidden md:block absolute top-[-12px] left-1/2 w-px h-3 bg-[#0B3EA9]/30" />
                  <span className="text-sm font-medium text-[#041A3B] group-hover:text-[#0B3EA9] transition-colors">{child.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          <p className="mt-20 text-[#041A3B]/60 max-w-2xl mx-auto leading-relaxed">
            {data.organizacional.text}
          </p>
        </div>
      </section>

      {/* SEÇÃO 07 — LIDERANÇA */}
      <section className="py-32 bg-[#F5F7FA]">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-in fade-in slide-in-from-left-12 duration-1000">
              <img 
                src={data.lideranca.photo} 
                alt="Rogério Melo" 
                className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
              />
            </div>
            <div className="space-y-10 animate-in fade-in slide-in-from-right-12 duration-1000">
              <div>
                <h2 className="font-serif text-5xl text-[#041A3B] mb-2">{data.lideranca.name}</h2>
                <p className="text-[#0B3EA9] font-bold tracking-[0.2em] uppercase text-sm">{data.lideranca.role}</p>
              </div>
              
              <p className="text-[#041A3B]/70 leading-relaxed text-lg whitespace-pre-line">
                {data.lideranca.bio}
              </p>
              
              <div className="grid md:grid-cols-1 gap-4 pt-6 border-t border-[#041A3B]/10">
                {data.lideranca.positions.map((pos, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <CheckCircle2 className="w-5 h-5 text-[#0B3EA9] mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-[#041A3B] font-medium">{pos}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 08 — DIFERENCIAIS INSTITUCIONAIS */}
      <section className="py-32 bg-white">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
          <h2 className="font-serif text-4xl text-[#041A3B] mb-20">Diferenciais Institucionais</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {data.diferenciais.map((diff, i) => (
              <div key={i} className="group cursor-default">
                <div className="w-px h-12 bg-[#0B3EA9]/20 mx-auto mb-6 group-hover:h-16 transition-all duration-500" />
                <span className="text-sm font-bold text-[#041A3B] uppercase tracking-widest group-hover:text-[#0B3EA9] transition-colors">{diff}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 09 — MANIFESTO */}
      <section className="py-40 bg-[#041A3B] relative overflow-hidden">
        {/* Marca d'água discreta */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
           <Logo src={content.branding.logoUrl} height={600} />
        </div>
        
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="font-serif text-2xl md:text-4xl lg:text-5xl text-white/90 leading-tight space-y-6">
              {data.manifesto.text.split('. ').map((sentence, i) => (
                <p key={i} className="animate-in fade-in slide-in-from-bottom-8 duration-1000" style={{ animationDelay: `${i * 300}ms` }}>
                  {sentence}{i < data.manifesto.text.split('. ').length - 1 ? '.' : ''}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 10 — CTA FINAL */}
      <section className="relative py-48">
        <div className="absolute inset-0 z-0">
          <img 
            src={data.ctaFinal.image} 
            alt="CTA Background" 
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-white/90" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center">
          <h2 className="font-serif text-5xl text-[#041A3B] mb-8">{data.ctaFinal.title}</h2>
          <p className="text-xl text-[#041A3B]/70 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            {data.ctaFinal.text}
          </p>
          <button className="bg-[#0B3EA9] text-white px-10 py-5 rounded-sm font-bold tracking-widest uppercase text-sm hover:bg-[#041A3B] transition-all group">
            {data.ctaFinal.ctaLabel}
            <ArrowRight className="inline-block ml-2 w-4 h-4 transition-transform group-hover:translate-x-2" />
          </button>
        </div>
      </section>

      <Footer content={content} />
    </div>
  );
}