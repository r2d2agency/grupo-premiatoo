import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchContent, defaultContent, type SiteContent } from "@/lib/api";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Calendar, ArrowLeft, Newspaper, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/news/$newsId")({
  component: NewsDetail,
});

function NewsDetail() {
  const { newsId } = Route.useParams();
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    fetchContent().then(setContent);
  }, []);

  const newsItem = content.news.find((n) => n.id === newsId);
  const otherNews = content.news.filter((n) => n.id !== newsId && n.active).slice(0, 5);

  if (!newsItem) {
    return (
      <div className="min-h-screen bg-background">
        <Header content={content} sticky={true} />
        <div className="max-w-[1280px] mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl font-display">Notícia não encontrada</h1>
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
        title="Notícias" 
        subtitle={newsItem.title}
        backgroundImage={newsItem.image}
      />
      
      <main className="py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <Link 
            to="/news" 
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest text-brand-blue mb-12 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> VOLTAR PARA NOTÍCIAS
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-brand-blue text-[11px] font-bold tracking-widest uppercase">
                  <Calendar className="w-4 h-4" />
                  {newsItem.publishDate ? new Date(newsItem.publishDate).toLocaleDateString('pt-BR') : 'Recentemente'}
                </div>
                <h1 className="text-4xl md:text-5xl font-display text-navy leading-tight">
                  {newsItem.title}
                </h1>
                <p className="text-xl text-slate-600 font-light leading-relaxed italic">
                  {newsItem.description}
                </p>
              </div>

              <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={newsItem.image} 
                  alt={newsItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-slate-700 leading-relaxed text-lg space-y-6 font-normal whitespace-pre-line">
                {newsItem.content ? (
                  newsItem.content
                ) : (
                  newsItem.description
                )}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-10">
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                <h3 className="text-xl font-display text-navy mb-6 flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-brand-blue" />
                  Outras Notícias
                </h3>
                <div className="space-y-6">
                  {otherNews.map((item) => (
                    <Link 
                      key={item.id}
                      to="/news/$newsId"
                      params={{ newsId: item.id }}
                      className="group block space-y-2"
                    >
                      <div className="text-[10px] text-brand-blue font-bold uppercase tracking-wider">
                        {item.publishDate ? new Date(item.publishDate).toLocaleDateString('pt-BR') : 'Recentemente'}
                      </div>
                      <h4 className="text-sm font-semibold text-navy group-hover:text-brand-blue transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-brand-blue transition-colors">
                        Ler agora <ChevronRight className="w-3 h-3" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-navy rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10 space-y-4">
                  <h3 className="text-2xl font-display leading-tight">Precisa de uma solução sob medida?</h3>
                  <p className="text-white/70 text-sm">Nossos especialistas estão prontos para analisar sua demanda.</p>
                  <a 
                    href={content.navigation.cta.href}
                    className="inline-block w-full text-center bg-brand-blue text-white py-4 rounded-lg font-bold text-xs tracking-widest hover:bg-white hover:text-navy transition-all"
                  >
                    SOLICITAR ANÁLISE
                  </a>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      
      <Footer content={content} />
    </div>
  );
}
