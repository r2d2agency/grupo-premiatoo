import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { fetchContent, defaultContent, type SiteContent } from "@/lib/api";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Link } from "@tanstack/react-router";
import { Calendar, ChevronRight, Newspaper, Search, Filter, Tag } from "lucide-react";

export const Route = createFileRoute("/news/")({
  component: NewsIndex,
});

function NewsIndex() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedSegment, setSelectedSegment] = useState("Todos");

  useEffect(() => {
    fetchContent().then(setContent);
  }, []);

  const activeNews = useMemo(() => {
    return content.news.filter((n) => {
      const matchesActive = n.active;
      const matchesSearch = search === "" || 
        n.title.toLowerCase().includes(search.toLowerCase()) || 
        n.description.toLowerCase().includes(search.toLowerCase()) ||
        (n.tags || []).some(t => t.toLowerCase().includes(search.toLowerCase()));
      
      const matchesCategory = selectedCategory === "Todas" || n.category === selectedCategory;
      const matchesSegment = selectedSegment === "Todos" || n.segment === selectedSegment;
      
      return matchesActive && matchesSearch && matchesCategory && matchesSegment;
    });
  }, [content.news, search, selectedCategory, selectedSegment]);

  const categories = useMemo(() => {
    const cats = new Set(content.news.filter(n => n.active && n.category).map(n => n.category as string));
    return ["Todas", ...Array.from(cats)];
  }, [content.news]);

  const segments = useMemo(() => {
    const segs = new Set(content.news.filter(n => n.active && n.segment).map(n => n.segment as string));
    return ["Todos", ...Array.from(segs)];
  }, [content.news]);

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

      <main className="py-20 md:py-32 bg-slate-50/50">
        <div className="max-w-[1280px] mx-auto px-6">
          {/* Filters Area */}
          <div className="mb-16 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Search */}
              <div className="md:col-span-6 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy/30 group-focus-within:text-brand-blue transition-colors" />
                <input 
                  type="text" 
                  placeholder="Pesquisar por título, descrição ou tags..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue outline-none transition-all font-light text-navy placeholder:text-navy/20"
                />
              </div>

              {/* Category Filter */}
              <div className="md:col-span-3 relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/30" />
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue outline-none transition-all font-light text-navy appearance-none cursor-pointer"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat === "Todas" ? "Todas as Categorias" : cat}</option>
                  ))}
                </select>
              </div>

              {/* Segment Filter */}
              <div className="md:col-span-3 relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/30" />
                <select 
                  value={selectedSegment}
                  onChange={(e) => setSelectedSegment(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue outline-none transition-all font-light text-navy appearance-none cursor-pointer"
                >
                  {segments.map(seg => (
                    <option key={seg} value={seg}>{seg === "Todos" ? "Todos os Segmentos" : seg}</option>
                  ))}
                </select>
              </div>
            </div>

            {activeNews.length === 0 && (
              <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-200">
                <Search className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-display text-navy mb-2">Nenhum resultado encontrado</h3>
                <p className="text-slate-400 font-light">Tente ajustar seus termos de pesquisa ou filtros.</p>
                <button 
                  onClick={() => { setSearch(""); setSelectedCategory("Todas"); setSelectedSegment("Todos"); }}
                  className="mt-6 text-brand-blue font-bold text-[10px] tracking-widest uppercase hover:underline"
                >
                  Limpar todos os filtros
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-20">
              {featuredNews && (
                <Link 
                  to="/news/$newsId" 
                  params={{ newsId: featuredNews.id }}
                  className="group block relative"
                >
                  <div className="relative aspect-[21/10] w-full rounded-3xl overflow-hidden shadow-2xl bg-navy/5">
                    <img 
                      src={featuredNews.image} 
                      alt={featuredNews.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {featuredNews.category && (
                          <span className="px-3 py-1 bg-brand-blue/90 backdrop-blur-md text-white text-[9px] font-bold tracking-widest uppercase rounded-full">
                            {featuredNews.category}
                          </span>
                        )}
                        {featuredNews.segment && (
                          <span className="px-3 py-1 bg-gold/90 backdrop-blur-md text-white text-[9px] font-bold tracking-widest uppercase rounded-full">
                            {featuredNews.segment}
                          </span>
                        )}
                      </div>
                      <h2 className="text-3xl md:text-5xl font-display text-white leading-tight mb-4 drop-shadow-lg">
                        {featuredNews.title}
                      </h2>
                      <div className="flex items-center gap-4 text-white/80 text-[11px] font-bold tracking-widest uppercase">
                        <Calendar className="w-4 h-4 text-gold" />
                        {featuredNews.publishDate ? new Date(featuredNews.publishDate).toLocaleDateString('pt-BR') : 'Recentemente'}
                        <span className="w-8 h-[1px] bg-gold/50 ml-2" />
                        <span className="group-hover:text-white transition-colors">Ler agora</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Grid de Notícias Secundárias */}
              <div className="space-y-12">
                <div className="flex items-center gap-4">
                  <h3 className="text-sm font-bold tracking-[0.3em] text-navy/40 uppercase">Explorar mais</h3>
                  <div className="h-[1px] flex-1 bg-slate-200" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {secondaryNews.map((item) => (
                    <Link 
                      key={item.id}
                      to="/news/$newsId"
                      params={{ newsId: item.id }}
                      className="group flex flex-col h-full"
                    >
                      <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-lg mb-6 bg-slate-100 relative group-hover:shadow-2xl transition-all duration-500">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                           {item.category && (
                             <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-brand-blue text-[8px] font-bold tracking-widest uppercase rounded-lg">
                               {item.category}
                             </span>
                           )}
                        </div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="text-[10px] text-brand-blue font-bold uppercase tracking-[0.15em]">
                          {item.publishDate ? new Date(item.publishDate).toLocaleDateString('pt-BR') : 'Recentemente'}
                        </div>
                        <h3 className="font-display text-navy text-xl leading-snug group-hover:text-brand-blue transition-colors line-clamp-3">
                          {item.title}
                        </h3>
                        <p className="text-slate-500 text-sm line-clamp-2 font-light leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-navy/40 uppercase tracking-widest group-hover:text-brand-blue group-hover:translate-x-1 transition-all">
                        Ver detalhes <ChevronRight className="w-3 h-3" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Lista compacta para o restante */}
              {remainingNews.length > 0 && (
                <div className="pt-20 border-t border-slate-200/60 space-y-10">
                   <div className="flex items-center gap-4">
                     <h3 className="text-sm font-bold tracking-[0.3em] text-navy/40 uppercase">Arquivo</h3>
                     <div className="h-[1px] flex-1 bg-slate-200" />
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                      {remainingNews.map((item) => (
                         <Link 
                            key={item.id}
                            to="/news/$newsId"
                            params={{ newsId: item.id }}
                            className="group flex items-start gap-6 pb-8 border-b border-slate-100 last:border-0"
                          >
                            <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden shadow-md">
                               <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            </div>
                            <div className="space-y-2">
                               <div className="text-[9px] text-brand-blue font-bold uppercase tracking-widest">
                                  {item.publishDate ? new Date(item.publishDate).toLocaleDateString('pt-BR') : 'Recentemente'}
                               </div>
                               <h4 className="text-base font-display text-navy group-hover:text-brand-blue transition-colors line-clamp-2 leading-tight">
                                  {item.title}
                               </h4>
                            </div>
                         </Link>
                      ))}
                   </div>
                </div>
              )}
            </div>

            {/* Sidebar Lateral Sofisticada */}
            <aside className="lg:col-span-4">
              <div className="sticky top-32 space-y-12">
                {/* News Index / Categories */}
                <div className="bg-navy rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden">
                  <div className="relative z-10 space-y-8">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-display leading-tight">Conteúdos<br/><span className="text-gold">Premiatto</span></h3>
                      <div className="h-1 w-12 bg-gold/50 rounded-full" />
                    </div>
                    
                    <nav className="space-y-1">
                      {activeNews.slice(0, 8).map((item, idx) => (
                        <Link 
                          key={item.id}
                          to="/news/$newsId"
                          params={{ newsId: item.id }}
                          className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0 group"
                        >
                          <span className="text-[10px] font-mono text-white/30 group-hover:text-gold transition-colors">0{idx + 1}</span>
                          <span className="text-sm font-light text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all line-clamp-1">
                            {item.title}
                          </span>
                        </Link>
                      ))}
                    </nav>

                    <Link 
                      to="/"
                      className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-gold uppercase hover:gap-3 transition-all pt-4"
                    >
                      Voltar ao Início <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-blue/20 rounded-full -ml-12 -mb-12 blur-2xl" />
                </div>

                {/* CTA Card */}
                <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-xl space-y-6 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-brand-blue">
                    <Newspaper className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-display text-navy">Precisa de análise especializada?</h4>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">
                    Nossa equipe técnica está à disposição para estruturar a melhor solução para sua empresa.
                  </p>
                  <a 
                    href={content.navigation.cta.href}
                    className="inline-block w-full bg-brand-blue text-white py-4 rounded-xl font-bold text-[11px] tracking-[0.2em] hover:bg-navy transition-all shadow-lg shadow-brand-blue/20"
                  >
                    SOLICITAR ANÁLISE
                  </a>
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
