import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { fetchContent, defaultContent, type SiteContent } from "@/lib/api";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Link } from "@tanstack/react-router";
import { Search, Shield, ChevronRight, ArrowRight, Scale, FileText, Gavel, Globe, Building, FileCheck2, Briefcase, Landmark, Handshake } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  scale: Scale,
  file: FileText,
  gavel: Gavel,
  globe: Globe,
  building: Building,
  "file-check": FileCheck2,
  shield: Shield,
  briefcase: Briefcase,
  landmark: Landmark,
  handshake: Handshake,
};

export const Route = createFileRoute("/garantias/")({
  component: GarantiasIndex,
});

function GarantiasIndex() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchContent().then(setContent);
  }, []);

  const filteredGarantias = useMemo(() => {
    return content.garantias.filter((g) => {
      const matchesSearch = search === "" || 
        g.title.toLowerCase().includes(search.toLowerCase()) || 
        (g.description || "").toLowerCase().includes(search.toLowerCase());
      
      return matchesSearch;
    });
  }, [content.garantias, search]);

  return (
    <div className="min-h-screen bg-background" style={{ 
      //@ts-ignore
      "--brand-primary": content.branding.primaryColor, 
      "--brand-secondary": content.branding.secondaryColor 
    }}>
      <Header content={content} sticky={true} />
      
      <PageHero 
        title="Nossas Garantias" 
        subtitle="Soluções estruturadas para proteger e impulsionar sua operação."
        backgroundImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80"
      />

      <main className="py-20 md:py-32 bg-slate-50/50">
        <div className="max-w-[1280px] mx-auto px-6">
          {/* Search Area */}
          <div className="mb-16 max-w-2xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/30 group-focus-within:text-brand-blue transition-colors" />
              <input 
                type="text" 
                placeholder="Pesquisar por modalidade de garantia..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-5 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue outline-none transition-all font-light text-navy placeholder:text-navy/20"
              />
            </div>
          </div>

          {filteredGarantias.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-200">
              <Shield className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <h3 className="text-xl font-display text-navy mb-2">Nenhuma garantia encontrada</h3>
              <p className="text-slate-400 font-light">Tente ajustar seus termos de pesquisa.</p>
              <button 
                onClick={() => setSearch("")}
                className="mt-6 text-brand-blue font-bold text-[10px] tracking-widest uppercase hover:underline"
              >
                Limpar pesquisa
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGarantias.map((item) => {
                const Icon = iconMap[item.icon] || Shield;
                return (
                  <Link 
                    key={item.id}
                    to="/garantias/$garantiaId"
                    params={{ garantiaId: item.id || item.title.toLowerCase().replace(/\s+/g, '-') }}
                    className="group bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-brand-blue/5 flex items-center justify-center mb-8 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 border border-brand-blue/10">
                      <Icon className="w-8 h-8" />
                    </div>
                    
                    <div className="flex-grow space-y-4">
                      <h3 className="text-2xl font-display text-navy group-hover:text-brand-blue transition-colors leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 font-light leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-widest text-navy/40 uppercase group-hover:text-brand-blue transition-colors">
                        Saber mais
                      </span>
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-32">
            <div className="bg-navy p-12 md:p-20 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="space-y-6 max-w-2xl text-center md:text-left">
                  <h2 className="text-4xl md:text-5xl font-display leading-tight">
                    Pronto para estruturar <br /> sua <span className="text-gold">operação?</span>
                  </h2>
                  <p className="text-white/70 text-lg font-light">
                    Fale agora com um de nossos especialistas e descubra como podemos proteger o que sustenta o seu negócio.
                  </p>
                </div>
                <a 
                  href={content.navigation.cta.href}
                  className="whitespace-nowrap bg-gold text-navy px-10 py-6 rounded-2xl font-bold text-xs tracking-[0.2em] hover:bg-white transition-all shadow-xl flex items-center gap-4 uppercase"
                >
                  SOLICITAR ANÁLISE <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer content={content} />
    </div>
  );
}
