import { ShieldCheck, Building2, Users, Map } from "lucide-react";
import type { SiteContent } from "@/lib/api";
import { Counter } from "@/components/ui/Counter";
import { motion } from "framer-motion";

const icons = [ShieldCheck, Building2, Users, Map];

export function Stats({ stats }: { stats: SiteContent["stats"] }) {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-[1280px] px-6 flex flex-wrap justify-center gap-x-8 gap-y-12">
        {stats.map((s, i) => {
          const Icon = icons[i] || ShieldCheck;
          return (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center gap-4 min-w-[200px]"
            >
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
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
