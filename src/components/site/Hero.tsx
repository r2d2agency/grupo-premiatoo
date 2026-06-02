import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { SiteContent } from "@/lib/api";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Hero({ hero }: { hero: SiteContent["hero"] }) {
  const [current, setCurrent] = useState(0);
  const banners = hero.banners || [];

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, hero.interval || 5000);
    return () => clearInterval(timer);
  }, [banners.length, hero.interval]);

  if (banners.length === 0) return null;

  const banner = banners[current];

  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { x: "100%", opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: "-100%", opacity: 0 },
    },
    zoom: {
      initial: { scale: 1.2, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.8, opacity: 0 },
    },
  };

  const currentVariant = variants[hero.animation || "fade"];

  return (
    <section className="relative bg-navy text-navy-foreground h-[600px] lg:h-[700px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={banner.id + current}
          initial={currentVariant.initial}
          animate={currentVariant.animate}
          exit={currentVariant.exit}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 z-0">
            <picture className="w-full h-full">
              {banner.imageMobile && <source media="(max-width: 767px)" srcSet={banner.imageMobile} />}
              {banner.imageTablet && <source media="(max-width: 1023px)" srcSet={banner.imageTablet} />}
              <img
                src={banner.imageDesktop || banner.image}
                alt=""
                className="w-full h-full object-cover opacity-90"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-transparent" />
          </div>
          
          <div className="relative mx-auto max-w-[1280px] px-6 h-full flex items-center">
            <div className="max-w-xl">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-display text-4xl lg:text-5xl leading-[1.1]"
              >
                {banner.title}
              </motion.h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6 text-sm leading-relaxed text-navy-foreground/80 max-w-md"
              >
                {banner.subtitle}
              </motion.p>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-10 flex flex-wrap gap-3"
              >
                <a
                  href="#"
                  className="inline-flex items-center gap-3 bg-brand-blue text-brand-blue-foreground px-6 py-3.5 text-[12px] font-semibold tracking-wider rounded-sm hover:opacity-90"
                >
                  {banner.ctaPrimary} <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-3 border border-navy-foreground/40 text-navy-foreground px-6 py-3.5 text-[12px] font-semibold tracking-wider rounded-sm hover:bg-navy-foreground/10"
                >
                  {banner.ctaSecondary} <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {banners.length > 1 && (
        <>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-12 h-1 transition-all ${
                  i === current ? "bg-gold" : "bg-white/30"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + banners.length) % banners.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors z-20 hidden lg:block"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % banners.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors z-20 hidden lg:block"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}
    </section>
  );
}
