import { Scale, FileText, Gavel, Globe, Building, FileCheck2, ArrowRight, Shield, Briefcase, Landmark, Handshake, ChevronLeft, ChevronRight } from "lucide-react";
import type { SiteContent } from "@/lib/api";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  scale: Scale,
  file: FileText,
  gavel: Gavel,
  globe: Globe,
  building: Building,
  "file-check": FileCheck2,
  shield: Shield,
  briefcase: Briefcase,
  landmark: Landmark,
  handshake: Handshake,
};

export function Garantias({ items }: { items: SiteContent["garantias"] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((emblaApi: any) => {
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="bg-surface py-20 overflow-hidden" id="garantias">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="flex-1 min-w-[300px]">
            <div className="text-[11px] tracking-[0.25em] text-brand-blue font-bold mb-4 uppercase">
              NOSSAS SOLUÇÕES EM GARANTIAS
            </div>
            <h2 className="font-display text-3xl lg:text-4xl text-navy max-w-xl leading-tight">
              Proteção e segurança para o seu negócio.
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className={`w-10 h-10 rounded-full border border-navy/10 flex items-center justify-center transition-all ${
                canScrollPrev ? "hover:bg-navy hover:text-white text-navy" : "opacity-30 text-navy/40 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className={`w-10 h-10 rounded-full border border-navy/10 flex items-center justify-center transition-all ${
                canScrollNext ? "hover:bg-navy hover:text-white text-navy" : "opacity-30 text-navy/40 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex gap-6">
            {items.map((g, idx) => {
              const Icon = iconMap[g.icon] || FileText;
              return (
                <div key={idx} className="embla__slide flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0">
                  <div className="bg-white rounded-xl p-8 h-full flex flex-col border border-navy/5 hover:shadow-xl hover:border-brand-blue/20 transition-all duration-300 group">
                    <div className="w-14 h-14 rounded-lg bg-surface flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-7 w-7 text-brand-blue stroke-[1.5]" />
                    </div>
                    
                    <h3 className="text-xl font-display text-navy mb-4 font-semibold">{g.title}</h3>
                    
                    <p className="text-muted-foreground text-[14px] leading-relaxed mb-8 flex-grow">
                      {g.description || "Solução personalizada de garantia para as necessidades da sua empresa."}
                    </p>
                    
                    <a
                      href={g.link || "#"}
                      className="inline-flex items-center gap-2 text-[12px] font-bold tracking-widest text-brand-blue uppercase group/link"
                    >
                      SAIBA MAIS 
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
