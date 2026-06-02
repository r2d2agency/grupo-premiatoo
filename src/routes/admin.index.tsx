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
import { Save, Plus, Trash2, Layout, Image as ImageIcon, Sparkles } from "lucide-react";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

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
    const newBanner = {
      id: crypto.randomUUID(),
      title: "Novo Título do Banner",
      subtitle: "Descrição curta para este banner.",
      ctaPrimary: "SAIBA MAIS",
      ctaSecondary: "CONTATO",
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
            <TabsTrigger value="stats" className="data-[state=active]:bg-navy data-[state=active]:text-white px-4 py-2 text-xs uppercase tracking-widest font-semibold">Estatísticas</TabsTrigger>
            <TabsTrigger value="garantias" className="data-[state=active]:bg-navy data-[state=active]:text-white px-4 py-2 text-xs uppercase tracking-widest font-semibold">Garantias</TabsTrigger>
            <TabsTrigger value="capital" className="data-[state=active]:bg-navy data-[state=active]:text-white px-4 py-2 text-xs uppercase tracking-widest font-semibold">Capital</TabsTrigger>
            <TabsTrigger value="branding" className="data-[state=active]:bg-navy data-[state=active]:text-white px-4 py-2 text-xs uppercase tracking-widest font-semibold">Branding</TabsTrigger>
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
                            <Field
                              label="CTA Primário"
                              value={banner.ctaPrimary}
                              onChange={(v) => updateHeroBanner(banner.id, { ctaPrimary: v })}
                            />
                            <Field
                              label="CTA Secundário"
                              value={banner.ctaSecondary}
                              onChange={(v) => updateHeroBanner(banner.id, { ctaSecondary: v })}
                            />
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
              <CardHeader>
                <CardTitle className="text-navy">Cards de Garantias</CardTitle>
                <CardDescription>Tipos de garantias oferecidas.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {content.garantias.map((g, i) => (
                    <div key={i} className="border border-border rounded-md p-4 space-y-3 bg-white">
                      <Field label="Título" value={g.title} onChange={(v) => {
                        const next = [...content.garantias]; next[i] = { ...g, title: v }; update("garantias", next);
                      }} />
                      <Field label="Ícone (Lucide)" value={g.icon} onChange={(v) => {
                        const next = [...content.garantias]; next[i] = { ...g, icon: v }; update("garantias", next);
                      }} />
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
                
                <div className="border-t pt-6">
                  <ImageUpload
                    label="Logo do Site"
                    value={content.branding.logoUrl}
                    onChange={(v) => update("branding", { ...content.branding, logoUrl: v })}
                  />
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
