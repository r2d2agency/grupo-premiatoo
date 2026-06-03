import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { defaultContent, fetchContent, getToken, saveContent, type SiteContent } from "@/lib/api";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save, Building2, History, Target, Users, Layout } from "lucide-react";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/institucional")({
  component: AdminInstitucionalPage,
});

function Field({ label, value, onChange, textarea, placeholder }: any) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
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

function AdminInstitucionalPage() {
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

  function updateInst<K extends keyof SiteContent["institucional"]>(key: K, value: SiteContent["institucional"][K]) {
    setContent((c) => ({
      ...c,
      institucional: { ...c.institucional, [key]: value }
    }));
  }

  async function save() {
    try {
      await saveContent(content);
      toast.success("Alterações institucionais salvas!");
    } catch (e) {
      toast.error("Erro ao salvar");
    }
  }

  if (loading) return null;

  const inst = content.institucional;

  return (
    <AdminLayout title="Página Institucional">
      <div className="space-y-10 pb-32 max-w-5xl">
        
        {/* HERO */}
        <Card>
          <CardHeader>
            <CardTitle className="text-navy flex items-center gap-2">
              <Layout className="w-5 h-5 text-gold" />
              Seção 01 — Hero
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid lg:grid-cols-[1fr_300px] gap-8">
              <div className="space-y-4">
                <Field label="Título" value={inst.hero.title} onChange={(v:any) => updateInst("hero", {...inst.hero, title:v})} textarea />
                <Field label="Subtítulo" value={inst.hero.subtitle} onChange={(v:any) => updateInst("hero", {...inst.hero, subtitle:v})} textarea />
                <Field label="Texto do Botão" value={inst.hero.ctaLabel} onChange={(v:any) => updateInst("hero", {...inst.hero, ctaLabel:v})} />
              </div>
              <ImageUpload label="Imagem de Fundo" value={inst.hero.image} onChange={(v:any) => updateInst("hero", {...inst.hero, image:v})} />
            </div>
          </CardContent>
        </Card>

        {/* HISTÓRIA */}
        <Card>
          <CardHeader>
            <CardTitle className="text-navy flex items-center gap-2">
              <History className="w-5 h-5 text-gold" />
              Seção 02 — Nossa História
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid lg:grid-cols-[1fr_300px] gap-8">
              <div className="space-y-4">
                <Field label="Título" value={inst.historia.title} onChange={(v:any) => updateInst("historia", {...inst.historia, title:v})} />
                <Field label="Texto Institucional" value={inst.historia.text} onChange={(v:any) => updateInst("historia", {...inst.historia, text:v})} textarea />
              </div>
              <ImageUpload label="Imagem Lateral" value={inst.historia.image} onChange={(v:any) => updateInst("historia", {...inst.historia, image:v})} />
            </div>
          </CardContent>
        </Card>

        {/* PREMIATTO HOJE */}
        <Card>
          <CardHeader>
            <CardTitle className="text-navy flex items-center gap-2">
              <Building2 className="w-5 h-5 text-gold" />
              Seção 03 — O Premiatto Hoje
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid lg:grid-cols-[1fr_300px] gap-8">
              <div className="space-y-4">
                <Field label="Título" value={inst.hoje.title} onChange={(v:any) => updateInst("hoje", {...inst.hoje, title:v})} />
                <Field label="Texto Complementar" value={inst.hoje.text} onChange={(v:any) => updateInst("hoje", {...inst.hoje, text:v})} textarea />
              </div>
              <ImageUpload label="Imagem Equipe" value={inst.hoje.image} onChange={(v:any) => updateInst("hoje", {...inst.hoje, image:v})} />
            </div>
          </CardContent>
        </Card>

        {/* LIDERANÇA */}
        <Card>
          <CardHeader>
            <CardTitle className="text-navy flex items-center gap-2">
              <Users className="w-5 h-5 text-gold" />
              Seção 07 — Liderança (CEO)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid lg:grid-cols-[1fr_300px] gap-8">
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Nome" value={inst.lideranca.name} onChange={(v:any) => updateInst("lideranca", {...inst.lideranca, name:v})} />
                  <Field label="Cargo" value={inst.lideranca.role} onChange={(v:any) => updateInst("lideranca", {...inst.lideranca, role:v})} />
                </div>
                <Field label="Biografia" value={inst.lideranca.bio} onChange={(v:any) => updateInst("lideranca", {...inst.lideranca, bio:v})} textarea />
                <div className="space-y-2">
                  <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">Posições/Títulos (uma por linha)</Label>
                  <textarea
                    value={inst.lideranca.positions.join('\n')}
                    onChange={(e) => updateInst("lideranca", {...inst.lideranca, positions: e.target.value.split('\n')})}
                    rows={4}
                    className="w-full border border-input rounded-sm px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <ImageUpload label="Foto Executiva" value={inst.lideranca.photo} onChange={(v:any) => updateInst("lideranca", {...inst.lideranca, photo:v})} />
            </div>
          </CardContent>
        </Card>

        {/* MANIFESTO */}
        <Card>
          <CardHeader>
            <CardTitle className="text-navy flex items-center gap-2">
              <Target className="w-5 h-5 text-gold" />
              Seção 09 — Manifesto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Field label="Texto do Manifesto" value={inst.manifesto.text} onChange={(v:any) => updateInst("manifesto", {text:v})} textarea />
          </CardContent>
        </Card>

        {/* CTA FINAL */}
        <Card>
          <CardHeader>
            <CardTitle className="text-navy flex items-center gap-2">
              <Layout className="w-5 h-5 text-gold" />
              Seção 10 — CTA Final
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid lg:grid-cols-[1fr_300px] gap-8">
              <div className="space-y-4">
                <Field label="Título" value={inst.ctaFinal.title} onChange={(v:any) => updateInst("ctaFinal", {...inst.ctaFinal, title:v})} />
                <Field label="Texto" value={inst.ctaFinal.text} onChange={(v:any) => updateInst("ctaFinal", {...inst.ctaFinal, text:v})} textarea />
                <Field label="Texto do Botão" value={inst.ctaFinal.ctaLabel} onChange={(v:any) => updateInst("ctaFinal", {...inst.ctaFinal, ctaLabel:v})} />
              </div>
              <ImageUpload label="Imagem de Fundo" value={inst.ctaFinal.image} onChange={(v:any) => updateInst("ctaFinal", {...inst.ctaFinal, image:v})} />
            </div>
          </CardContent>
        </Card>

        <div className="fixed bottom-8 right-8 z-50">
          <Button onClick={save} size="lg" className="bg-navy hover:bg-navy/90 text-white shadow-2xl h-14 px-8 rounded-full border border-gold/30">
            <Save className="w-5 h-5 mr-2 text-gold" />
            SALVAR INSTITUCIONAL
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}