import { DollarSign, BarChart3, ShieldCheck, Network, Users, ArrowRight } from "lucide-react";
import type { SiteContent } from "@/lib/api";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  dollar: DollarSign,
  chart: BarChart3,
  shield: ShieldCheck,
  network: Network,
  users: Users,
};

export function Capital({ data }: { data: SiteContent["capital"] }) {
  return (
    <section className="bg-navy-deep text-navy-foreground py-16">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-10 items-start">
          <div>
            <div className="text-[11px] tracking-[0.25em] text-brand-blue font-semibold mb-3">
              PREMIATTO CAPITAL
            </div>
            <h2 className="font-display text-3xl lg:text-4xl leading-tight">{data.title}</h2>
          </div>
          <div>
            <div className="flex justify-end mb-8">
              <a
                href="#"
                className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-wider text-brand-blue"
              >
                VER TODAS AS SOLUÇÕES DE CAPITAL <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {data.items.map((it) => {
                const Icon = iconMap[it.icon] || DollarSign;
                return (
                  <div key={it.title}>
                    <Icon className="h-7 w-7 text-navy-foreground stroke-[1.3]" />
                    <div className="font-display text-base mt-4 leading-snug">{it.title}</div>
                    <p className="text-[11px] text-navy-foreground/70 mt-2 leading-relaxed">
                      {it.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
