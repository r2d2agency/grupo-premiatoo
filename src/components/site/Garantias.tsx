import { Scale, FileText, Gavel, Globe, Building, FileCheck2, ArrowRight, Shield, Briefcase, Landmark, Handshake, ChevronLeft, ChevronRight } from "lucide-react";
import type { SiteContent } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

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
  const columnsCount = items[0]?.columns || 4;
  const scrollStep = items[0]?.scrollStep || 1;
  const layoutStyle = items[0]?.layout || "card";
  const headerAlign = items[0]?.headerAlign || "left";
  const cardAlign = items[0]?.cardAlign || "left";
  const alignClass = cardAlign === "center" ? "text-center items-center" : cardAlign === "right" ? "text-right items-end" : cardAlign === "justify" ? "text-justify items-stretch" : "text-left items-start";
  const headerWrapClass = headerAlign === "center" ? "justify-center text-center" : headerAlign === "right" ? "justify-end text-right" : headerAlign === "justify" ? "text-justify" : "";
  const headerInnerClass = headerAlign === "center" ? "mx-auto" : headerAlign === "right" ? "ml-auto" : "";

  const trackRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (!trackRef.current) return;
      const firstCard = trackRef.current.firstElementChild as HTMLElement | null;
      if (firstCard) {
        const gap = 24;
        const style = window.getComputedStyle(trackRef.current);
        const gapValue = parseFloat(style.gap) || gap;
        setCardWidth(firstCard.getBoundingClientRect().width + gapValue);
      }
    };
    const ro = new ResizeObserver(updateWidth);
    if (trackRef.current) ro.observe(trackRef.current);
    updateWidth();
    return () => ro.disconnect();
  }, []);

  const canScrollPrev = scrollPosition > 0;
  const canScrollNext = scrollPosition + columnsCount < items.length;

  const scrollPrev = useCallback(() => {
    setScrollPosition((prev) => Math.max(0, prev - scrollStep));
  }, [scrollStep]);

  const scrollNext = useCallback(() => {
    setScrollPosition((prev) => {
      const max = Math.max(0, items.length - columnsCount);
      return Math.min(max, prev + scrollStep);
    });
  }, [scrollStep, columnsCount, items.length]);

  return (
    <section className="bg-surface py-20 overflow-hidden" id="garantias">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className={cn("flex flex-wrap items-end gap-6 mb-12", headerWrapClass || "justify-between")}>
          <div className={cn("flex-1 min-w-[300px]", headerInnerClass)}>
            <div className="text-[11px] tracking-[0.25em] text-brand-blue font-bold mb-4 uppercase">
              NOSSAS SOLUÇÕES EM GARANTIAS
            </div>
            <h2 className={cn("font-display text-3xl lg:text-4xl text-navy max-w-xl leading-tight", headerAlign === "center" && "mx-auto", headerAlign === "right" && "ml-auto")}>
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

        <div className="overflow-hidden">
          <div 
            ref={trackRef}
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${scrollPosition * cardWidth}px)` }}
          >
            {items.map((g, idx) => {
              const Icon = iconMap[g.icon] || FileText;
              return (
                <div 
                  key={idx} 
                  className={cn(
                    "embla__slide min-w-0 transition-all duration-300",
                    columnsCount === 3 ? "flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_31%]" :
                    columnsCount === 4 ? "flex-[0_0_85%] md:flex-[0_0_40%] lg:flex-[0_0_23%]" :
                    columnsCount === 5 ? "flex-[0_0_85%] md:flex-[0_0_30%] lg:flex-[0_0_18.5%]" :
                    "flex-[0_0_85%] md:flex-[0_0_40%] lg:flex-[0_0_23%]"
                  )}
                >
                  {layoutStyle === "minimal" ? (
                    <div className={cn("bg-white/50 backdrop-blur-sm rounded-lg p-5 h-full flex flex-col border border-navy/5 hover:border-brand-blue/40 transition-all duration-500 group", alignClass)}>
                      <div className={cn("flex items-center gap-3 mb-3", cardAlign === "center" && "justify-center", cardAlign === "right" && "justify-end")}>
                        <div className="w-10 h-10 rounded bg-brand-blue/10 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-sm font-bold text-navy leading-tight">{g.title}</h3>
                      </div>
                      <p className="text-[12px] text-muted-foreground leading-snug line-clamp-3 mb-4 flex-grow">
                        {g.description}
                      </p>
                      <Link 
                        to="/garantias/$garantiaId" 
                        params={{ garantiaId: g.id || g.title.toLowerCase().replace(/\s+/g, '-') }} 
                        className="text-[10px] font-bold tracking-widest text-brand-blue uppercase flex items-center gap-1 group/link"
                      >
                        VER DETALHES <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  ) : (
                    <div className={cn("bg-white rounded-lg p-6 h-full flex flex-col border border-navy/5 hover:shadow-xl hover:border-brand-blue/30 transition-all duration-500 group relative overflow-hidden", alignClass)}>
                      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-bl-full -mr-10 -mt-10 group-hover:bg-brand-blue/10 transition-colors duration-500" />
                      
                      <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-navy/5 shadow-sm">
                        <Icon className="h-6 w-6 text-brand-blue stroke-[1.5]" />
                      </div>
                      
                      <h3 className="text-lg font-display text-navy mb-3 font-bold leading-tight group-hover:text-brand-blue transition-colors duration-300">{g.title}</h3>
                      
                      <p className="text-muted-foreground text-[13px] leading-relaxed mb-6 flex-grow">
                        {g.description || "Solução personalizada de garantia para as necessidades da sua empresa."}
                      </p>
                      
                      <div className={cn("pt-4 border-t border-navy/5 flex items-center group-hover:border-brand-blue/20 transition-colors w-full", cardAlign === "center" ? "justify-center" : cardAlign === "right" ? "justify-end" : "justify-between")}>
                        <Link
                          to="/garantias/$garantiaId"
                          params={{ garantiaId: g.id || g.title.toLowerCase().replace(/\s+/g, '-') }}
                          className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest text-brand-blue uppercase group/link"
                        >
                          SAIBA MAIS 
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
