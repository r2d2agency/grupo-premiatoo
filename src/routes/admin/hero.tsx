import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { defaultContent, fetchContent, getToken, saveContent, type SiteContent } from "@/lib/api";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save, Plus, Trash2, Layout } from "lucide-react";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/hero")({
  component: AdminHeroPage,
});

function Field({ label, value, onChange, textarea, placeholder }: any) {
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

function AdminHeroPage() {
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
    <AdminLayout title="Banners do Hero">
      <div className="space-y-6 pb-24">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-navy flex items-center gap-2">
                <Layout className="w-5 h-5 text-gold" />
                Configuração do Hero
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
                        onChange={(v: string) => updateHeroBanner(banner.id, { title: v })}
                        textarea
                      />
                      <Field
                        label="Subtítulo"
                        value={banner.subtitle}
                        onChange={(v: string) => updateHeroBanner(banner.id, { subtitle: v })}
                        textarea
                      />
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3 p-3 bg-muted/20 rounded-sm">
                          <Field
                            label="Texto CTA Primário"
                            value={banner.ctaPrimary}
                            onChange={(v: string) => updateHeroBanner(banner.id, { ctaPrimary: v })}
                          />
                          <Field
                            label="Link CTA Primário"
                            value={banner.ctaPrimaryLink || ""}
                            onChange={(v: string) => updateHeroBanner(banner.id, { ctaPrimaryLink: v })}
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
                            onChange={(v: string) => updateHeroBanner(banner.id, { ctaSecondary: v })}
                          />
                          <Field
                            label="Link CTA Secundário"
                            value={banner.ctaSecondaryLink || ""}
                            onChange={(v: string) => updateHeroBanner(banner.id, { ctaSecondaryLink: v })}
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
                        value={banner.imageDesktop || banner.image}
                        onChange={(v) => updateHeroBanner(banner.id, { imageDesktop: v, image: v })}
                      />
                      <ImageUpload
                        label="Tablet (1024x768)"
                        value={banner.imageTablet}
                        onChange={(v) => updateHeroBanner(banner.id, { imageTablet: v })}
                      />
                      <ImageUpload
                        label="Mobile (768x1024)"
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
