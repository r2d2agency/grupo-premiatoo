import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchContent, defaultContent, type SiteContent } from "@/lib/api";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Link } from "@tanstack/react-router";
import { Calendar, ChevronRight, Newspaper } from "lucide-react";

export const Route = createFileRoute("/news/")({
  component: NewsIndex,
});

function NewsIndex() {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    fetchContent().then(setContent);
  }, []);

  const activeNews = content.news.filter((n) => n.active);
  const featuredNews = activeNews[0];
  const secondaryNews = activeNews.slice(1, 4);
  const remainingNews = activeNews.slice(4);

  return (
    <div className="min-h-screen bg-background" style={{ 
      //@ts-ignore
      "--brand-primary": content.branding.primaryColor, 
      "--brand-secondary": content.branding.secondaryColor 
    }}>
      <Header content={content} sticky={true} />
      
      <PageHero 
        title="Notícias" 
        subtitle="Fique por dentro das novidades do mercado e da Premiatto."
      />

      <main className="py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Area */}
            <div className="lg:col-span-8 space-y-12">
              {featuredNews && (
                <Link 
                  to="/news/$newsId" 
                  params={{ newsId: featuredNews.id }}
                  className="group block space-y-6"
                >
                  <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-xl">
                    <img 
                      src={featuredNews.image} 
                      alt={featuredNews.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-brand-blue text-[11px] font-bold tracking-widest uppercase">
                      <Calendar className="w-4 h-4" />
                      {featuredNews.publishDate ? new Date(featuredNews.publishDate).toLocaleDateString('pt-BR') : 'Recentemente'}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display text-navy group-hover:text-brand-blue transition-colors">
                      {featuredNews.title}
                    </h2>
                    <p className="text-lg text-slate-600 line-clamp-3">
                      {featuredNews.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-brand-blue font-bold text-xs tracking-widest uppercase">
                      Ler matéria completa <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              )}

              {/* 3 columns below featured */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-slate-100">
                {secondaryNews.map((item) => (
                  <Link 
                    key={item.id}
                    to="/news/$newsId"
                    params={{ newsId: item.id }}
                    className="group space-y-4"
                  >
                    <div className="aspect-video w-full rounded-xl overflow-hidden shadow-md">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="text-[10px] text-brand-blue font-bold uppercase tracking-wider">
                        {item.publishDate ? new Date(item.publishDate).toLocaleDateString('pt-BR') : 'Recentemente'}
                      </div>
                      <h3 className="font-display text-navy text-lg leading-tight group-hover:text-brand-blue transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>

              {/* List of remaining news if any */}
              {remainingNews.length > 0 && (
                <div className="space-y-8 pt-12 border-t border-slate-100">
                   <h3 className="text-2xl font-display text-navy">Mais notícias</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {remainingNews.map((item) => (
                         <Link 
                            key={item.id}
                            to="/news/$newsId"
                            params={{ newsId: item.id }}
                            className="group flex gap-4"
                          >
                            <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden">
                               <img src={item.image} className="w-full h-full object-cover" />
                            </div>
                            <div className="space-y-1">
                               <div className="text-[9px] text-brand-blue font-bold uppercase">
                                  {item.publishDate ? new Date(item.publishDate).toLocaleDateString('pt-BR') : 'Recentemente'}
                               </div>
                               <h4 className="text-sm font-semibold text-navy group-hover:text-brand-blue transition-colors line-clamp-2">
                                  {item.title}
                               </h4>
                            </div>
                         </Link>
                      ))}
                   </div>
                </div>
              )}
            </div>

            {/* Sidebar (News Menu) */}
            <aside className="lg:col-span-4 space-y-10">
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 sticky top-24">
                <h3 className="text-xl font-display text-navy mb-6 flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-brand-blue" />
                  Menu de Notícias
                </h3>
                <div className="space-y-6">
                  {activeNews.map((item) => (
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
                        Ver detalhes <ChevronRight className="w-3 h-3" />
                      </div>
                    </Link>
                  ))}
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
