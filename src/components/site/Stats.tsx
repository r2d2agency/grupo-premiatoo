import { ShieldCheck, Building2, Users, Map } from "lucide-react";
import type { SiteContent } from "@/lib/api";
import { Counter } from "@/components/ui/Counter";

const icons = [ShieldCheck, Building2, Users, Map];

export function Stats({ stats }: { stats: SiteContent["stats"] }) {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-[1280px] px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => {
          const Icon = icons[i] || ShieldCheck;
          return (
            <div key={i} className="flex items-center gap-4">
              <div className="text-brand-blue">
                <Icon className="h-9 w-9 stroke-[1.3]" />
              </div>
              <div>
                <div className="font-display text-2xl text-navy">
                  <Counter value={s.value} />
                </div>
                <div className="text-xs text-muted-foreground leading-tight max-w-[150px]">
                  {s.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
