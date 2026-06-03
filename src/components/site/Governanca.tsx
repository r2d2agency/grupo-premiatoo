import { CheckCircle2 } from "lucide-react";
import type { SiteContent } from "@/lib/api";

export function Governanca({ data }: { data: SiteContent["governanca"] }) {
  if (!data) return null;
  
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1280px] grid lg:grid-cols-[1.5fr_1fr_1fr]">
        <div className="h-[300px] lg:h-auto">
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
          <h3 
            className="font-display text-navy leading-tight"
            style={{ fontSize: data.titleSize ? `${data.titleSize}px` : '1.875rem' }}
            dangerouslySetInnerHTML={{ __html: data.title }}
          />
          <div 
            className="text-muted-foreground mt-5 leading-relaxed prose prose-sm max-w-none"
            style={{ fontSize: data.descriptionSize ? `${data.descriptionSize}px` : '0.875rem' }}
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>
        <div className="bg-surface p-10 lg:p-14 space-y-5 flex flex-col justify-center">
          {data.items.map((i, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-brand-blue shrink-0" />
              <span className="text-sm text-navy">{i}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
