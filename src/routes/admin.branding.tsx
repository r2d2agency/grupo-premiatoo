import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getToken, fetchContent, saveContent, type SiteContent, defaultContent } from "@/lib/api";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Palette, Save } from "lucide-react";

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
          <CardContent>
            <div className="space-y-2">
              <label className="text-sm font-medium">URL do Logo</label>
              <Input 
                placeholder="https://..."
                value={content.branding.logoUrl || ""}
                onChange={e => setContent({
                  ...content, 
                  branding: { ...content.branding, logoUrl: e.target.value }
                })}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
