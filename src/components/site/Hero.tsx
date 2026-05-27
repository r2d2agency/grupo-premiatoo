import { ArrowRight } from "lucide-react";
import type { SiteContent } from "@/lib/api";

export function Hero({ hero }: { hero: SiteContent["hero"] }) {
  return (
    <section className="relative bg-navy text-navy-foreground overflow-hidden">
      <div className="absolute inset-0">
        <img src={hero.image} alt="" className="w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-transparent" />
      </div>
      <div className="relative mx-auto max-w-[1280px] px-6 pt-36 pb-24 lg:pb-32">
        <div className="max-w-xl">
          <h1 className="font-display text-4xl lg:text-5xl leading-[1.1]">{hero.title}</h1>
          <p className="mt-6 text-sm leading-relaxed text-navy-foreground/80 max-w-md">
            {hero.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-brand-blue text-brand-blue-foreground px-6 py-3.5 text-[12px] font-semibold tracking-wider rounded-sm hover:opacity-90"
            >
              {hero.ctaPrimary} <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-3 border border-navy-foreground/40 text-navy-foreground px-6 py-3.5 text-[12px] font-semibold tracking-wider rounded-sm hover:bg-navy-foreground/10"
            >
              {hero.ctaSecondary} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
