import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getToken, fetchContent, saveContent, type SiteContent, defaultContent, API_URL } from "@/lib/api";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Palette, Save, Upload, Trash } from "lucide-react";

export const Route = createFileRoute("/admin/branding")({
  component: AdminBrandingPage,
});

function AdminBrandingPage() {
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
      toast.success("Identidade visual atualizada!");
    } catch (e) {
      toast.error("Erro ao salvar alterações");
    }
  };

  if (loading) return null;

  return (
    <AdminLayout title="Branding & Identidade">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-gold" />
              Cores da Marca
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-medium">Cor Primária (Navy)</label>
                <div className="flex gap-4">
                  <Input 
                    type="color" 
                    className="w-16 h-10 p-1" 
                    value={content.branding.primaryColor}
                    onChange={e => setContent({
                      ...content, 
                      branding: { ...content.branding, primaryColor: e.target.value }
                    })}
                  />
                  <Input 
                    value={content.branding.primaryColor}
                    onChange={e => setContent({
                      ...content, 
                      branding: { ...content.branding, primaryColor: e.target.value }
                    })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Cor Secundária (Gold)</label>
                <div className="flex gap-4">
                  <Input 
                    type="color" 
                    className="w-16 h-10 p-1" 
                    value={content.branding.secondaryColor}
                    onChange={e => setContent({
                      ...content, 
                      branding: { ...content.branding, secondaryColor: e.target.value }
                    })}
                  />
                  <Input 
                    value={content.branding.secondaryColor}
                    onChange={e => setContent({
                      ...content, 
                      branding: { ...content.branding, secondaryColor: e.target.value }
                    })}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={handleSave} className="bg-navy hover:bg-navy/90 text-white">
                <Save className="w-4 h-4 mr-2" />
                Salvar Branding
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Logo & Assets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <label className="text-sm font-medium">Logo da Marca</label>
              
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full max-w-[300px] h-[150px] bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden border-2 border-dashed border-slate-200">
                  {content.branding.logoUrl ? (
                    <img 
                      src={content.branding.logoUrl} 
                      alt="Preview logo" 
                      className="max-w-full max-h-full object-contain p-4"
                    />
                  ) : (
                    <div className="text-slate-400 flex flex-col items-center">
                      <Palette className="w-8 h-8 mb-2" />
                      <span className="text-xs">Sem logo carregado</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-4 w-full">
                  <div className="space-y-2">
                    <label className="text-xs text-slate-500 uppercase font-semibold">Upload de Logo</label>
                    <ImageUpload 
                      value={content.branding.logoUrl}
                      onChange={(url) => setContent({
                        ...content,
                        branding: { ...content.branding, logoUrl: url }
                      })}
                    />
                    <p className="text-[10px] text-slate-400 italic">Recomendado: PNG ou WebP com fundo transparente.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-slate-500 uppercase font-semibold">Ou insira uma URL manual</label>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="https://..."
                        value={content.branding.logoUrl || ""}
                        onChange={e => setContent({
                          ...content, 
                          branding: { ...content.branding, logoUrl: e.target.value }
                        })}
                      />
                      {content.branding.logoUrl && (
                        <Button 
                          variant="destructive" 
                          size="icon"
                          onClick={() => setContent({
                            ...content,
                            branding: { ...content.branding, logoUrl: "" }
                          })}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
