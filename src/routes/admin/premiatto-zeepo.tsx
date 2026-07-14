import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { defaultContent, fetchContent, getToken, saveContent, type SiteContent } from "@/lib/api";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { toast } from "sonner";
import { Save, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/premiatto-zeepo")({
  component: AdminPremiattoZeepo,
});

/* ---------- Reusable inputs ---------- */
function Field({ label, value, onChange, textarea, placeholder, rows = 3 }: any) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className="mt-1 w-full border border-input rounded-sm px-3 py-2 text-sm"
        />
      ) : (
        <input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="mt-1 w-full border border-input rounded-sm px-3 py-2 text-sm"
        />
      )}
    </label>
  );
}

function SizeAlign({ size, align, onSize, onAlign, label = "" }: any) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <label className="block">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Tamanho {label} (px)</span>
        <input
          type="number"
          value={size || 0}
          onChange={(e) => onSize(Number(e.target.value))}
          className="mt-1 w-full border border-input rounded-sm px-3 py-2 text-sm"
        />
      </label>
      <label className="block">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Alinhamento {label}</span>
        <select
          value={align || "left"}
          onChange={(e) => onAlign(e.target.value)}
          className="mt-1 w-full border border-input rounded-sm px-3 py-2 text-sm"
        >
          <option value="left">Esquerda</option>
          <option value="center">Centro</option>
          <option value="right">Direita</option>
          <option value="justify">Justificado</option>
        </select>
      </label>
    </div>
  );
}

/* ---------- Page ---------- */
function AdminPremiattoZeepo() {
  const navigate = useNavigate();
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getToken()) { navigate({ to: "/admin/login" }); return; }
    fetchContent().then((c) => { setContent(c); setLoading(false); });
  }, [navigate]);

  const pz = content.premiattoZeepo;
  function updatePZ(patch: Partial<SiteContent["premiattoZeepo"]>) {
    setContent((c) => ({ ...c, premiattoZeepo: { ...c.premiattoZeepo, ...patch } }));
  }

  async function save() {
    try { await saveContent(content); toast.success("Alterações salvas!"); }
    catch { toast.error("Erro ao salvar"); }
  }

  if (loading) return null;

  return (
    <AdminLayout title="Landing Page — Premiatto Locadora + Zeepo">
      <div className="pb-24 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-navy">Configuração da Landing Page</CardTitle>
            <CardDescription>
              URL pública: <code>/premiatto-zeepo</code>. Edite as seções abaixo e publique.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="header" className="w-full">
              <TabsList className="grid grid-cols-4 lg:grid-cols-8 mb-6 w-full">
                <TabsTrigger value="header">Header</TabsTrigger>
                <TabsTrigger value="hero">Hero</TabsTrigger>
                <TabsTrigger value="parceria">Parceria</TabsTrigger>
                <TabsTrigger value="beneficios">Benefícios</TabsTrigger>
                <TabsTrigger value="solucoes">Soluções</TabsTrigger>
                <TabsTrigger value="cta">CTA</TabsTrigger>
                <TabsTrigger value="form">Formulário</TabsTrigger>
                <TabsTrigger value="footer">Rodapé</TabsTrigger>
              </TabsList>

              {/* HEADER */}
              <TabsContent value="header" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <ImageUpload label="Logo Premiatto Locadora" value={pz.header.logoPremiatto} onChange={(v) => updatePZ({ header: { ...pz.header, logoPremiatto: v } })} />
                  <ImageUpload label="Logo Zeepo" value={pz.header.logoZeepo} onChange={(v) => updatePZ({ header: { ...pz.header, logoZeepo: v } })} />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Texto do botão CTA" value={pz.header.ctaLabel} onChange={(v: string) => updatePZ({ header: { ...pz.header, ctaLabel: v } })} />
                  <Field label="Link do botão CTA" value={pz.header.ctaHref} onChange={(v: string) => updatePZ({ header: { ...pz.header, ctaHref: v } })} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-navy">Menu</span>
                    <Button size="sm" variant="outline" onClick={() => updatePZ({ header: { ...pz.header, menu: [...pz.header.menu, { label: "Novo", href: "#" }] } })}>
                      <Plus className="w-3 h-3 mr-1" /> Item
                    </Button>
                  </div>
                  {pz.header.menu.map((m, i) => (
                    <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 mb-2">
                      <input value={m.label} onChange={(e) => { const n = [...pz.header.menu]; n[i] = { ...m, label: e.target.value }; updatePZ({ header: { ...pz.header, menu: n } }); }} placeholder="Label" className="border border-input rounded-sm px-3 py-2 text-sm" />
                      <input value={m.href} onChange={(e) => { const n = [...pz.header.menu]; n[i] = { ...m, href: e.target.value }; updatePZ({ header: { ...pz.header, menu: n } }); }} placeholder="Link" className="border border-input rounded-sm px-3 py-2 text-sm" />
                      <Button variant="ghost" size="sm" onClick={() => updatePZ({ header: { ...pz.header, menu: pz.header.menu.filter((_, x) => x !== i) } })}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* HERO */}
              <TabsContent value="hero" className="space-y-4">
                <Field label="Badge (chamada superior)" value={pz.hero.badge} onChange={(v: string) => updatePZ({ hero: { ...pz.hero, badge: v } })} />
                <Field label="Título" value={pz.hero.title} onChange={(v: string) => updatePZ({ hero: { ...pz.hero, title: v } })} textarea />
                <Field label="Destaque do título (em itálico/cyan)" value={pz.hero.titleHighlight} onChange={(v: string) => updatePZ({ hero: { ...pz.hero, titleHighlight: v } })} />
                <SizeAlign size={pz.hero.titleSize} align={pz.hero.titleAlign} onSize={(v: number) => updatePZ({ hero: { ...pz.hero, titleSize: v } })} onAlign={(v: any) => updatePZ({ hero: { ...pz.hero, titleAlign: v } })} label="título" />
                <Field label="Texto" value={pz.hero.text} onChange={(v: string) => updatePZ({ hero: { ...pz.hero, text: v } })} textarea rows={4} />
                <SizeAlign size={pz.hero.textSize} align={pz.hero.textAlign} onSize={(v: number) => updatePZ({ hero: { ...pz.hero, textSize: v } })} onAlign={(v: any) => updatePZ({ hero: { ...pz.hero, textAlign: v } })} label="texto" />
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Botão principal" value={pz.hero.ctaPrimary} onChange={(v: string) => updatePZ({ hero: { ...pz.hero, ctaPrimary: v } })} />
                  <Field label="Link principal" value={pz.hero.ctaPrimaryHref} onChange={(v: string) => updatePZ({ hero: { ...pz.hero, ctaPrimaryHref: v } })} />
                  <Field label="Botão secundário" value={pz.hero.ctaSecondary} onChange={(v: string) => updatePZ({ hero: { ...pz.hero, ctaSecondary: v } })} />
                  <Field label="Link secundário" value={pz.hero.ctaSecondaryHref} onChange={(v: string) => updatePZ({ hero: { ...pz.hero, ctaSecondaryHref: v } })} />
                </div>
                <Field label="Intervalo do carrossel (ms)" value={String(pz.hero.interval)} onChange={(v: string) => updatePZ({ hero: { ...pz.hero, interval: Number(v) || 5000 } })} />
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-navy">Slides do Carrossel</span>
                    <Button size="sm" variant="outline" onClick={() => updatePZ({ hero: { ...pz.hero, slides: [...pz.hero.slides, { id: `s${Date.now()}`, image: "", alt: "" }] } })}>
                      <Plus className="w-3 h-3 mr-1" /> Slide
                    </Button>
                  </div>
                  {pz.hero.slides.map((s, i) => (
                    <div key={s.id} className="border rounded p-4 mb-3 grid md:grid-cols-[1fr_2fr_auto] gap-3 items-center">
                      <ImageUpload label={`Slide ${i + 1}`} value={s.image} onChange={(v) => { const n = [...pz.hero.slides]; n[i] = { ...s, image: v }; updatePZ({ hero: { ...pz.hero, slides: n } }); }} />
                      <Field label="Descrição (alt)" value={s.alt} onChange={(v: string) => { const n = [...pz.hero.slides]; n[i] = { ...s, alt: v }; updatePZ({ hero: { ...pz.hero, slides: n } }); }} />
                      <Button variant="ghost" size="sm" onClick={() => updatePZ({ hero: { ...pz.hero, slides: pz.hero.slides.filter((_, x) => x !== i) } })}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* PARCERIA */}
              <TabsContent value="parceria" className="space-y-4">
                <Field label="Badge" value={pz.parceria.badge} onChange={(v: string) => updatePZ({ parceria: { ...pz.parceria, badge: v } })} />
                <Field label="Título" value={pz.parceria.title} onChange={(v: string) => updatePZ({ parceria: { ...pz.parceria, title: v } })} textarea />
                <SizeAlign size={pz.parceria.titleSize} align={pz.parceria.titleAlign} onSize={(v: number) => updatePZ({ parceria: { ...pz.parceria, titleSize: v } })} onAlign={(v: any) => updatePZ({ parceria: { ...pz.parceria, titleAlign: v } })} label="título" />
                <Field label="Texto" value={pz.parceria.text} onChange={(v: string) => updatePZ({ parceria: { ...pz.parceria, text: v } })} textarea rows={4} />
                <SizeAlign size={pz.parceria.textSize} align={pz.parceria.textAlign} onSize={(v: number) => updatePZ({ parceria: { ...pz.parceria, textSize: v } })} onAlign={(v: any) => updatePZ({ parceria: { ...pz.parceria, textAlign: v } })} label="texto" />
                <ImageUpload label="Imagem institucional" value={pz.parceria.image} onChange={(v) => updatePZ({ parceria: { ...pz.parceria, image: v } })} />
              </TabsContent>

              {/* BENEFICIOS */}
              <TabsContent value="beneficios" className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-navy">Itens (linha horizontal)</span>
                  <Button size="sm" variant="outline" onClick={() => updatePZ({ beneficios: { items: [...pz.beneficios.items, { icon: "sparkles", label: "Novo" }] } })}>
                    <Plus className="w-3 h-3 mr-1" /> Item
                  </Button>
                </div>
                {pz.beneficios.items.map((b, i) => (
                  <div key={i} className="grid grid-cols-[1fr_2fr_auto] gap-2 border rounded p-3">
                    <input placeholder="Ícone (lucide, ex: zap)" value={b.icon} onChange={(e) => { const n = [...pz.beneficios.items]; n[i] = { ...b, icon: e.target.value }; updatePZ({ beneficios: { items: n } }); }} className="border border-input rounded-sm px-3 py-2 text-sm" />
                    <input placeholder="Texto" value={b.label} onChange={(e) => { const n = [...pz.beneficios.items]; n[i] = { ...b, label: e.target.value }; updatePZ({ beneficios: { items: n } }); }} className="border border-input rounded-sm px-3 py-2 text-sm" />
                    <Button variant="ghost" size="sm" onClick={() => updatePZ({ beneficios: { items: pz.beneficios.items.filter((_, x) => x !== i) } })}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground">Nomes de ícones: consulte <a className="underline" href="https://lucide.dev/icons" target="_blank" rel="noreferrer">lucide.dev</a> (use kebab-case, ex: <code>trending-down</code>).</p>
              </TabsContent>

              {/* SOLUÇÕES */}
              <TabsContent value="solucoes" className="space-y-4">
                <Field label="Título da seção" value={pz.solucoes.title} onChange={(v: string) => updatePZ({ solucoes: { ...pz.solucoes, title: v } })} />
                <SizeAlign size={pz.solucoes.titleSize} align={pz.solucoes.titleAlign} onSize={(v: number) => updatePZ({ solucoes: { ...pz.solucoes, titleSize: v } })} onAlign={(v: any) => updatePZ({ solucoes: { ...pz.solucoes, titleAlign: v } })} label="título" />
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-sm font-semibold text-navy">Produtos / soluções</span>
                  <Button size="sm" variant="outline" onClick={() => updatePZ({ solucoes: { ...pz.solucoes, items: [...pz.solucoes.items, { id: `sol${Date.now()}`, image: "", name: "Novo", resumo: "", ctaLabel: "Saiba mais", ctaHref: "#contato" }] } })}>
                    <Plus className="w-3 h-3 mr-1" /> Produto
                  </Button>
                </div>
                {pz.solucoes.items.map((s, i) => (
                  <div key={s.id} className="border rounded p-4 grid md:grid-cols-2 gap-4">
                    <ImageUpload label="Imagem principal (capa)" value={s.image} onChange={(v) => { const n = [...pz.solucoes.items]; n[i] = { ...s, image: v }; updatePZ({ solucoes: { ...pz.solucoes, items: n } }); }} />
                    <div className="space-y-3">
                      <Field label="Nome (legenda)" value={s.name} onChange={(v: string) => { const n = [...pz.solucoes.items]; n[i] = { ...s, name: v }; updatePZ({ solucoes: { ...pz.solucoes, items: n } }); }} />
                      <Field label="Breve descrição" value={s.resumo} onChange={(v: string) => { const n = [...pz.solucoes.items]; n[i] = { ...s, resumo: v }; updatePZ({ solucoes: { ...pz.solucoes, items: n } }); }} textarea />
                      <div className="grid grid-cols-2 gap-2">
                        <Field label="Botão" value={s.ctaLabel} onChange={(v: string) => { const n = [...pz.solucoes.items]; n[i] = { ...s, ctaLabel: v }; updatePZ({ solucoes: { ...pz.solucoes, items: n } }); }} />
                        <Field label="Link" value={s.ctaHref} onChange={(v: string) => { const n = [...pz.solucoes.items]; n[i] = { ...s, ctaHref: v }; updatePZ({ solucoes: { ...pz.solucoes, items: n } }); }} />
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => updatePZ({ solucoes: { ...pz.solucoes, items: pz.solucoes.items.filter((_, x) => x !== i) } })} className="text-destructive"><Trash2 className="w-4 h-4 mr-1" />Remover</Button>
                    </div>
                    <div className="md:col-span-2 border-t pt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-navy">Galeria (fotos adicionais)</span>
                        <Button size="sm" variant="outline" onClick={() => { const n = [...pz.solucoes.items]; n[i] = { ...s, galeria: [...(s.galeria || []), ""] }; updatePZ({ solucoes: { ...pz.solucoes, items: n } }); }}>
                          <Plus className="w-3 h-3 mr-1" /> Foto
                        </Button>
                      </div>
                      <div className="grid md:grid-cols-3 gap-3">
                        {(s.galeria || []).map((g, gi) => (
                          <div key={gi} className="space-y-2">
                            <ImageUpload label={`Foto ${gi + 1}`} value={g} onChange={(v) => { const n = [...pz.solucoes.items]; const gal = [...(s.galeria || [])]; gal[gi] = v; n[i] = { ...s, galeria: gal }; updatePZ({ solucoes: { ...pz.solucoes, items: n } }); }} />
                            <Button variant="ghost" size="sm" className="text-destructive w-full" onClick={() => { const n = [...pz.solucoes.items]; n[i] = { ...s, galeria: (s.galeria || []).filter((_, x) => x !== gi) }; updatePZ({ solucoes: { ...pz.solucoes, items: n } }); }}>
                              <Trash2 className="w-3 h-3 mr-1" /> Remover
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              {/* CTA */}
              <TabsContent value="cta" className="space-y-4">
                <Field label="Título" value={pz.cta.title} onChange={(v: string) => updatePZ({ cta: { ...pz.cta, title: v } })} textarea />
                <SizeAlign size={pz.cta.titleSize} align={pz.cta.titleAlign} onSize={(v: number) => updatePZ({ cta: { ...pz.cta, titleSize: v } })} onAlign={(v: any) => updatePZ({ cta: { ...pz.cta, titleAlign: v } })} label="título" />
                <Field label="Texto" value={pz.cta.text} onChange={(v: string) => updatePZ({ cta: { ...pz.cta, text: v } })} textarea />
                <SizeAlign size={pz.cta.textSize} align={pz.cta.textAlign} onSize={(v: number) => updatePZ({ cta: { ...pz.cta, textSize: v } })} onAlign={(v: any) => updatePZ({ cta: { ...pz.cta, textAlign: v } })} label="texto" />
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Botão" value={pz.cta.ctaLabel} onChange={(v: string) => updatePZ({ cta: { ...pz.cta, ctaLabel: v } })} />
                  <Field label="Link" value={pz.cta.ctaHref} onChange={(v: string) => updatePZ({ cta: { ...pz.cta, ctaHref: v } })} />
                </div>
              </TabsContent>

              {/* FORM */}
              <TabsContent value="form" className="space-y-4">
                <Field label="Título do formulário" value={pz.form.title} onChange={(v: string) => updatePZ({ form: { ...pz.form, title: v } })} />
                <Field label="Subtítulo" value={pz.form.subtitle} onChange={(v: string) => updatePZ({ form: { ...pz.form, subtitle: v } })} textarea />
                <Field label="Texto do botão enviar" value={pz.form.ctaLabel} onChange={(v: string) => updatePZ({ form: { ...pz.form, ctaLabel: v } })} />
                <Field label="Texto LGPD" value={pz.form.lgpdLabel} onChange={(v: string) => updatePZ({ form: { ...pz.form, lgpdLabel: v } })} />
                <Field label="Mensagem de sucesso" value={pz.form.successMessage} onChange={(v: string) => updatePZ({ form: { ...pz.form, successMessage: v } })} textarea />
                <Field label="Webhook URL (integração CRM opcional)" value={pz.form.webhookUrl} onChange={(v: string) => updatePZ({ form: { ...pz.form, webhookUrl: v } })} placeholder="https://..." />
              </TabsContent>

              {/* FOOTER */}
              <TabsContent value="footer" className="space-y-4">
                <Field label="Texto institucional" value={pz.footer.text} onChange={(v: string) => updatePZ({ footer: { ...pz.footer, text: v } })} textarea />
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Título da coluna de links" value={pz.footer.linksTitle} onChange={(v: string) => updatePZ({ footer: { ...pz.footer, linksTitle: v } })} />
                  <Field label="Título da coluna de contato" value={pz.footer.contactTitle} onChange={(v: string) => updatePZ({ footer: { ...pz.footer, contactTitle: v } })} />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Telefone" value={pz.footer.phone} onChange={(v: string) => updatePZ({ footer: { ...pz.footer, phone: v } })} />
                  <Field label="E-mail" value={pz.footer.email} onChange={(v: string) => updatePZ({ footer: { ...pz.footer, email: v } })} />
                </div>
                <Field label="Endereço" value={pz.footer.address} onChange={(v: string) => updatePZ({ footer: { ...pz.footer, address: v } })} textarea />
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="LinkedIn" value={pz.footer.social.linkedin} onChange={(v: string) => updatePZ({ footer: { ...pz.footer, social: { ...pz.footer.social, linkedin: v } } })} />
                  <Field label="Instagram" value={pz.footer.social.instagram} onChange={(v: string) => updatePZ({ footer: { ...pz.footer, social: { ...pz.footer.social, instagram: v } } })} />
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">Links rápidos</span>
                    <Button size="sm" variant="outline" onClick={() => updatePZ({ footer: { ...pz.footer, quickLinks: [...pz.footer.quickLinks, { label: "Novo", href: "#" }] } })}>
                      <Plus className="w-3 h-3 mr-1" /> Link
                    </Button>
                  </div>
                  {pz.footer.quickLinks.map((l, i) => (
                    <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 mb-2">
                      <input value={l.label} onChange={(e) => { const n = [...pz.footer.quickLinks]; n[i] = { ...l, label: e.target.value }; updatePZ({ footer: { ...pz.footer, quickLinks: n } }); }} className="border border-input rounded-sm px-3 py-2 text-sm" />
                      <input value={l.href} onChange={(e) => { const n = [...pz.footer.quickLinks]; n[i] = { ...l, href: e.target.value }; updatePZ({ footer: { ...pz.footer, quickLinks: n } }); }} className="border border-input rounded-sm px-3 py-2 text-sm" />
                      <Button variant="ghost" size="sm" onClick={() => updatePZ({ footer: { ...pz.footer, quickLinks: pz.footer.quickLinks.filter((_, x) => x !== i) } })}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </div>
                  ))}
                </div>
                <Field label="Copyright" value={pz.footer.copyright} onChange={(v: string) => updatePZ({ footer: { ...pz.footer, copyright: v } })} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="fixed bottom-8 right-8 z-50">
          <Button onClick={save} size="lg" className="bg-navy hover:bg-navy/90 text-white shadow-2xl h-14 px-8 rounded-full border border-gold/30">
            <Save className="w-5 h-5 mr-2 text-gold" />
            PUBLICAR ALTERAÇÕES
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
