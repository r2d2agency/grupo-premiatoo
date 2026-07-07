import { ArrowRight, Leaf, Sprout, Trees, Sun } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { SiteContent } from "@/lib/api";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  leaf: Leaf,
  sprout: Sprout,
  trees: Trees,
  sun: Sun,
};

export function Carbono({ data }: { data: SiteContent["carbono"]["home"] }) {
  if (!data) return null;

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 z-0">
        <img src={data.image} alt="" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <span className="inline-block text-[11px] tracking-[0.25em] text-gold font-semibold mb-4">
            {data.badge}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] mb-6">
            {data.title}
          </h2>
          <p className="text-white/75 text-sm md:text-base leading-relaxed max-w-xl mb-8">
            {data.description}
          </p>
          <Link
            to={data.ctaHref}
            className="inline-flex items-center gap-3 bg-brand-blue text-brand-blue-foreground px-6 py-3.5 text-[12px] font-semibold tracking-wider rounded-sm hover:opacity-90 transition-opacity"
          >
            {data.cta} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {data.products.map((p, i) => {
            const Icon = iconMap[p.icon] || Leaf;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-md p-6 hover:border-gold/50 hover:bg-white/10 transition-all"
              >
                <div className="w-11 h-11 rounded bg-gold/15 flex items-center justify-center mb-4 text-gold group-hover:bg-gold group-hover:text-navy transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-sm font-semibold text-white leading-snug">
                  {p.title}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
