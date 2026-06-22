import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { defaultContent, fetchContent, getToken, saveContent, type SiteContent } from "@/lib/api";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save, Plus, Trash2, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/admin/footer")({
  component: AdminFooterPage,
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

function AdminFooterPage() {
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
    <AdminLayout title="Rodapé">
      <div className="space-y-6 pb-24">
        <Card>
          <CardHeader>
            <CardTitle className="text-navy flex items-center gap-2">
              <Settings className="w-5 h-5 text-gold" />
              Configuração do Rodapé
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Field label="Texto Institucional" value={content.footer.text} textarea onChange={(v: string) => update("footer", { ...content.footer, text: v })} />
                <Field label="Copyright" value={content.footer.copyright} onChange={(v: string) => update("footer", { ...content.footer, copyright: v })} />
                
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="text-sm font-bold text-navy uppercase tracking-wider">Redes Sociais</h4>
                  <Field label="LinkedIn URL" value={content.footer.social.linkedin || ""} onChange={(v: string) => update("footer", { ...content.footer, social: { ...content.footer.social, linkedin: v } })} />
                  <Field label="Instagram URL" value={content.footer.social.instagram || ""} onChange={(v: string) => update("footer", { ...content.footer, social: { ...content.footer.social, instagram: v } })} />
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-navy uppercase tracking-wider">Contato</h4>
                <Field label="Telefone" value={content.footer.contact.phone} onChange={(v: string) => update("footer", { ...content.footer, contact: { ...content.footer.contact, phone: v } })} />
                <Field label="E-mail" value={content.footer.contact.email} onChange={(v: string) => update("footer", { ...content.footer, contact: { ...content.footer.contact, email: v } })} />
                <Field label="Endereço" value={content.footer.contact.address} textarea onChange={(v: string) => update("footer", { ...content.footer, contact: { ...content.footer.contact, address: v } })} />
              </div>
            </div>

            <div className="pt-6 border-t space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-navy uppercase tracking-wider">Intranet</h4>
                <label className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={content.footer.intranet?.enabled ?? false}
                    onChange={(e) => update("footer", { ...content.footer, intranet: { ...(content.footer.intranet || { label: "Intranet", url: "#", icon: "lock", enabled: false }), enabled: e.target.checked } })}
                  />
                  Exibir no rodapé
                </label>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <Field
                  label="Rótulo"
                  value={content.footer.intranet?.label || ""}
                  onChange={(v: string) => update("footer", { ...content.footer, intranet: { ...(content.footer.intranet || { enabled: true, label: "", url: "#", icon: "lock" }), label: v } })}
                />
                <Field
                  label="URL"
                  value={content.footer.intranet?.url || ""}
                  placeholder="https://intranet.exemplo.com"
                  onChange={(v: string) => update("footer", { ...content.footer, intranet: { ...(content.footer.intranet || { enabled: true, label: "Intranet", url: "", icon: "lock" }), url: v } })}
                />
                <Field
                  label="Ícone (lucide)"
                  value={content.footer.intranet?.icon || "lock"}
                  placeholder="lock, key, shield, user, link..."
                  onChange={(v: string) => update("footer", { ...content.footer, intranet: { ...(content.footer.intranet || { enabled: true, label: "Intranet", url: "#", icon: "" }), icon: v } })}
                />
              </div>
              <p className="text-[11px] text-muted-foreground">
                Use o nome do ícone da biblioteca <a href="https://lucide.dev/icons" target="_blank" rel="noopener noreferrer" className="underline">lucide.dev/icons</a> (ex.: <code>lock</code>, <code>key-round</code>, <code>shield</code>, <code>user-circle</code>).
              </p>
            </div>

            <div className="pt-6 border-t">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-sm font-bold text-navy uppercase tracking-wider">Colunas de Links</h4>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => {
                    const next = [...content.footer.columns, { title: "Nova Coluna", items: [] }];
                    update("footer", { ...content.footer, columns: next });
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" /> Nova Coluna
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.footer.columns.map((col, cIdx) => (
                  <div key={cIdx} className="border rounded-lg p-4 bg-muted/10 space-y-4 relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 text-destructive"
                      onClick={() => {
                        const next = content.footer.columns.filter((_, i) => i !== cIdx);
                        update("footer", { ...content.footer, columns: next });
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                    <Field
                      label="Título da Coluna"
                      value={col.title}
                      onChange={(v: string) => {
                        const next = [...content.footer.columns];
                        next[cIdx] = { ...col, title: v };
                        update("footer", { ...content.footer, columns: next });
                      }}
                    />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Links</Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-[10px]"
                          onClick={() => {
                            const next = [...content.footer.columns];
                            next[cIdx] = { ...col, items: [...col.items, { label: "Novo Link", href: "#" }] };
                            update("footer", { ...content.footer, columns: next });
                          }}
                        >
                          <Plus className="w-3 h-3 mr-1" /> Add
                        </Button>
                      </div>
                      {col.items.map((item, iIdx) => (
                        <div key={iIdx} className="flex gap-2 items-end">
                          <div className="flex-1">
                            <Input
                              value={item.label}
                              placeholder="Rótulo"
                              className="h-8 text-xs"
                              onChange={(e) => {
                                const nextItems = [...col.items];
                                nextItems[iIdx] = { ...item, label: e.target.value };
                                const nextCols = [...content.footer.columns];
                                nextCols[cIdx] = { ...col, items: nextItems };
                                update("footer", { ...content.footer, columns: nextCols });
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <Input
                              value={item.href}
                              placeholder="Link (#)"
                              className="h-8 text-xs"
                              onChange={(e) => {
                                const nextItems = [...col.items];
                                nextItems[iIdx] = { ...item, href: e.target.value };
                                const nextCols = [...content.footer.columns];
                                nextCols[cIdx] = { ...col, items: nextItems };
                                update("footer", { ...content.footer, columns: nextCols });
                              }}
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => {
                              const nextItems = col.items.filter((_, i) => i !== iIdx);
                              const nextCols = [...content.footer.columns];
                              nextCols[cIdx] = { ...col, items: nextItems };
                              update("footer", { ...content.footer, columns: nextCols });
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
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
