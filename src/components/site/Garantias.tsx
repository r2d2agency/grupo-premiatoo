import { Scale, FileText, Gavel, Globe, Building, FileCheck2, ArrowRight } from "lucide-react";
import type { SiteContent } from "@/lib/api";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  scale: Scale,
  file: FileText,
  gavel: Gavel,
  globe: Globe,
  building: Building,
  "file-check": FileCheck2,
};

export function Garantias({ items }: { items: SiteContent["garantias"] }) {
  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-[11px] tracking-[0.25em] text-brand-blue font-semibold mb-3">
              NOSSAS SOLUÇÕES EM GARANTIAS
            </div>
            <h2 className="font-display text-3xl lg:text-4xl text-navy max-w-xl">
              Garantias para diferentes necessidades.
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-wider text-brand-blue"
          >
            VER TODAS AS GARANTIAS <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map((g) => {
            const Icon = iconMap[g.icon] || FileText;
            return (
              <a
                key={g.title}
                href="#"
                className="group bg-background rounded-sm p-5 min-h-[150px] flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <Icon className="h-8 w-8 text-brand-blue stroke-[1.3]" />
                <div className="text-[13px] text-navy leading-tight mt-6">{g.title}</div>
                <div className="h-px w-8 bg-brand-blue mt-3 group-hover:w-12 transition-all" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
