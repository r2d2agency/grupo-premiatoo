import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchContent, defaultContent, type SiteContent } from "@/lib/api";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Shield, ArrowLeft, ArrowRight, ChevronRight, FileText, Scale, Gavel, Globe, Building, FileCheck2, Briefcase, Landmark, Handshake } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { cn } from "@/lib/utils";

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

export const Route = createFileRoute("/garantias/$garantiaId")({
  component: GarantiaDetail,
});

function GarantiaDetail() {
  const { garantiaId } = Route.useParams();
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    fetchContent().then(setContent);
  }, []);

  const garantiaItem = content.garantias.find((g) => g.id === garantiaId || g.title.toLowerCase().replace(/\s+/g, '-') === garantiaId);
  const otherGarantias = content.garantias.filter((g) => g.id !== (garantiaItem?.id || garantiaId)).slice(0, 6);
  
  const Icon = garantiaItem ? (iconMap[garantiaItem.icon] || Shield) : Shield;

  if (!garantiaItem) {
    return (
      <div className="min-h-screen bg-background">
        <Header content={content} sticky={true} />
        <div className="max-w-[1280px] mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl font-display">Garantia não encontrada</h1>
          <Link to="/" className="text-brand-blue mt-4 inline-block">Voltar para a Home</Link>
        </div>
        <Footer content={content} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" style={{ 
      //@ts-ignore
      "--brand-primary": content.branding.primaryColor, 
      "--brand-secondary": content.branding.secondaryColor 
    }}>
      <Header content={content} sticky={true} />
      
      <PageHero 
        title="Garantias" 
        subtitle={garantiaItem.title}
        backgroundImage={garantiaItem.image || "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80"}
      />
      
      <main className="py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest text-brand-blue mb-12 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> VOLTAR PARA O INÍCIO
          </Link>

          {(() => {
            const alignCls = (a?: string) =>
              a === "center" ? "text-center" : a === "right" ? "text-right" : a === "justify" ? "text-justify" : "text-left";
            const sizeStyle = (s?: number) => (s ? { fontSize: `${s}px` } : undefined);
            return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-8 space-y-12">
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 flex items-center justify-center border border-brand-blue/20">
                  <Icon className="w-8 h-8 text-brand-blue" />
                </div>
                <h1
                  className={cn("text-4xl md:text-5xl font-display text-navy leading-tight", alignCls(garantiaItem.detailTitleAlign))}
                  style={sizeStyle(garantiaItem.detailTitleSize)}
                >
                  {garantiaItem.title}
                </h1>
                <div
                  className={cn("text-slate-700 leading-relaxed text-lg space-y-6 font-normal whitespace-pre-line border-l-4 border-gold pl-6 py-2", alignCls(garantiaItem.detailDescriptionAlign))}
                  style={sizeStyle(garantiaItem.detailDescriptionSize)}
                >
                  {garantiaItem.description}
                </div>
              </div>

              {garantiaItem.image && (
                <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-navy/5">
                  <img 
                    src={garantiaItem.image} 
                    alt={garantiaItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div
                className={cn("text-slate-700 leading-relaxed text-lg space-y-6 font-normal whitespace-pre-line", alignCls(garantiaItem.detailContentAlign))}
                style={sizeStyle(garantiaItem.detailContentSize)}
              >
                {garantiaItem.content ? (
                  garantiaItem.content
                ) : (
                  <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="italic text-slate-500 text-center">
                      Informações detalhadas sobre esta modalidade de garantia estão sendo atualizadas por nossa equipe técnica.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="pt-8">
                <div className="bg-navy p-10 rounded-3xl text-white relative overflow-hidden shadow-2xl">
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-4 max-w-xl">
                      <h3 className="text-3xl font-display leading-tight">Pronto para proteger sua operação?</h3>
                      <p className="text-white/70">Fale agora com um de nossos especialistas e solicite uma análise personalizada para sua demanda.</p>
                    </div>
                    <a 
                      href={content.navigation.cta.href}
                      className="whitespace-nowrap bg-gold text-navy px-8 py-5 rounded-xl font-bold text-xs tracking-[0.2em] hover:bg-white transition-all shadow-lg flex items-center gap-3"
                    >
                      SOLICITAR ANÁLISE <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-10">
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 sticky top-28">
                <h3 className="text-xl font-display text-navy mb-8 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-brand-blue" />
                  Outras Garantias
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {otherGarantias.map((item) => {
                    const SmallIcon = iconMap[item.icon] || Shield;
                    return (
                      <Link 
                        key={item.id}
                        to="/garantias/$garantiaId"
                        params={{ garantiaId: item.id || item.title.toLowerCase().replace(/\s+/g, '-') }}
                        className="group flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100 hover:border-brand-blue/30 hover:shadow-md transition-all"
                      >
                        <div className="w-10 h-10 rounded-lg bg-brand-blue/5 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all">
                          <SmallIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-sm font-bold text-navy group-hover:text-brand-blue transition-colors leading-tight">
                            {item.title}
                          </h4>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-blue" />
                      </Link>
                    );
                  })}
                </div>
                
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <Link 
                    to="/garantias"
                    className="flex items-center justify-center gap-2 w-full py-4 text-[11px] font-bold tracking-widest text-navy border border-navy/10 rounded-xl hover:bg-navy hover:text-white transition-all"
                  >
                    VER TODAS AS SOLUÇÕES
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      
      <Footer content={content} />
    </div>
  );
}