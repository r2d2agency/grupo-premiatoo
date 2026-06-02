import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getToken, fetchContent, saveContent, type SiteContent, defaultContent } from "@/lib/api";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Link2, Save, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/admin/navigation")({
  component: AdminNavigationPage,
});

function AdminNavigationPage() {
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

  const handleSave = async () => {
    try {
      await saveContent(content);
      toast.success("Navegação atualizada!");
    } catch (e) {
      toast.error("Erro ao salvar alterações");
    }
  };

  const addLink = () => {
    const newLinks = [...content.navigation.links, { label: "Novo Link", href: "#" }];
    setContent({ ...content, navigation: { ...content.navigation, links: newLinks } });
  };

  const removeLink = (index: number) => {
    const newLinks = content.navigation.links.filter((_, i) => i !== index);
    setContent({ ...content, navigation: { ...content.navigation, links: newLinks } });
  };

  const updateLink = (index: number, field: string, value: any) => {
    const newLinks = [...content.navigation.links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setContent({ ...content, navigation: { ...content.navigation, links: newLinks } });
  };

  if (loading) return null;

  return (
    <AdminLayout title="Menu & Navegação">
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Link2 className="w-5 h-5 text-gold" />
              Links do Menu Principal
            </CardTitle>
            <Button onClick={addLink} size="sm" variant="outline" className="gap-2">
              <Plus className="w-4 h-4" /> Adicionar Link
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.navigation.links.map((link, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg bg-slate-50/50 relative group">
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase text-slate-500">Rótulo</label>
                  <Input 
                    value={link.label}
                    onChange={(e) => updateLink(index, "label", e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-medium uppercase text-slate-500">Link (URL ou #ancora)</label>
                  <Input 
                    value={link.href}
                    onChange={(e) => updateLink(index, "href", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase text-slate-500">Abrir em</label>
                  <div className="flex gap-2">
                    <Select 
                      value={link.target || "_self"} 
                      onValueChange={(v) => updateLink(index, "target", v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="_self">Mesma Aba</SelectItem>
                        <SelectItem value="_blank">Nova Aba</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      onClick={() => removeLink(index)}
                      className="shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4 flex justify-end">
              <Button onClick={handleSave} className="bg-navy hover:bg-navy/90 text-white">
                <Save className="w-4 h-4 mr-2" />
                Salvar Menu
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Botão de Destaque (CTA)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox 
                id="cta-visible" 
                checked={content.navigation.cta.visible}
                onCheckedChange={(checked) => setContent({
                  ...content,
                  navigation: { ...content.navigation, cta: { ...content.navigation.cta, visible: !!checked } }
                })}
              />
              <label htmlFor="cta-visible" className="text-sm font-medium leading-none flex items-center gap-2">
                {content.navigation.cta.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                Mostrar botão Solicitar Análise no menu
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-slate-500">Texto do Botão</label>
                <Input 
                  value={content.navigation.cta.label}
                  onChange={(e) => setContent({
                    ...content,
                    navigation: { ...content.navigation, cta: { ...content.navigation.cta, label: e.target.value } }
                  })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-slate-500">Link</label>
                <Input 
                  value={content.navigation.cta.href}
                  onChange={(e) => setContent({
                    ...content,
                    navigation: { ...content.navigation, cta: { ...content.navigation.cta, href: e.target.value } }
                  })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-slate-500">Abrir em</label>
                <Select 
                  value={content.navigation.cta.target || "_self"} 
                  onValueChange={(v: any) => setContent({
                    ...content,
                    navigation: { ...content.navigation, cta: { ...content.navigation.cta, target: v } }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_self">Mesma Aba</SelectItem>
                    <SelectItem value="_blank">Nova Aba</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={handleSave} className="bg-navy hover:bg-navy/90 text-white">
                <Save className="w-4 h-4 mr-2" />
                Salvar CTA
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}