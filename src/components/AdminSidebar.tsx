import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Palette, 
  Layers, 
  LogOut, 
  Globe,
  Settings,
  Layout,
  Sparkles,
  Shield,
  Scale,
  Newspaper,
  Handshake,
  Landmark,
  Maximize,
  ChevronDown,
  ChevronRight,
  Home,
  Building2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { clearToken } from "@/lib/api";
import { useNavigate } from "@tanstack/react-router";

const siteHomeItems = [
  { icon: Layout, label: "Banners Hero", path: "/admin/hero" },
  { icon: Sparkles, label: "Cards de Marca", path: "/admin/brand-cards" },
  { icon: Maximize, label: "Estatísticas", path: "/admin/stats" },
  { icon: Shield, label: "Garantias", path: "/admin/garantias" },
  { icon: Landmark, label: "Capital", path: "/admin/capital" },
  { icon: Scale, label: "Governança", path: "/admin/governanca" },
  { icon: Newspaper, label: "Notícias", path: "/admin/news" },
  { icon: Handshake, label: "Parceiros", path: "/admin/parceiros" },
  { icon: Settings, label: "Rodapé", path: "/admin/footer" },
  { icon: Settings, label: "Navegação", path: "/admin/navigation" },
  { icon: Globe, label: "SEO & Marketing", path: "/admin/seo" },
];

const menuItems = [
  { icon: LayoutDashboard, label: "Painel Geral", path: "/admin" },
  { 
    icon: Home, 
    label: "Página Home", 
    children: siteHomeItems 
  },
  { icon: Palette, label: "Branding", path: "/admin/branding" },
  { icon: Layers, label: "Módulos", path: "/admin/modules" },
  { icon: Users, label: "Usuários", path: "/admin/users" },
];

export function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isHomeOpen, setIsHomeOpen] = useState(true);

  const handleLogout = () => {
    clearToken();
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="hidden lg:flex w-64 bg-[#001B3D] text-white h-screen flex-col fixed left-0 top-0 z-50">
      <div className="p-6">
        <h1 className="text-xl font-display font-bold tracking-tight">Premiatto <span className="text-gold">CMS</span></h1>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar pb-10">
        {menuItems.map((item) => {
          if (item.children) {
            const isChildActive = item.children.some(child => location.pathname === child.path);
            
            return (
              <div key={item.label} className="space-y-1">
                <button
                  onClick={() => setIsHomeOpen(!isHomeOpen)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors text-sm",
                    isChildActive ? "text-white font-medium" : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </div>
                  {isHomeOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                </button>
                
                {isHomeOpen && (
                  <div className="pl-4 space-y-1 mt-1 border-l border-white/10 ml-5">
                    {item.children.map((child) => {
                      const isActive = location.pathname === child.path;
                      return (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-xs",
                            isActive 
                              ? "bg-[#C5A059] text-[#001B3D] font-medium" 
                              : "text-white/60 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          <child.icon className="w-3 h-3" />
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm",
                isActive 
                  ? "bg-[#C5A059] text-[#001B3D] font-medium" 
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-1 bg-navy/80 backdrop-blur-sm">
        <div className="px-3 py-2 mb-2 text-[10px] uppercase tracking-widest text-white/40">
          Desenvolvido por Thiago Nicodemos
        </div>
        <Link 
          to="/" 
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <Globe className="w-4 h-4" />
          Ver Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
      <div className="px-7 py-2 text-[8px] text-white/20 uppercase tracking-tighter">
        TNS R2D2
      </div>
    </div>
  );
}
