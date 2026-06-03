import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { defaultContent, fetchContent, getToken, saveContent, type SiteContent } from "@/lib/api";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save, Globe, BarChart, Code, Target, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin/seo")({
  component: AdminSeoPage,
});

function AdminSeoPage() {
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

  async function save() {
    try {
      await saveContent(content);
      toast.success("Configurações de SEO salvas!");
    } catch (e) {
      toast.error("Erro ao salvar");
    }
  }

  if (loading) return null;

  const updateSeo = (field: keyof SiteContent["seo"], value: any) => {
    setContent(c => ({
      ...c,
      seo: { ...c.seo, [field]: value }
    }));
  };

  return (
    <AdminLayout title="SEO & Marketing">
      <div className="space-y-6 pb-24 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Configurações Globais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-brand-blue" />
                Indexação & Meta Tags
              </CardTitle>
              <CardDescription>Configure como o Google vê seu site.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Título Global (SEO Title)</Label>
                <Input 
                  value={content.seo.globalTitle} 
                  onChange={(e) => updateSeo("globalTitle", e.target.value)}
                  placeholder="Ex: Premiatto - Garantias e Capital"
                />
                <p className="text-[10px] text-muted-foreground">Recomendado: até 60 caracteres.</p>
              </div>
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Textarea 
                  value={content.seo.globalDescription} 
                  onChange={(e) => updateSeo("globalDescription", e.target.value)}
                  rows={4}
                  placeholder="Descreva o que sua empresa faz..."
                />
                <p className="text-[10px] text-muted-foreground">Recomendado: entre 120 e 160 caracteres.</p>
              </div>
              <div className="space-y-2">
                <Label>URL Canônica</Label>
                <Input 
                  value={content.seo.canonicalUrl} 
                  onChange={(e) => updateSeo("canonicalUrl", e.target.value)}
                  placeholder="https://suadominio.com.br"
                />
              </div>
            </CardContent>
          </Card>

          {/* Analytics & Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="w-5 h-5 text-green-600" />
                Métricas & Rastreamento
              </CardTitle>
              <CardDescription>Conecte suas ferramentas de marketing.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Google Analytics ID (G-XXXXX)</Label>
                <Input 
                  value={content.seo.googleAnalyticsId} 
                  onChange={(e) => updateSeo("googleAnalyticsId", e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
              <div className="space-y-2">
                <Label>Google Tag Manager ID (GTM-XXXX)</Label>
                <Input 
                  value={content.seo.googleTagManagerId} 
                  onChange={(e) => updateSeo("googleTagManagerId", e.target.value)}
                  placeholder="GTM-XXXXXXX"
                />
              </div>
              <div className="space-y-2">
                <Label>Facebook Pixel ID</Label>
                <Input 
                  value={content.seo.facebookPixelId} 
                  onChange={(e) => updateSeo("facebookPixelId", e.target.value)}
                  placeholder="1234567890"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scripts Customizados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5 text-gold" />
              Scripts Adicionais & UTMs
            </CardTitle>
            <CardDescription>Insira códigos personalizados para rastreamento de conversão ou UTMs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-xs text-amber-800 leading-relaxed">
                Use este campo para inserir scripts de chatbots, ferramentas de CRM (como RD Station ou Hubspot) ou qualquer código que precise rodar no cabeçalho ou corpo do site.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Scripts Customizados (Global)</Label>
              <Textarea 
                value={content.seo.scripts?.[0]?.content || ""} 
                onChange={(e) => updateSeo("scripts", [{ placement: "head", content: e.target.value }])}
                rows={8}
                placeholder="<!-- Cole seus scripts aqui -->"
                className="font-mono text-xs bg-slate-900 text-slate-300"
              />
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
            SALVAR CONFIGURAÇÕES DE SEO
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
