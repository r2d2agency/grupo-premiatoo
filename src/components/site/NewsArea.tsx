import { useState } from "react";
import { ArrowRight, Calendar, Play } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { SiteContent } from "@/lib/api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface NewsAreaProps {
  news: SiteContent["news"];
}

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export function NewsArea({ news = [] }: NewsAreaProps) {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>("");

  const activeNews = news.filter((item) => {
    if (!item.active) return false;
    const now = new Date();
    if (item.publishDate && new Date(item.publishDate) > now) return false;
    if (item.expiryDate && new Date(item.expiryDate) < now) return false;
    return true;
  });

  if (activeNews.length === 0) return null;

  return (
    <section className="py-12 bg-background overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-brand-blue font-semibold tracking-[0.2em] text-[11px] uppercase">
              FIQUE POR DENTRO
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-navy leading-tight">
              Últimas Notícias
            </h2>
          </div>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest text-brand-blue uppercase hover:gap-3 transition-all border-b border-brand-blue pb-1"
          >
            VER TODAS AS NOTÍCIAS <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-6">
            {activeNews.map((item, index) => {
              const ytId = extractYouTubeId((item as any).videoUrl || "");
              const cover =
                item.image ||
                (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80");

              const CardInner = (
                <>
                  <div className="relative overflow-hidden aspect-[16/9]">
                    <img
                      src={cover}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-brand-blue/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                      {ytId ? "Vídeo" : "Notícia"}
                    </div>
                    {ytId && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                          <Play className="w-7 h-7 text-brand-blue fill-brand-blue ml-1" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-8 space-y-4">
                    <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-medium uppercase tracking-wider">
                      <Calendar className="w-3.5 h-3.5 text-brand-blue" />
                      {item.publishDate ? new Date(item.publishDate).toLocaleDateString("pt-BR") : "Recentemente"}
                    </div>

                    <h3 className="text-xl md:text-2xl font-display text-navy group-hover:text-brand-blue transition-colors duration-300 line-clamp-2 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-slate-600 line-clamp-2 text-sm leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2">
                      <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest text-brand-blue uppercase group-hover:gap-3 transition-all">
                        {ytId ? "ASSISTIR VÍDEO" : "LER MATÉRIA COMPLETA"} <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </>
              );

              return (
                <CarouselItem key={index} className="pl-6 md:basis-1/2 lg:basis-1/2">
                  {ytId ? (
                    <button
                      type="button"
                      onClick={() => {
                        setVideoId(ytId);
                        setVideoTitle(item.title);
                      }}
                      className="group cursor-pointer h-full w-full text-left bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 block"
                    >
                      {CardInner}
                    </button>
                  ) : (
                    <Link
                      to="/news/$newsId"
                      params={{ newsId: item.id }}
                      className="group cursor-pointer h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 block"
                    >
                      {CardInner}
                    </Link>
                  )}
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-12">
            <CarouselPrevious className="static translate-y-0 h-12 w-12 border-slate-200 text-navy hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-300" />
            <CarouselNext className="static translate-y-0 h-12 w-12 border-slate-200 text-navy hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-300" />
          </div>
        </Carousel>
      </div>

      <Dialog open={!!videoId} onOpenChange={(o) => !o && setVideoId(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-0">
          <DialogTitle className="sr-only">{videoTitle}</DialogTitle>
          {videoId && (
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title={videoTitle}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
