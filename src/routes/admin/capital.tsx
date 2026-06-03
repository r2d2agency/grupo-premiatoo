import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { defaultContent, fetchContent, getToken, saveContent, type SiteContent } from "@/lib/api";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save, Landmark } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const Route = createFileRoute("/admin/capital")({
  component: AdminCapitalPage,
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

function AdminCapitalPage() {
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
    <AdminLayout title="Capital">
      <div className="space-y-6 pb-24">
        <Card>
          <CardHeader>
            <CardTitle className="text-navy flex items-center gap-2">
              <Landmark className="w-5 h-5 text-gold" />
              Premiatto Capital
            </CardTitle>
            <CardDescription>Soluções financeiras estruturadas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Field label="Título da Seção" value={content.capital.title} onChange={(v: string) => update("capital", { ...content.capital, title: v })} textarea />
            <div className="grid md:grid-cols-2 gap-4">
              {content.capital.items.map((it, i) => (
                <div key={i} className="border border-border rounded-md p-4 space-y-3 bg-white">
                  <Field label="Título" value={it.title} onChange={(v: string) => {
                    const items = [...content.capital.items]; items[i] = { ...it, title: v }; update("capital", { ...content.capital, items });
                  }} />
                  <Field label="Descrição" value={it.description} onChange={(v: string) => {
                    const items = [...content.capital.items]; items[i] = { ...it, description: v }; update("capital", { ...content.capital, items });
                  }} textarea />
                  <Field label="Ícone (Lucide)" value={it.icon} onChange={(v: string) => {
                    const items = [...content.capital.items]; items[i] = { ...it, icon: v }; update("capital", { ...content.capital, items });
                  }} />
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
