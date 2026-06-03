import { SiteContent } from "@/lib/api";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundColor?: string;
}

export function PageHero({ 
  title, 
  subtitle, 
  backgroundImage, 
  backgroundColor = "bg-navy" 
}: PageHeroProps) {
  return (
    <section className={`relative pt-44 pb-24 overflow-hidden ${backgroundColor} text-white`}>
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img 
            src={backgroundImage} 
            alt={title} 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-navy/60" />
        </div>
      )}
      
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center">
        <span className="inline-block text-brand-blue font-bold tracking-[0.2em] text-[11px] uppercase mb-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
          PREMIATTO GARANTIDORA
        </span>
        <h1 className="text-4xl md:text-6xl font-display leading-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {title}
        </h1>
        {subtitle && (
          <p className="max-w-2xl mx-auto text-white/70 text-lg md:text-xl font-light leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}