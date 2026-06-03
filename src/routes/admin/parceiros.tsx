import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { defaultContent, fetchContent, getToken, saveContent, type SiteContent } from "@/lib/api";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save, Plus, Trash2, Handshake } from "lucide-react";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const Route = createFileRoute("/admin/parceiros")({
  component: AdminParceirosPage,
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

function AdminParceirosPage() {
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
    <AdminLayout title="Parceiros">
      <div className="space-y-6 pb-24">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-navy flex items-center gap-2">
                <Handshake className="w-5 h-5 text-gold" />
                Cards de Parceiros / Capital
              </CardTitle>
              <CardDescription>Configure os dois cards informativos abaixo da área de notícias.</CardDescription>
            </div>
            <Button 
              onClick={() => {
                const newItem = { tag: "TAG", title: "Novo Card", cta: "SAIBA MAIS", image: "", link: "#" };
                update("parceiros", [...content.parceiros, newItem]);
              }} 
              size="sm" 
              disabled={content.parceiros.length >= 2}
              className="bg-navy hover:bg-navy/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Card
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {content.parceiros.map((item, index) => (
                <div key={index} className="border rounded-lg p-6 bg-white shadow-sm space-y-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      const next = content.parceiros.filter((_, i) => i !== index);
                      update("parceiros", next);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  
                  <div className="space-y-4">
                    <Field
                      label="Tag (ex: PARCEIROS)"
                      value={item.tag}
                      onChange={(v: string) => {
                        const next = [...content.parceiros];
                        next[index] = { ...item, tag: v };
                        update("parceiros", next);
                      }}
                    />
                    <Field
                      label="Título"
                      value={item.title}
                      textarea
                      onChange={(v: string) => {
                        const next = [...content.parceiros];
                        next[index] = { ...item, title: v };
                        update("parceiros", next);
                      }}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Field
                        label="Texto do CTA"
                        value={item.cta}
                        onChange={(v: string) => {
                          const next = [...content.parceiros];
                          next[index] = { ...item, cta: v };
                          update("parceiros", next);
                        }}
                      />
                      <Field
                        label="Link do CTA"
                        value={item.link}
                        onChange={(v: string) => {
                          const next = [...content.parceiros];
                          next[index] = { ...item, link: v };
                          update("parceiros", next);
                        }}
                      />
                    </div>
                    <ImageUpload
                      label="Imagem"
                      value={item.image}
                      onChange={(v) => {
                        const next = [...content.parceiros];
                        next[index] = { ...item, image: v };
                        update("parceiros", next);
                      }}
                    />
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
