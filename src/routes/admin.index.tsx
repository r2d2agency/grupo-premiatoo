import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { defaultContent, fetchContent, getToken, type SiteContent } from "@/lib/api";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Layout, 
  Sparkles, 
  Shield, 
  Scale, 
  Newspaper, 
  Handshake, 
  Landmark, 
  Maximize,
  Settings,
  Palette,
  Layers,
  Users,
  ChevronRight
} from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const quickActions = [
  { icon: Layout, label: "Banners Hero", path: "/admin/hero", desc: "Gerenciar banners e animações" },
  { icon: Sparkles, label: "Cards de Marca", path: "/admin/brand-cards", desc: "Editar cards abaixo da hero" },
  { icon: Maximize, label: "Estatísticas", path: "/admin/stats", desc: "Atualizar números da empresa" },
  { icon: Shield, label: "Garantias", path: "/admin/garantias", desc: "Gerenciar modalidades de garantia" },
  { icon: Landmark, label: "Capital", path: "/admin/capital", desc: "Soluções financeiras estruturadas" },
  { icon: Scale, label: "Governança", path: "/admin/governanca", desc: "Compliance e compromisso" },
  { icon: Newspaper, label: "Notícias", path: "/admin/news", desc: "Publicar novidades e artigos" },
  { icon: Handshake, label: "Parceiros", path: "/admin/parceiros", desc: "Gerenciar cards de parceiros" },
  { icon: Settings, label: "Navegação", path: "/admin/navigation", desc: "Links do menu e CTAs" },
  { icon: Palette, label: "Branding", path: "/admin/branding", desc: "Cores e logo da marca" },
  { icon: Layers, label: "Módulos", path: "/admin/modules", desc: "Ativar/desativar seções" },
  { icon: Settings, label: "Rodapé", path: "/admin/footer", desc: "Informações de contato e links" },
  { icon: Users, label: "Usuários", path: "/admin/users", desc: "Gerenciar acessos administrativos" },
  { icon: Building2, label: "Institucional", path: "/admin/institucional", desc: "Página institucional premium" },
];

function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getToken()) {
      navigate({ to: "/admin/login" });
      return;
    }
    setLoading(false);
  }, [navigate]);

  if (loading) return null;

  return (
    <AdminLayout title="Painel de Controle">
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-navy mb-4">Acesso Rápido</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className="group p-4 bg-white border border-border rounded-xl hover:border-gold hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="p-2 bg-navy/5 rounded-lg group-hover:bg-gold/10 transition-colors text-navy group-hover:text-gold">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                </div>
                <div className="mt-4">
                  <h4 className="font-bold text-navy">{item.label}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
