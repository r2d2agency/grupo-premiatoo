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
import { Save } from "lucide-react";


export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="mt-1 w-full border border-input rounded-sm px-3 py-2 text-sm"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full border border-input rounded-sm px-3 py-2 text-sm"
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

  if (loading) return null;

  return (
    <AdminLayout title="Gestão de Conteúdo">
      <div className="space-y-8 pb-20">
        {/* Hero */}
        <section className="bg-white rounded-md p-6 border shadow-sm space-y-4">
          <h2 className="font-display text-2xl text-navy flex items-center gap-2">
            <span className="w-1.5 h-6 bg-gold rounded-full" />
            Hero
          </h2>
          <Field label="Título" value={content.hero.title} onChange={(v) => update("hero", { ...content.hero, title: v })} textarea />
          <Field label="Subtítulo" value={content.hero.subtitle} onChange={(v) => update("hero", { ...content.hero, subtitle: v })} textarea />
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="CTA Primário" value={content.hero.ctaPrimary} onChange={(v) => update("hero", { ...content.hero, ctaPrimary: v })} />
            <Field label="CTA Secundário" value={content.hero.ctaSecondary} onChange={(v) => update("hero", { ...content.hero, ctaSecondary: v })} />
          </div>
          <Field label="Imagem (URL)" value={content.hero.image} onChange={(v) => update("hero", { ...content.hero, image: v })} />
        </section>

        {/* Stats */}
        <section className="bg-white rounded-md p-6 border shadow-sm space-y-4">
          <h2 className="font-display text-2xl text-navy flex items-center gap-2">
            <span className="w-1.5 h-6 bg-gold rounded-full" />
            Estatísticas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.stats.map((s, i) => (
              <div key={i} className="border border-border rounded-sm p-4 space-y-3 bg-gray-50/50">
                <Field label="Valor" value={s.value} onChange={(v) => {
                  const next = [...content.stats]; next[i] = { ...s, value: v }; update("stats", next);
                }} />
                <Field label="Legenda" value={s.label} onChange={(v) => {
                  const next = [...content.stats]; next[i] = { ...s, label: v }; update("stats", next);
                }} />
              </div>
            ))}
          </div>
        </section>

        {/* Garantias */}
        <section className="bg-white rounded-md p-6 border shadow-sm space-y-4">
          <h2 className="font-display text-2xl text-navy flex items-center gap-2">
            <span className="w-1.5 h-6 bg-gold rounded-full" />
            Cards de Garantias
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.garantias.map((g, i) => (
              <div key={i} className="border border-border rounded-sm p-4 space-y-3 bg-gray-50/50">
                <Field label="Título" value={g.title} onChange={(v) => {
                  const next = [...content.garantias]; next[i] = { ...g, title: v }; update("garantias", next);
                }} />
                <Field label="Ícone" value={g.icon} onChange={(v) => {
                  const next = [...content.garantias]; next[i] = { ...g, icon: v }; update("garantias", next);
                }} />
              </div>
            ))}
          </div>
        </section>

        {/* Capital */}
        <section className="bg-white rounded-md p-6 border shadow-sm space-y-4">
          <h2 className="font-display text-2xl text-navy flex items-center gap-2">
            <span className="w-1.5 h-6 bg-gold rounded-full" />
            Premiatto Capital
          </h2>
          <Field label="Título Geral" value={content.capital.title} onChange={(v) => update("capital", { ...content.capital, title: v })} textarea />
          <div className="grid md:grid-cols-2 gap-4">
            {content.capital.items.map((it, i) => (
              <div key={i} className="border border-border rounded-sm p-4 space-y-3 bg-gray-50/50">
                <Field label="Título" value={it.title} onChange={(v) => {
                  const items = [...content.capital.items]; items[i] = { ...it, title: v }; update("capital", { ...content.capital, items });
                }} />
                <Field label="Descrição" value={it.description} onChange={(v) => {
                  const items = [...content.capital.items]; items[i] = { ...it, description: v }; update("capital", { ...content.capital, items });
                }} textarea />
                <Field label="Ícone" value={it.icon} onChange={(v) => {
                  const items = [...content.capital.items]; items[i] = { ...it, icon: v }; update("capital", { ...content.capital, items });
                }} />
              </div>
            ))}
          </div>
        </section>

        <div className="fixed bottom-8 right-8">
          <Button
            onClick={save}
            size="lg"
            className="bg-navy hover:bg-navy/90 text-white shadow-2xl h-14 px-8 rounded-full"
          >
            <Save className="w-5 h-5 mr-2 text-gold" />
            SALVAR ALTERAÇÕES
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}

