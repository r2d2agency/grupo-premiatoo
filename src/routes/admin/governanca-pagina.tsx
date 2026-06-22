import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { defaultContent, fetchContent, getToken, saveContent, type SiteContent } from "@/lib/api";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save, Plus, Trash2 } from "lucide-react";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/admin/governanca-pagina")({
  component: AdminGovernancaPaginaPage,
});

type Align = "left" | "center" | "right" | "justify";

function Field({ label, value, onChange, textarea, rows = 3, placeholder }: any) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className="mt-1 w-full border border-input rounded-sm px-3 py-2 text-sm"
        />
      ) : (
        <input
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="mt-1 w-full border border-input rounded-sm px-3 py-2 text-sm"
        />
      )}
    </label>
  );
}

function Typo({ label, size, align, onSize, onAlign }: {
  label: string;
  size?: number; align?: Align;
  onSize: (n: number) => void; onAlign: (a: Align) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 p-3 bg-muted/40 rounded">
      <div>
        <Label className="text-[10px] uppercase tracking-wider">{label} — Tamanho (px)</Label>
        <Input type="number" min={10} max={120} value={size ?? ""} onChange={(e) => onSize(Number(e.target.value))} />
      </div>
      <div>
        <Label className="text-[10px] uppercase tracking-wider">{label} — Alinhamento</Label>
        <select
          value={align ?? "left"}
          onChange={(e) => onAlign(e.target.value as Align)}
          className="mt-1 w-full border border-input rounded-sm px-3 py-2 text-sm bg-background h-9"
        >
          <option value="left">Esquerda</option>
          <option value="center">Centro</option>
          <option value="right">Direita</option>
          <option value="justify">Justificado</option>
        </select>
      </div>
    </div>
  );
}

function AdminGovernancaPaginaPage() {
  const navigate = useNavigate();
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getToken()) { navigate({ to: "/admin/login" }); return; }
    fetchContent().then((data) => { setContent(data); setLoading(false); });
  }, [navigate]);

  function patch<K extends keyof SiteContent["governancaPage"]>(key: K, value: Partial<SiteContent["governancaPage"][K]>) {
    setContent((c) => ({
      ...c,
      governancaPage: { ...c.governancaPage, [key]: { ...(c.governancaPage[key] as any), ...value } },
    }));
  }

  async function save() {
    try { await saveContent(content); toast.success("Alterações salvas!"); }
    catch { toast.error("Erro ao salvar"); }
  }

  if (loading) return null;
  const g = content.governancaPage;

  return (
    <AdminLayout title="Página Governança">
      <div className="space-y-6 pb-28">
        {/* HERO */}
        <Card>
          <CardHeader>
            <CardTitle>1. Hero</CardTitle>
            <CardDescription>Banner principal da página.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Título" value={g.hero.title} textarea onChange={(v: string) => patch("hero", { title: v })} />
            <Field label="Subtítulo" value={g.hero.subtitle} textarea onChange={(v: string) => patch("hero", { subtitle: v })} />
            <ImageUpload label="Imagem de Fundo" value={g.hero.image} onChange={(v) => patch("hero", { image: v })} />
            <Typo label="Título" size={g.hero.titleSize} align={g.hero.titleAlign}
              onSize={(n) => patch("hero", { titleSize: n })} onAlign={(a) => patch("hero", { titleAlign: a })} />
            <Typo label="Subtítulo" size={g.hero.subtitleSize} align={g.hero.subtitleAlign}
              onSize={(n) => patch("hero", { subtitleSize: n })} onAlign={(a) => patch("hero", { subtitleAlign: a })} />
          </CardContent>
        </Card>

        {/* INTRO */}
        <Card>
          <CardHeader>
            <CardTitle>2. O que entendemos por Governança</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Badge" value={g.intro.badge} onChange={(v: string) => patch("intro", { badge: v })} />
            <Field label="Título" value={g.intro.title} textarea onChange={(v: string) => patch("intro", { title: v })} />
            <Field label="Texto" value={g.intro.text} textarea rows={5} onChange={(v: string) => patch("intro", { text: v })} />
            <ImageUpload label="Imagem Lateral" value={g.intro.image} onChange={(v) => patch("intro", { image: v })} />
            <Typo label="Título" size={g.intro.titleSize} align={g.intro.titleAlign}
              onSize={(n) => patch("intro", { titleSize: n })} onAlign={(a) => patch("intro", { titleAlign: a })} />
            <Typo label="Texto" size={g.intro.textSize} align={g.intro.textAlign}
              onSize={(n) => patch("intro", { textSize: n })} onAlign={(a) => patch("intro", { textAlign: a })} />
          </CardContent>
        </Card>

        {/* PROCESSO */}
        <Card>
          <CardHeader>
            <CardTitle>3. Como tomamos decisões</CardTitle>
            <CardDescription>Etapas do processo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Badge" value={g.processo.badge} onChange={(v: string) => patch("processo", { badge: v })} />
            <Typo label="Título do Item" size={g.processo.titleSize} align={g.processo.itemAlign}
              onSize={(n) => patch("processo", { titleSize: n })} onAlign={(a) => patch("processo", { itemAlign: a })} />
            <div>
              <Label className="text-[10px] uppercase tracking-wider">Descrição — Tamanho (px)</Label>
              <Input type="number" value={g.processo.descriptionSize ?? ""} onChange={(e) => patch("processo", { descriptionSize: Number(e.target.value) })} />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-[11px] uppercase tracking-wider">Etapas</Label>
                <Button size="sm" variant="outline" onClick={() => patch("processo", { steps: [...g.processo.steps, { number: String(g.processo.steps.length + 1).padStart(2, "0"), title: "Nova etapa", description: "" }] })}>
                  <Plus className="w-4 h-4 mr-1" /> Adicionar
                </Button>
              </div>
              {g.processo.steps.map((s, i) => (
                <div key={i} className="grid grid-cols-[60px_1fr_2fr_auto] gap-2 items-start border p-3 rounded">
                  <Input value={s.number} onChange={(e) => { const next = [...g.processo.steps]; next[i] = { ...s, number: e.target.value }; patch("processo", { steps: next }); }} />
                  <Input value={s.title} onChange={(e) => { const next = [...g.processo.steps]; next[i] = { ...s, title: e.target.value }; patch("processo", { steps: next }); }} />
                  <textarea value={s.description} rows={2} className="border border-input rounded-sm px-2 py-1 text-sm" onChange={(e) => { const next = [...g.processo.steps]; next[i] = { ...s, description: e.target.value }; patch("processo", { steps: next }); }} />
                  <Button size="icon" variant="ghost" className="text-destructive" onClick={() => patch("processo", { steps: g.processo.steps.filter((_, idx) => idx !== i) })}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* RISCOS */}
        <Card>
          <CardHeader>
            <CardTitle>4. Gestão de Riscos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Badge" value={g.riscos.badge} onChange={(v: string) => patch("riscos", { badge: v })} />
            <Field label="Título" value={g.riscos.title} textarea onChange={(v: string) => patch("riscos", { title: v })} />
            <Field label="Texto" value={g.riscos.text} textarea rows={5} onChange={(v: string) => patch("riscos", { text: v })} />
            <ImageUpload label="Imagem de Fundo" value={g.riscos.image} onChange={(v) => patch("riscos", { image: v })} />
            <Typo label="Título" size={g.riscos.titleSize} align={g.riscos.titleAlign}
              onSize={(n) => patch("riscos", { titleSize: n })} onAlign={(a) => patch("riscos", { titleAlign: a })} />
            <Typo label="Texto" size={g.riscos.textSize} align={g.riscos.textAlign}
              onSize={(n) => patch("riscos", { textSize: n })} onAlign={(a) => patch("riscos", { textAlign: a })} />
          </CardContent>
        </Card>

        {/* PRINCÍPIOS */}
        <Card>
          <CardHeader>
            <CardTitle>5. Princípios</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Badge" value={g.principios.badge} onChange={(v: string) => patch("principios", { badge: v })} />
            <Field label="Título (opcional)" value={g.principios.title} onChange={(v: string) => patch("principios", { title: v })} />
            <Field label="Texto" value={g.principios.text} textarea onChange={(v: string) => patch("principios", { text: v })} />
            <Typo label="Título" size={g.principios.titleSize} align={g.principios.titleAlign}
              onSize={(n) => patch("principios", { titleSize: n })} onAlign={(a) => patch("principios", { titleAlign: a })} />
            <Typo label="Texto" size={g.principios.textSize} align={g.principios.textAlign}
              onSize={(n) => patch("principios", { textSize: n })} onAlign={(a) => patch("principios", { textAlign: a })} />
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-[11px] uppercase tracking-wider">Princípios</Label>
                <Button size="sm" variant="outline" onClick={() => patch("principios", { items: [...g.principios.items, "Novo princípio"] })}>
                  <Plus className="w-4 h-4 mr-1" /> Adicionar
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                {g.principios.items.map((it, i) => (
                  <div key={i} className="flex gap-2">
                    <Input value={it} onChange={(e) => { const next = [...g.principios.items]; next[i] = e.target.value; patch("principios", { items: next }); }} />
                    <Button size="icon" variant="ghost" className="text-destructive" onClick={() => patch("principios", { items: g.principios.items.filter((_, idx) => idx !== i) })}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA FINAL */}
        <Card>
          <CardHeader>
            <CardTitle>6. CTA Final</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Título" value={g.ctaFinal.title} textarea onChange={(v: string) => patch("ctaFinal", { title: v })} />
            <Field label="Texto" value={g.ctaFinal.text} textarea onChange={(v: string) => patch("ctaFinal", { text: v })} />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Texto do Botão" value={g.ctaFinal.ctaLabel} onChange={(v: string) => patch("ctaFinal", { ctaLabel: v })} />
              <Field label="Link do Botão" value={g.ctaFinal.ctaHref} onChange={(v: string) => patch("ctaFinal", { ctaHref: v })} />
            </div>
            <ImageUpload label="Imagem de Fundo" value={g.ctaFinal.image} onChange={(v) => patch("ctaFinal", { image: v })} />
            <Typo label="Título" size={g.ctaFinal.titleSize} align={g.ctaFinal.titleAlign}
              onSize={(n) => patch("ctaFinal", { titleSize: n })} onAlign={(a) => patch("ctaFinal", { titleAlign: a })} />
            <Typo label="Texto" size={g.ctaFinal.textSize} align={g.ctaFinal.textAlign}
              onSize={(n) => patch("ctaFinal", { textSize: n })} onAlign={(a) => patch("ctaFinal", { textAlign: a })} />
          </CardContent>
        </Card>

        <div className="fixed bottom-8 right-8 z-50">
          <Button onClick={save} size="lg" className="bg-navy hover:bg-navy/90 text-white shadow-2xl h-14 px-8 rounded-full border border-gold/30">
            <Save className="w-5 h-5 mr-2 text-gold" /> PUBLICAR ALTERAÇÕES
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
