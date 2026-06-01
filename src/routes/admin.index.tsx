import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  clearToken,
  defaultContent,
  fetchContent,
  getToken,
  saveContent,
  type SiteContent,
} from "@/lib/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserManagement } from "@/components/UserManagement";
import { Settings, Layout, Users } from "lucide-react";

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
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!getToken()) {
      navigate({ to: "/admin/login" });
      return;
    }
    fetchContent().then(setContent);
  }, [navigate]);

  function update<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setContent((c) => ({ ...c, [key]: value }));
  }

  async function save() {
    setStatus("Salvando...");
    try {
      await saveContent(content);
      setStatus("Salvo com sucesso!");
      setTimeout(() => setStatus(null), 2500);
    } catch (e) {
      setStatus((e as Error).message);
    }
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-navy text-navy-foreground">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <div className="font-display text-xl">Premiatto CMS</div>
          <div className="flex items-center gap-3 text-sm">
            <Link to="/" className="opacity-80 hover:opacity-100">Ver site</Link>
            <button
              onClick={() => {
                clearToken();
                navigate({ to: "/admin/login" });
              }}
              className="opacity-80 hover:opacity-100"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <Tabs defaultValue="content" className="space-y-8">
          <TabsList className="bg-background border">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Conteúdo
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Usuários
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-8 outline-none">
            {/* Hero */}
            <section className="bg-background rounded-md p-6 border space-y-4">
              <h2 className="font-display text-2xl text-navy">Hero</h2>
              <Field label="Título" value={content.hero.title} onChange={(v) => update("hero", { ...content.hero, title: v })} textarea />
              <Field label="Subtítulo" value={content.hero.subtitle} onChange={(v) => update("hero", { ...content.hero, subtitle: v })} textarea />
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="CTA Primário" value={content.hero.ctaPrimary} onChange={(v) => update("hero", { ...content.hero, ctaPrimary: v })} />
                <Field label="CTA Secundário" value={content.hero.ctaSecondary} onChange={(v) => update("hero", { ...content.hero, ctaSecondary: v })} />
              </div>
              <Field label="Imagem (URL)" value={content.hero.image} onChange={(v) => update("hero", { ...content.hero, image: v })} />
            </section>

            {/* Stats */}
            <section className="bg-background rounded-md p-6 border space-y-4">
              <h2 className="font-display text-2xl text-navy">Estatísticas</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {content.stats.map((s, i) => (
                  <div key={i} className="border border-border rounded-sm p-4 space-y-3">
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
            <section className="bg-background rounded-md p-6 border space-y-4">
              <h2 className="font-display text-2xl text-navy">Cards de Garantias</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {content.garantias.map((g, i) => (
                  <div key={i} className="border border-border rounded-sm p-4 space-y-3">
                    <Field label="Título" value={g.title} onChange={(v) => {
                      const next = [...content.garantias]; next[i] = { ...g, title: v }; update("garantias", next);
                    }} />
                    <Field label="Ícone (scale, file, gavel, globe, building, file-check)" value={g.icon} onChange={(v) => {
                      const next = [...content.garantias]; next[i] = { ...g, icon: v }; update("garantias", next);
                    }} />
                  </div>
                ))}
              </div>
            </section>

            {/* Capital */}
            <section className="bg-background rounded-md p-6 border space-y-4">
              <h2 className="font-display text-2xl text-navy">Premiatto Capital</h2>
              <Field label="Título" value={content.capital.title} onChange={(v) => update("capital", { ...content.capital, title: v })} textarea />
              <div className="grid md:grid-cols-2 gap-4">
                {content.capital.items.map((it, i) => (
                  <div key={i} className="border border-border rounded-sm p-4 space-y-3">
                    <Field label="Título" value={it.title} onChange={(v) => {
                      const items = [...content.capital.items]; items[i] = { ...it, title: v }; update("capital", { ...content.capital, items });
                    }} />
                    <Field label="Descrição" value={it.description} onChange={(v) => {
                      const items = [...content.capital.items]; items[i] = { ...it, description: v }; update("capital", { ...content.capital, items });
                    }} textarea />
                    <Field label="Ícone (dollar, chart, shield, network, users)" value={it.icon} onChange={(v) => {
                      const items = [...content.capital.items]; items[i] = { ...it, icon: v }; update("capital", { ...content.capital, items });
                    }} />
                  </div>
                ))}
              </div>
            </section>

            <div className="flex items-center justify-end gap-3 sticky bottom-4">
              {status && <span className="text-sm text-muted-foreground">{status}</span>}
              <button
                onClick={save}
                className="bg-brand-blue text-brand-blue-foreground px-6 py-3 rounded-sm text-sm font-semibold tracking-wider shadow-lg"
              >
                SALVAR ALTERAÇÕES
              </button>
            </div>
          </TabsContent>

          <TabsContent value="users" className="outline-none">
            <UserManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
