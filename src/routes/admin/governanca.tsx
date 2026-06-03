import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { defaultContent, fetchContent, getToken, saveContent, type SiteContent } from "@/lib/api";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save, Plus, Trash2, Scale, Type } from "lucide-react";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/admin/governanca")({
  component: AdminGovernancaPage,
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

function AdminGovernancaPage() {
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
    <AdminLayout title="Governança">
      <div className="space-y-6 pb-24">
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
                  onChange={(v: string) => update("governanca", { ...content.governanca, badge: v })} 
                />
                <Field 
                  label="Título" 
                  value={content.governanca.title} 
                  onChange={(v: string) => update("governanca", { ...content.governanca, title: v })} 
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
                  onChange={(v: string) => update("governanca", { ...content.governanca, description: v })} 
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
                      onChange={(e) => {
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
