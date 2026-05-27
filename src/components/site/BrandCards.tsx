import { ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import type { SiteContent } from "@/lib/api";

export function BrandCards({ cards }: { cards: SiteContent["brandCards"] }) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1280px] px-6 -mt-10 grid md:grid-cols-2 gap-6 relative z-10">
        {cards.map((c, i) => {
          const dark = c.variant === "dark";
          return (
            <div
              key={i}
              className={
                "relative overflow-hidden rounded-sm p-8 min-h-[230px] flex flex-col justify-between " +
                (dark ? "bg-navy text-navy-foreground" : "bg-surface text-foreground")
              }
            >
              <div className="absolute inset-0 opacity-30">
                <img src={c.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="relative">
                {dark ? (
                  <div className="font-display text-2xl">premiatto<span className="ml-2 text-[10px] tracking-[0.3em] align-middle">CAPITAL</span></div>
                ) : (
                  <Logo />
                )}
                <p className="mt-6 font-display text-2xl max-w-md leading-snug">{c.title}</p>
              </div>
              <a
                href="#"
                className={
                  "relative inline-flex items-center gap-2 text-[11px] font-semibold tracking-wider mt-6 " +
                  (dark ? "text-brand-blue" : "text-brand-blue")
                }
              >
                {c.cta} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
