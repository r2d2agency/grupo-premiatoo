import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getToken, fetchContent, saveContent, type SiteContent, defaultContent } from "@/lib/api";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Layers, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/modules")({
  component: AdminModulesPage,
});

function AdminModulesPage() {
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

  const handleToggle = (key: keyof SiteContent['modules']) => {
    setContent({
      ...content,
      modules: {
        ...content.modules,
        [key]: !content.modules[key]
      }
    });
  };

  const handleSave = async () => {
    try {
      await saveContent(content);
      toast.success("Configuração de módulos salva!");
    } catch (e) {
      toast.error("Erro ao salvar alterações");
    }
  };

  if (loading) return null;

  return (
    <AdminLayout title="Gestão de Módulos">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-gold" />
              Módulos do Site
            </CardTitle>
            <CardDescription>
              Ative ou desative seções inteiras do site com um clique.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(content.modules).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm">
                  <div className="space-y-0.5">
                    <Label className="text-base capitalize">{key}</Label>
                    <p className="text-sm text-muted-foreground">
                      Exibir seção de {key} na página inicial.
                    </p>
                  </div>
                  <Switch 
                    checked={value} 
                    onCheckedChange={() => handleToggle(key as keyof SiteContent['modules'])} 
                  />
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={handleSave} className="bg-navy hover:bg-navy/90 text-white">
                <Save className="w-4 h-4 mr-2" />
                Salvar Módulos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
