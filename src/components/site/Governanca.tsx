import { CheckCircle2 } from "lucide-react";
import type { SiteContent } from "@/lib/api";

export function Governanca({ data }: { data: SiteContent["governanca"] }) {
  if (!data) return null;
  
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1280px] grid lg:grid-cols-3">
        <div className="min-h-[380px]">
          <img
            src={data.image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-surface p-10 lg:p-14">
          <div className="text-[11px] tracking-[0.25em] text-brand-blue font-semibold mb-3">
            {data.badge}
          </div>
          <h3 className="font-display text-3xl text-navy leading-tight">
            {data.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-5 leading-relaxed">
            {data.description}
          </p>
        </div>
        <div className="bg-surface p-10 lg:p-14 space-y-5">
          {data.items.map((i, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-brand-blue" />
              <span className="text-sm text-navy">{i}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
