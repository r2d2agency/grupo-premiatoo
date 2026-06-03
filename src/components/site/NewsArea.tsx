import { useState } from "react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import type { SiteContent } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface NewsAreaProps {
  news: SiteContent["news"];
}

export function NewsArea({ news = [] }: NewsAreaProps) {
  const activeNews = news.filter((item) => {
    if (!item.active) return false;
    const now = new Date();
    if (item.publishDate && new Date(item.publishDate) > now) return false;
    if (item.expiryDate && new Date(item.expiryDate) < now) return false;
    return true;
  });

  if (activeNews.length === 0) return null;

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <span className="text-gold font-semibold tracking-[0.2em] text-xs uppercase">
              FIQUE POR DENTRO
            </span>
            <h2 className="text-4xl md:text-5xl font-display text-navy leading-tight">
              Últimas Notícias e <br />
              <span className="text-navy/50 italic">Atualizações</span>
            </h2>
          </div>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {activeNews.map((item, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/2">
                <div className="group cursor-pointer h-full">
                  <div className="relative overflow-hidden aspect-[16/9] mb-6 rounded-sm">
                    <img
                      src={item.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80"}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-navy text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                      Notícia
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-muted-foreground text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.publishDate ? new Date(item.publishDate).toLocaleDateString('pt-BR') : 'Recentemente'}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-display text-navy group-hover:text-gold transition-colors duration-300 line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                      {item.description}
                    </p>

                    <a
                      href={item.link || "#"}
                      className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest text-navy uppercase group-hover:text-gold transition-colors"
                    >
                      LER MATÉRIA COMPLETA <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-8">
            <CarouselPrevious className="static translate-y-0 h-10 w-10 border-navy/10 hover:bg-navy hover:text-white" />
            <CarouselNext className="static translate-y-0 h-10 w-10 border-navy/10 hover:bg-navy hover:text-white" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
