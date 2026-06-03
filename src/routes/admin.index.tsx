import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  defaultContent,
  fetchContent,
  getToken,
  saveContent,
  type SiteContent,
} from "@/lib/api";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save, Plus, Trash2, Layout, Image as ImageIcon, Sparkles, Shield, Scale, FileText, Gavel, Globe, Building, FileCheck2, Briefcase, Landmark, Handshake, Maximize, Type, Newspaper, Link, Eye, EyeOff, Layout } from "lucide-react";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function Field({
  label,
  value,
  onChange,
  textarea,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          placeholder={placeholder}
          className="mt-1 w-full border border-input rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-navy/20"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="mt-1 w-full border border-input rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-navy/20"
        />
      )}
    </label>
  );
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getToken()) {
      navigate({ to: "/admin/login" });
      return;
    }
    fetchContent().then(data => {
      setContent(data);
      setLoading(false);
    });
  }, [navigate]);

  function update<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setContent((c) => ({ ...c, [key]: value }));
  }

  async function save() {
    try {
      await saveContent(content);
      toast.success("Alterações salvas com sucesso!");
    } catch (e) {
      toast.error("Erro ao salvar alterações");
    }
  }

  const addHeroBanner = () => {
    const newBanner: SiteContent["hero"]["banners"][number] = {
      id: crypto.randomUUID(),
      title: "Novo Título do Banner",
      subtitle: "Descrição curta para este banner.",
      ctaPrimary: "SAIBA MAIS",
      ctaPrimaryLink: "",
      ctaPrimaryTarget: "_self",
      ctaSecondary: "CONTATO",
      ctaSecondaryLink: "",
      ctaSecondaryTarget: "_self",
      image: "",
    };
    update("hero", {
      ...content.hero,
      banners: [...content.hero.banners, newBanner],
    });
  };

  const removeHeroBanner = (id: string) => {
    if (content.hero.banners.length <= 1) {
      toast.error("O site deve ter pelo menos um banner no Hero.");
      return;
    }
    update("hero", {
      ...content.hero,
      banners: content.hero.banners.filter((b) => b.id !== id),
    });
  };

  const updateHeroBanner = (id: string, fields: any) => {
    update("hero", {
      ...content.hero,
      banners: content.hero.banners.map((b) =>
        b.id === id ? { ...b, ...fields } : b
      ),
    });
  };

  if (loading) return null;

  return (
    <AdminLayout title="Edição de Conteúdo">
      <div className="space-y-8 pb-24">
        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="bg-navy/5 p-1 h-auto flex flex-wrap gap-1 mb-6">
            <TabsTrigger value="hero" className="data-[state=active]:bg-navy data-[state=active]:text-white px-4 py-2 text-xs uppercase tracking-widest font-semibold">Hero</TabsTrigger>
            <TabsTrigger value="brandCards" className="data-[state=active]:bg-navy data-[state=active]:text-white px-4 py-2 text-xs uppercase tracking-widest font-semibold">Cards de Marca</TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-navy data-[state=active]:text-white px-4 py-2 text-xs uppercase tracking-widest font-semibold">Estatísticas</TabsTrigger>
            <TabsTrigger value="garantias" className="data-[state=active]:bg-navy data-[state=active]:text-white px-4 py-2 text-xs uppercase tracking-widest font-semibold">Garantias</TabsTrigger>
            <TabsTrigger value="capital" className="data-[state=active]:bg-navy data-[state=active]:text-white px-4 py-2 text-xs uppercase tracking-widest font-semibold">Capital</TabsTrigger>
            <TabsTrigger value="governanca" className="data-[state=active]:bg-navy data-[state=active]:text-white px-4 py-2 text-xs uppercase tracking-widest font-semibold">Governança</TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-navy data-[state=active]:text-white px-4 py-2 text-xs uppercase tracking-widest font-semibold">Notícias</TabsTrigger>
            <TabsTrigger value="branding" className="data-[state=active]:bg-navy data-[state=active]:text-white px-4 py-2 text-xs uppercase tracking-widest font-semibold">Branding</TabsTrigger>
            <TabsTrigger value="footer" className="data-[state=active]:bg-navy data-[state=active]:text-white px-4 py-2 text-xs uppercase tracking-widest font-semibold">Rodapé</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-navy flex items-center gap-2">
                    <Layout className="w-5 h-5 text-gold" />
                    Banners do Hero
                  </CardTitle>
                  <CardDescription>Configure múltiplos banners e animações de transição.</CardDescription>
                </div>
                <Button onClick={addHeroBanner} size="sm" className="bg-navy hover:bg-navy/90 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Banner
                </Button>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6 p-4 bg-muted/30 rounded-lg">
                  <div className="space-y-2">
                    <Label className="text-[11px] uppercase tracking-wider">Tipo de Animação</Label>
                    <select
                      value={content.hero.animation}
                      onChange={(e) => update("hero", { ...content.hero, animation: e.target.value as any })}
                      className="w-full border border-input rounded-sm px-3 py-2 text-sm"
                    >
                      <option value="fade">Esmaecer (Fade)</option>
                      <option value="slide">Deslizar (Slide)</option>
                      <option value="zoom">Zoom</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] uppercase tracking-wider">Intervalo (ms)</Label>
                    <input
                      type="number"
                      value={content.hero.interval}
                      onChange={(e) => update("hero", { ...content.hero, interval: Number(e.target.value) })}
                      className="w-full border border-input rounded-sm px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  {content.hero.banners.map((banner, index) => (
                    <div key={banner.id} className="border rounded-lg p-6 bg-white shadow-sm space-y-4 relative group">
                      <div className="flex items-center justify-between border-b pb-3 mb-4">
                        <h3 className="font-semibold text-navy">Banner #{index + 1}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeHeroBanner(banner.id)}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid lg:grid-cols-[1fr_300px] gap-8">
                        <div className="space-y-4">
                          <Field
                            label="Título"
                            value={banner.title}
                            onChange={(v) => updateHeroBanner(banner.id, { title: v })}
                            textarea
                          />
                          <Field
                            label="Subtítulo"
                            value={banner.subtitle}
                            onChange={(v) => updateHeroBanner(banner.id, { subtitle: v })}
                            textarea
                          />
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-3 p-3 bg-muted/20 rounded-sm">
                              <Field
                                label="Texto CTA Primário"
                                value={banner.ctaPrimary}
                                onChange={(v) => updateHeroBanner(banner.id, { ctaPrimary: v })}
                              />
                              <Field
                                label="Link CTA Primário"
                                value={banner.ctaPrimaryLink || ""}
                                onChange={(v) => updateHeroBanner(banner.id, { ctaPrimaryLink: v })}
                                placeholder="https://..."
                              />
                              <div className="space-y-1">
                                <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Abrir em</Label>
                                <select
                                  value={banner.ctaPrimaryTarget || "_self"}
                                  onChange={(e) => updateHeroBanner(banner.id, { ctaPrimaryTarget: e.target.value })}
                                  className="w-full border border-input rounded-sm px-2 py-1 text-xs"
                                >
                                  <option value="_self">Mesma Aba</option>
                                  <option value="_blank">Nova Aba</option>
                                </select>
                              </div>
                            </div>
                            <div className="space-y-3 p-3 bg-muted/20 rounded-sm">
                              <Field
                                label="Texto CTA Secundário"
                                value={banner.ctaSecondary}
                                onChange={(v) => updateHeroBanner(banner.id, { ctaSecondary: v })}
                              />
                              <Field
                                label="Link CTA Secundário"
                                value={banner.ctaSecondaryLink || ""}
                                onChange={(v) => updateHeroBanner(banner.id, { ctaSecondaryLink: v })}
                                placeholder="https://..."
                              />
                              <div className="space-y-1">
                                <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Abrir em</Label>
                                <select
                                  value={banner.ctaSecondaryTarget || "_self"}
                                  onChange={(e) => updateHeroBanner(banner.id, { ctaSecondaryTarget: e.target.value })}
                                  className="w-full border border-input rounded-sm px-2 py-1 text-xs"
                                >
                                  <option value="_self">Mesma Aba</option>
                                  <option value="_blank">Nova Aba</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <ImageUpload
                            label="Desktop (1920x1080)"
                            type="desktop"
                            value={banner.imageDesktop || banner.image}
                            onChange={(v) => updateHeroBanner(banner.id, { imageDesktop: v, image: v })}
                          />
                          <ImageUpload
                            label="Tablet (1024x768)"
                            type="tablet"
                            value={banner.imageTablet}
                            onChange={(v) => updateHeroBanner(banner.id, { imageTablet: v })}
                          />
                          <ImageUpload
                            label="Mobile (768x1024)"
                            type="mobile"
                            value={banner.imageMobile}
                            onChange={(v) => updateHeroBanner(banner.id, { imageMobile: v })}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="brandCards" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-navy flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-gold" />
                    Cards de Marca (Abaixo da Hero)
                  </CardTitle>
                  <CardDescription>Configure os cards que aparecem logo abaixo do banner principal.</CardDescription>
                </div>
                <Button 
                  onClick={() => {
                    const newCard = { 
                      title: "Novo Card", 
                      description: "", 
                      cta: "SAIBA MAIS", 
                      variant: "light" as const, 
                      image: "",
                      logoUrl: ""
                    };
                    update("brandCards", [...content.brandCards, newCard]);
                  }} 
                  size="sm" 
                  className="bg-navy hover:bg-navy/90 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Card
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6">
                  {content.brandCards.map((card, index) => (
                    <div key={index} className="border rounded-lg p-6 bg-white shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b pb-3 mb-4">
                        <h3 className="font-semibold text-navy">Card #{index + 1}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const next = content.brandCards.filter((_, i) => i !== index);
                            update("brandCards", next);
                          }}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <Field
                            label="Título"
                            value={card.title}
                            onChange={(v) => {
                              const next = [...content.brandCards];
                              next[index] = { ...card, title: v };
                              update("brandCards", next);
                            }}
                            textarea
                          />
                          <Field
                            label="Texto do Botão (CTA)"
                            value={card.cta}
                            onChange={(v) => {
                              const next = [...content.brandCards];
                              next[index] = { ...card, cta: v };
                              update("brandCards", next);
                            }}
                          />
                          <div className="space-y-1">
                            <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Estilo do Card</Label>
                            <select
                              value={card.variant}
                              onChange={(e) => {
                                const next = [...content.brandCards];
                                next[index] = { ...card, variant: e.target.value as any };
                                update("brandCards", next);
                              }}
                              className="w-full border border-input rounded-sm px-3 py-2 text-sm"
                            >
                              <option value="light">Claro (White)</option>
                              <option value="dark">Escuro (Navy)</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <ImageUpload
                            label="Logo do Card (PNG/SVG)"
                            value={card.logoUrl}
                            onChange={(v) => {
                              const next = [...content.brandCards];
                              next[index] = { ...card, logoUrl: v };
                              update("brandCards", next);
                            }}
                          />
                          <ImageUpload
                            label="Imagem de Fundo"
                            value={card.image}
                            onChange={(v) => {
                              const next = [...content.brandCards];
                              next[index] = { ...card, image: v };
                              update("brandCards", next);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-navy">Estatísticas</CardTitle>
                <CardDescription>Números que comprovam a autoridade da marca.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {content.stats.map((s, i) => (
                    <div key={i} className="border border-border rounded-md p-4 space-y-3 bg-white">
                      <Field label="Valor" value={s.value} onChange={(v) => {
                        const next = [...content.stats]; next[i] = { ...s, value: v }; update("stats", next);
                      }} />
                      <Field label="Legenda" value={s.label} onChange={(v) => {
                        const next = [...content.stats]; next[i] = { ...s, label: v }; update("stats", next);
                      }} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="garantias" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-navy flex items-center gap-2">
                    <Shield className="w-5 h-5 text-gold" />
                    Cards de Garantias (Carrossel)
                  </CardTitle>
                  <CardDescription>Gerencie as modalidades de garantia exibidas no site.</CardDescription>
                </div>
                <Button 
                  onClick={() => {
                    const newItem = { title: "Nova Garantia", description: "", link: "#", icon: "shield" };
                    update("garantias", [...content.garantias, newItem]);
                  }} 
                  size="sm" 
                  className="bg-navy hover:bg-navy/90 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Garantia
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {content.garantias.map((g, i) => (
                    <div key={i} className="border border-border rounded-lg p-6 space-y-4 bg-white shadow-sm relative group">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const next = content.garantias.filter((_, idx) => idx !== i);
                          update("garantias", next);
                        }}
                        className="absolute top-4 right-4 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>

                      <div className="grid gap-4">
                        <Field label="Título" value={g.title} onChange={(v) => {
                          const next = [...content.garantias]; next[i] = { ...g, title: v }; update("garantias", next);
                        }} />
                        
                        <Field label="Descrição" value={g.description || ""} onChange={(v) => {
                          const next = [...content.garantias]; next[i] = { ...g, description: v }; update("garantias", next);
                        }} textarea />
                        
                        <Field label="Link CTA" value={g.link || ""} onChange={(v) => {
                          const next = [...content.garantias]; next[i] = { ...g, link: v }; update("garantias", next);
                        }} placeholder="#" />

                        <div className="space-y-2">
                          <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Ícone Selecionado: <span className="text-navy font-bold">{g.icon}</span></Label>
                          <div className="grid grid-cols-5 gap-2 p-3 bg-muted/20 rounded-md">
                            {[
                              "scale", "file", "gavel", "globe", "building", 
                              "file-check", "shield", "briefcase", "landmark", "handshake"
                            ].map((iconName) => (
                              <button
                                key={iconName}
                                onClick={() => {
                                  const next = [...content.garantias];
                                  next[i] = { ...g, icon: iconName };
                                  update("garantias", next);
                                }}
                                className={`p-2 flex items-center justify-center rounded-sm border transition-all ${
                                  g.icon === iconName 
                                    ? "bg-navy text-white border-navy" 
                                    : "bg-white text-navy border-input hover:border-navy/30"
                                }`}
                                title={iconName}
                              >
                                {iconName === "scale" && <Scale className="w-4 h-4" />}
                                {iconName === "file" && <FileText className="w-4 h-4" />}
                                {iconName === "gavel" && <Gavel className="w-4 h-4" />}
                                {iconName === "globe" && <Globe className="w-4 h-4" />}
                                {iconName === "building" && <Building className="w-4 h-4" />}
                                {iconName === "file-check" && <FileCheck2 className="w-4 h-4" />}
                                {iconName === "shield" && <Shield className="w-4 h-4" />}
                                {iconName === "briefcase" && <Briefcase className="w-4 h-4" />}
                                {iconName === "landmark" && <Landmark className="w-4 h-4" />}
                                {iconName === "handshake" && <Handshake className="w-4 h-4" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="capital" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-navy">Premiatto Capital</CardTitle>
                <CardDescription>Soluções financeiras estruturadas.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Field label="Título da Seção" value={content.capital.title} onChange={(v) => update("capital", { ...content.capital, title: v })} textarea />
                <div className="grid md:grid-cols-2 gap-4">
                  {content.capital.items.map((it, i) => (
                    <div key={i} className="border border-border rounded-md p-4 space-y-3 bg-white">
                      <Field label="Título" value={it.title} onChange={(v) => {
                        const items = [...content.capital.items]; items[i] = { ...it, title: v }; update("capital", { ...content.capital, items });
                      }} />
                      <Field label="Descrição" value={it.description} onChange={(v) => {
                        const items = [...content.capital.items]; items[i] = { ...it, description: v }; update("capital", { ...content.capital, items });
                      }} textarea />
                      <Field label="Ícone (Lucide)" value={it.icon} onChange={(v) => {
                        const items = [...content.capital.items]; items[i] = { ...it, icon: v }; update("capital", { ...content.capital, items });
                      }} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="governanca" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-navy flex items-center gap-2">
                  <Scale className="w-5 h-5 text-gold" />
                  Governança & Compromisso
                </CardTitle>
                <CardDescription>Edite a seção de governança e compromisso.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <Field 
                      label="Crachá (Badge)" 
                      value={content.governanca.badge} 
                      onChange={(v) => update("governanca", { ...content.governanca, badge: v })} 
                    />
                    <Field 
                      label="Título" 
                      value={content.governanca.title} 
                      onChange={(v) => update("governanca", { ...content.governanca, title: v })} 
                      textarea 
                      placeholder="Use <b>texto</b> para negrito e <i>texto</i> para itálico"
                    />
                    <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-[11px] uppercase tracking-wider flex items-center gap-2">
                          <Type className="w-3 h-3" /> Tamanho do Título (px)
                        </Label>
                        <span className="text-sm font-bold text-navy">{content.governanca.titleSize || 30}px</span>
                      </div>
                      <input
                        type="range"
                        min="16"
                        max="60"
                        step="1"
                        value={content.governanca.titleSize || 30}
                        onChange={(e) => update("governanca", { ...content.governanca, titleSize: Number(e.target.value) })}
                        className="w-full accent-navy"
                      />
                    </div>

                    <Field 
                      label="Descrição" 
                      value={content.governanca.description} 
                      onChange={(v) => update("governanca", { ...content.governanca, description: v })} 
                      textarea 
                      placeholder="Use <b>texto</b> para negrito e <i>texto</i> para itálico"
                    />
                    <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-[11px] uppercase tracking-wider flex items-center gap-2">
                          <Type className="w-3 h-3" /> Tamanho da Descrição (px)
                        </Label>
                        <span className="text-sm font-bold text-navy">{content.governanca.descriptionSize || 14}px</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="24"
                        step="1"
                        value={content.governanca.descriptionSize || 14}
                        onChange={(e) => update("governanca", { ...content.governanca, descriptionSize: Number(e.target.value) })}
                        className="w-full accent-navy"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <ImageUpload
                      label="Imagem Lateral"
                      value={content.governanca.image}
                      onChange={(v) => update("governanca", { ...content.governanca, image: v })}
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Itens de Check (Lista)</Label>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => {
                        const next = [...content.governanca.items, "Novo item"];
                        update("governanca", { ...content.governanca, items: next });
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" /> Adicionar Item
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {content.governanca.items.map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input 
                          value={item} 
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const next = [...content.governanca.items];
                            next[idx] = e.target.value;
                            update("governanca", { ...content.governanca, items: next });
                          }} 
                        />
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="text-destructive"
                          onClick={() => {
                            const next = content.governanca.items.filter((_, i) => i !== idx);
                            update("governanca", { ...content.governanca, items: next });
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-navy flex items-center gap-2">
                    <Newspaper className="w-5 h-5 text-gold" />
                    Gestão de Notícias
                  </CardTitle>
                  <CardDescription>Publique e gerencie as notícias do site.</CardDescription>
                </div>
                <Button 
                  onClick={() => {
                    const newItem: SiteContent["news"][number] = { 
                      id: crypto.randomUUID(),
                      title: "Nova Notícia", 
                      description: "", 
                      image: "", 
                      link: "#", 
                      publishDate: new Date().toISOString().split('T')[0],
                      active: true 
                    };
                    update("news", [...(content.news || []), newItem]);
                  }} 
                  size="sm" 
                  className="bg-navy hover:bg-navy/90 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Notícia
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6">
                  {(content.news || []).map((item, index) => (
                    <div key={item.id} className="border rounded-lg p-6 bg-white shadow-sm space-y-4 relative group">
                      <div className="flex items-center justify-between border-b pb-3 mb-4">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-navy">Notícia #{index + 1}</h3>
                          {!item.active && <span className="bg-muted text-muted-foreground text-[10px] px-2 py-0.5 rounded-full">Rascunho</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const next = [...content.news];
                              next[index] = { ...item, active: !item.active };
                              update("news", next);
                            }}
                            className={item.active ? "text-green-600" : "text-muted-foreground"}
                          >
                            {item.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const next = content.news.filter((_, i) => i !== index);
                              update("news", next);
                            }}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-[1fr_300px] gap-8">
                        <div className="space-y-4">
                          <Field
                            label="Título"
                            value={item.title}
                            onChange={(v) => {
                              const next = [...content.news];
                              next[index] = { ...item, title: v };
                              update("news", next);
                            }}
                            textarea
                          />
                          <Field
                            label="Resumo / Descrição"
                            value={item.description}
                            onChange={(v) => {
                              const next = [...content.news];
                              next[index] = { ...item, description: v };
                              update("news", next);
                            }}
                            textarea
                          />
                          <div className="grid md:grid-cols-2 gap-4">
                            <Field
                              label="Link da Notícia"
                              value={item.link || ""}
                              onChange={(v) => {
                                const next = [...content.news];
                                next[index] = { ...item, link: v };
                                update("news", next);
                              }}
                              placeholder="#"
                            />
                            <div className="space-y-1">
                              <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Data de Publicação</Label>
                              <Input
                                type="date"
                                value={item.publishDate?.split('T')[0] || ""}
                                onChange={(e) => {
                                  const next = [...content.news];
                                  next[index] = { ...item, publishDate: e.target.value };
                                  update("news", next);
                                }}
                                className="h-9"
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Data de Expiração (Opcional)</Label>
                            <Input
                              type="date"
                              value={item.expiryDate?.split('T')[0] || ""}
                              onChange={(e) => {
                                const next = [...content.news];
                                next[index] = { ...item, expiryDate: e.target.value };
                                update("news", next);
                              }}
                              className="h-9"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <ImageUpload
                            label="Imagem de Capa"
                            value={item.image}
                            onChange={(v) => {
                              const next = [...content.news];
                              next[index] = { ...item, image: v };
                              update("news", next);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {(!content.news || content.news.length === 0) && (
                    <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/20">
                      <Newspaper className="w-8 h-8 text-muted-foreground mx-auto mb-3 opacity-50" />
                      <p className="text-muted-foreground">Nenhuma notícia cadastrada.</p>
                      <Button 
                        variant="link" 
                        onClick={() => {
                          const newItem = { id: crypto.randomUUID(), title: "Nova Notícia", description: "", image: "", link: "#", publishDate: new Date().toISOString().split('T')[0], active: true };
                          update("news", [newItem]);
                        }}
                      >
                        Criar primeira notícia
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-navy">Identidade Visual</CardTitle>
                <CardDescription>Cores e Logo da marca.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[11px] uppercase tracking-wider">Cor Primária (Navy)</Label>
                    <div className="flex gap-3">
                      <input
                        type="color"
                        value={content.branding.primaryColor}
                        onChange={(e) => update("branding", { ...content.branding, primaryColor: e.target.value })}
                        className="w-10 h-10 rounded-sm border cursor-pointer"
                      />
                      <input
                        type="text"
                        value={content.branding.primaryColor}
                        onChange={(e) => update("branding", { ...content.branding, primaryColor: e.target.value })}
                        className="flex-1 border border-input rounded-sm px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] uppercase tracking-wider">Cor Secundária (Gold)</Label>
                    <div className="flex gap-3">
                      <input
                        type="color"
                        value={content.branding.secondaryColor}
                        onChange={(e) => update("branding", { ...content.branding, secondaryColor: e.target.value })}
                        className="w-10 h-10 rounded-sm border cursor-pointer"
                      />
                      <input
                        type="text"
                        value={content.branding.secondaryColor}
                        onChange={(e) => update("branding", { ...content.branding, secondaryColor: e.target.value })}
                        className="flex-1 border border-input rounded-sm px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6 space-y-6">
                  <div className="flex items-center gap-2 mb-2">
                    <ImageIcon className="w-4 h-4 text-gold" />
                    <Label className="text-[12px] font-bold text-navy uppercase tracking-wider">Logo e Dimensões</Label>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8 items-end">
                    <div className="space-y-4">
                      <ImageUpload
                        label="Logo do Site"
                        value={content.branding.logoUrl}
                        onChange={(v) => update("branding", { ...content.branding, logoUrl: v })}
                      />
                    </div>
                    
                    <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-[11px] uppercase tracking-wider">Altura da Logo (px)</Label>
                        <span className="text-sm font-bold text-navy">{content.branding.logoHeight || 40}px</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Maximize className="w-4 h-4 text-muted-foreground" />
                        <input
                          type="range"
                          min="20"
                          max="120"
                          step="1"
                          value={content.branding.logoHeight || 40}
                          onChange={(e) => update("branding", { ...content.branding, logoHeight: Number(e.target.value) })}
                          className="flex-1 accent-navy"
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground">Arraste para ajustar o tamanho da logo no cabeçalho.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="footer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-navy flex items-center gap-2">
                  <Layout className="w-5 h-5 text-gold" />
                  Configurações do Rodapé
                </CardTitle>
                <CardDescription>Gerencie o conteúdo do rodapé, redes sociais e contatos.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Field
                      label="Texto Institucional (Logo)"
                      value={content.footer.text}
                      onChange={(v) => update("footer", { ...content.footer, text: v })}
                      textarea
                    />
                    <Field
                      label="Copyright"
                      value={content.footer.copyright}
                      onChange={(v) => update("footer", { ...content.footer, copyright: v })}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Field
                        label="LinkedIn (URL)"
                        value={content.footer.social.linkedin || ""}
                        onChange={(v) => update("footer", { ...content.footer, social: { ...content.footer.social, linkedin: v } })}
                      />
                      <Field
                        label="Instagram (URL)"
                        value={content.footer.social.instagram || ""}
                        onChange={(v) => update("footer", { ...content.footer, social: { ...content.footer.social, instagram: v } })}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Field
                      label="Telefone"
                      value={content.footer.contact.phone}
                      onChange={(v) => update("footer", { ...content.footer, contact: { ...content.footer.contact, phone: v } })}
                    />
                    <Field
                      label="E-mail"
                      value={content.footer.contact.email}
                      onChange={(v) => update("footer", { ...content.footer, contact: { ...content.footer.contact, email: v } })}
                    />
                    <Field
                      label="Endereço"
                      value={content.footer.contact.address}
                      onChange={(v) => update("footer", { ...content.footer, contact: { ...content.footer.contact, address: v } })}
                      textarea
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-navy">Colunas de Links</h3>
                    <Button 
                      size="sm" 
                      onClick={() => {
                        const newCol = { title: "Nova Coluna", items: [{ label: "Link", href: "#" }] };
                        update("footer", { ...content.footer, columns: [...content.footer.columns, newCol] });
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Nova Coluna
                    </Button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {content.footer.columns.map((col, cIdx) => (
                      <div key={cIdx} className="border rounded-md p-4 bg-muted/20 space-y-4 relative group">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white border shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                          onClick={() => {
                            const next = content.footer.columns.filter((_, i) => i !== cIdx);
                            update("footer", { ...content.footer, columns: next });
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        <Field
                          label="Título da Coluna"
                          value={col.title}
                          onChange={(v) => {
                            const next = [...content.footer.columns];
                            next[cIdx] = { ...col, title: v };
                            update("footer", { ...content.footer, columns: next });
                          }}
                        />
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Links</Label>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 text-[10px]"
                              onClick={() => {
                                const next = [...content.footer.columns];
                                next[cIdx] = { ...col, items: [...col.items, { label: "Novo Link", href: "#" }] };
                                update("footer", { ...content.footer, columns: next });
                              }}
                            >
                              <Plus className="w-3 h-3 mr-1" /> Add
                            </Button>
                          </div>
                          {col.items.map((item, iIdx) => (
                            <div key={iIdx} className="flex gap-2 items-end">
                              <div className="flex-1">
                                <Input
                                  value={item.label}
                                  placeholder="Rótulo"
                                  className="h-8 text-xs"
                                  onChange={(e) => {
                                    const nextItems = [...col.items];
                                    nextItems[iIdx] = { ...item, label: e.target.value };
                                    const nextCols = [...content.footer.columns];
                                    nextCols[cIdx] = { ...col, items: nextItems };
                                    update("footer", { ...content.footer, columns: nextCols });
                                  }}
                                />
                              </div>
                              <div className="flex-1">
                                <Input
                                  value={item.href}
                                  placeholder="Link (#)"
                                  className="h-8 text-xs"
                                  onChange={(e) => {
                                    const nextItems = [...col.items];
                                    nextItems[iIdx] = { ...item, href: e.target.value };
                                    const nextCols = [...content.footer.columns];
                                    nextCols[cIdx] = { ...col, items: nextItems };
                                    update("footer", { ...content.footer, columns: nextCols });
                                  }}
                                />
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => {
                                  const nextItems = col.items.filter((_, i) => i !== iIdx);
                                  const nextCols = [...content.footer.columns];
                                  nextCols[cIdx] = { ...col, items: nextItems };
                                  update("footer", { ...content.footer, columns: nextCols });
                                }}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="fixed bottom-8 right-8 z-50">
          <Button
            onClick={save}
            size="lg"
            className="bg-navy hover:bg-navy/90 text-white shadow-2xl h-14 px-8 rounded-full border border-gold/30"
          >
            <Save className="w-5 h-5 mr-2 text-gold" />
            PUBLICAR ALTERAÇÕES
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
