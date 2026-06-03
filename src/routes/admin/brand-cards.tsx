import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { defaultContent, fetchContent, getToken, saveContent, type SiteContent } from "@/lib/api";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save, Plus, Trash2, Sparkles } from "lucide-react";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/brand-cards")({
  component: AdminBrandCardsPage,
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

function AdminBrandCardsPage() {
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

  if (loading) return null;

  return (
    <AdminLayout title="Cards de Marca">
      <div className="space-y-6 pb-24">
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
                const newCard: any = { 
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
                        onChange={(v: string) => {
                          const next = [...content.brandCards];
                          next[index] = { ...card, title: v };
                          update("brandCards", next);
                        }}
                        textarea
                      />
                      <Field
                        label="Texto do Botão (CTA)"
                        value={card.cta}
                        onChange={(v: string) => {
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
