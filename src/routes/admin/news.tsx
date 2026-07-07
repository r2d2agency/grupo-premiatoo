import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { defaultContent, fetchContent, getToken, saveContent, type SiteContent } from "@/lib/api";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save, Plus, Trash2, Newspaper, Eye, EyeOff } from "lucide-react";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const Route = createFileRoute("/admin/news")({
  component: AdminNewsPage,
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

function AdminNewsPage() {
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
    <AdminLayout title="Notícias">
      <div className="space-y-6 pb-24">
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
                const newItem: any = { 
                  id: crypto.randomUUID(),
                  title: "Nova Notícia", 
                  description: "", 
                  content: "",
                  image: "", 
                  link: "#", 
                  publishDate: new Date().toISOString().split('T')[0],
                  category: "Geral",
                  segment: "Mercado",
                  tags: [],
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
                        {item.active ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                        {item.active ? "Ativo" : "Inativo"}
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
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Field
                        label="Título da Notícia"
                        value={item.title}
                        onChange={(v: string) => {
                          const next = [...content.news];
                          next[index] = { ...item, title: v };
                          update("news", next);
                        }}
                        textarea
                      />
                      <Field
                        label="Resumo / Descrição"
                        value={item.description}
                        onChange={(v: string) => {
                          const next = [...content.news];
                          next[index] = { ...item, description: v };
                          update("news", next);
                        }}
                        textarea
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Field
                          label="Data de Publicação"
                          value={item.publishDate || ""}
                          onChange={(v: string) => {
                            const next = [...content.news];
                            next[index] = { ...item, publishDate: v };
                            update("news", next);
                          }}
                          placeholder="AAAA-MM-DD"
                        />
                        <Field
                          label="Link Externo (opcional)"
                          value={item.link || ""}
                          onChange={(v: string) => {
                            const next = [...content.news];
                            next[index] = { ...item, link: v };
                            update("news", next);
                          }}
                          placeholder="#"
                        />
                      </div>
                      <Field
                        label="Vídeo do YouTube (opcional)"
                        value={(item as any).videoUrl || ""}
                        onChange={(v: string) => {
                          const next = [...content.news];
                          next[index] = { ...item, videoUrl: v } as any;
                          update("news", next);
                        }}
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Field
                          label="Categoria"
                          value={item.category || ""}
                          onChange={(v: string) => {
                            const next = [...content.news];
                            next[index] = { ...item, category: v };
                            update("news", next);
                          }}
                          placeholder="Ex: Mercado, Empresa, Tutorial"
                        />
                        <Field
                          label="Segmento"
                          value={item.segment || ""}
                          onChange={(v: string) => {
                            const next = [...content.news];
                            next[index] = { ...item, segment: v };
                            update("news", next);
                          }}
                          placeholder="Ex: Garantias, Capital, Judicial"
                        />
                      </div>
                      <Field
                        label="Tags (separadas por vírgula)"
                        value={(item.tags || []).join(", ")}
                        onChange={(v: string) => {
                          const next = [...content.news];
                          next[index] = { ...item, tags: v.split(",").map(t => t.trim()).filter(Boolean) };
                          update("news", next);
                        }}
                        placeholder="tag1, tag2, tag3"
                      />
                      <Field
                        label="Conteúdo Completo"
                        value={item.content || ""}
                        onChange={(v: string) => {
                          const next = [...content.news];
                          next[index] = { ...item, content: v };
                          update("news", next);
                        }}
                        textarea
                        placeholder="Escreva a matéria completa aqui..."
                      />
                    </div>
                    <div className="space-y-4">
                      <ImageUpload
                        label="Capa da Notícia / Vídeo (800x600)"
                        value={item.image}
                        onChange={(v) => {
                          const next = [...content.news];
                          next[index] = { ...item, image: v };
                          update("news", next);
                        }}
                      />
                      {(item as any).videoUrl && (
                        <p className="text-xs text-muted-foreground">
                          Esta capa será exibida com um botão de play. Ao clicar, o vídeo do YouTube abre em tela cheia.
                        </p>
                      )}
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
