import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { defaultContent, fetchContent, getToken, saveContent, type SiteContent } from "@/lib/api";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save, Plus, Trash2, Shield, Scale, FileText, Gavel, Globe, Building, FileCheck2, Briefcase, Landmark, Handshake } from "lucide-react";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/garantias")({
  component: AdminGarantiasPage,
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

function AdminGarantiasPage() {
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
    <AdminLayout title="Garantias">
      <div className="space-y-6 pb-24">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-4 w-full">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-navy flex items-center gap-2">
                    <Shield className="w-5 h-5 text-gold" />
                    Cards de Garantias (Carrossel)
                  </CardTitle>
                  <CardDescription>Gerencie as modalidades de garantia exibidas no site.</CardDescription>
                </div>
                <Button 
                  onClick={() => {
                    const newItem = { 
                      id: crypto.randomUUID(), 
                      title: "Nova Garantia", 
                      description: "", 
                      content: "",
                      image: "",
                      link: "#", 
                      icon: "shield" 
                    };
                    update("garantias", [...content.garantias, newItem]);
                  }} 
                  size="sm" 
                  className="bg-navy hover:bg-navy/90 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Garantia
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="space-y-2">
                  <Label className="text-[11px] uppercase tracking-wider">Itens por Linha (Desktop)</Label>
                  <select
                    value={content.garantias[0]?.columns || 4}
                    onChange={(e) => {
                      const next = content.garantias.map(item => ({ ...item, columns: Number(e.target.value) }));
                      update("garantias", next);
                    }}
                    className="w-full border border-input rounded-sm px-3 py-2 text-sm"
                  >
                    <option value={3}>3 Itens</option>
                    <option value={4}>4 Itens</option>
                    <option value={5}>5 Itens</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px] uppercase tracking-wider">Estilo do Layout</Label>
                  <select
                    value={content.garantias[0]?.layout || "card"}
                    onChange={(e) => {
                      const next = content.garantias.map(item => ({ ...item, layout: e.target.value as any }));
                      update("garantias", next);
                    }}
                    className="w-full border border-input rounded-sm px-3 py-2 text-sm"
                  >
                    <option value="card">Card Moderno (Grande)</option>
                    <option value="minimal">Minimalista (Compacto)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px] uppercase tracking-wider">Alinhamento do Cabeçalho (Home)</Label>
                  <select
                    value={content.garantias[0]?.headerAlign || "left"}
                    onChange={(e) => {
                      const next = content.garantias.map(item => ({ ...item, headerAlign: e.target.value as any }));
                      update("garantias", next);
                    }}
                    className="w-full border border-input rounded-sm px-3 py-2 text-sm"
                  >
                    <option value="left">Esquerda</option>
                    <option value="center">Centro</option>
                    <option value="right">Direita</option>
                    <option value="justify">Justificado</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px] uppercase tracking-wider">Alinhamento dos Cards</Label>
                  <select
                    value={content.garantias[0]?.cardAlign || "left"}
                    onChange={(e) => {
                      const next = content.garantias.map(item => ({ ...item, cardAlign: e.target.value as any }));
                      update("garantias", next);
                    }}
                    className="w-full border border-input rounded-sm px-3 py-2 text-sm"
                  >
                    <option value="left">Esquerda</option>
                    <option value="center">Centro</option>
                    <option value="right">Direita</option>
                    <option value="justify">Justificado</option>
                  </select>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-8">
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

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Field label="Título" value={g.title} onChange={(v: string) => {
                        const next = [...content.garantias]; next[i] = { ...g, title: v }; update("garantias", next);
                      }} />
                      
                      <Field label="Descrição Curta (Card)" value={g.description || ""} onChange={(v: string) => {
                        const next = [...content.garantias]; next[i] = { ...g, description: v }; update("garantias", next);
                      }} textarea />
                      
                      <Field label="Link Interno / URL" value={g.link || ""} onChange={(v: string) => {
                        const next = [...content.garantias]; next[i] = { ...g, link: v }; update("garantias", next);
                      }} placeholder="/garantias/exemplo" />

                      <Field label="Conteúdo Detalhado" value={g.content || ""} onChange={(v: string) => {
                        const next = [...content.garantias]; next[i] = { ...g, content: v }; update("garantias", next);
                      }} textarea placeholder="Conteúdo que aparecerá na página interna da garantia..." />
                    </div>

                    <div className="space-y-4">
                      <ImageUpload
                        label="Imagem de Capa (Opcional)"
                        value={g.image || ""}
                        onChange={(v) => {
                          const next = [...content.garantias]; 
                          next[i] = { ...g, image: v }; 
                          update("garantias", next);
                        }}
                      />

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